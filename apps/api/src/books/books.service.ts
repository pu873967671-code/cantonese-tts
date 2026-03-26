import { Injectable, NotFoundException } from "@nestjs/common";
import type {
  BookDetail,
  BookListItem,
  CreateBookRequest,
  ProgressResponse,
  SegmentItem,
} from "@canto/shared/types/api";
import { preprocessText } from "@canto/preprocess/pipeline";
import { QueueService } from "../lib/queue.service";
import { PrismaService } from "../lib/prisma.service";

type BookRecord = BookDetail;

@Injectable()
export class BooksService {
  private readonly books = new Map<string, BookRecord>();
  private readonly segments = new Map<string, SegmentItem[]>();

  constructor(
    private readonly queueService: QueueService,
    private readonly prismaService: PrismaService,
  ) {
    void this.prismaService;
  }

  createBook(input: CreateBookRequest): BookDetail {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const book: BookDetail = {
      id,
      title: input.title,
      sourceText: input.sourceText,
      status: "draft",
      sceneType: input.sceneType ?? "storybook",
      voiceId: input.voiceId ?? "zh-HK-HiuMaanNeural",
      segmentCount: 0,
      totalChars: input.sourceText.length,
      createdAt: now,
      updatedAt: now,
    };

    this.books.set(id, book);
    this.segments.set(id, []);
    return book;
  }

  listBooks(): BookListItem[] {
    return [...this.books.values()];
  }

  getBook(id: string): BookDetail {
    const book = this.books.get(id);
    if (!book) throw new NotFoundException("Book not found");
    return book;
  }

  getSegments(id: string): SegmentItem[] {
    this.ensureBook(id);
    return this.segments.get(id) ?? [];
  }

  getProgress(id: string): ProgressResponse {
    const book = this.ensureBook(id);
    const segments = this.segments.get(id) ?? [];

    return {
      bookId: id,
      status: book.status,
      totalSegments: segments.length,
      doneSegments: segments.filter((item) => item.status === "done").length,
      failedSegments: segments.filter((item) => item.status === "failed").length,
      processingSegments: segments.filter((item) => item.status === "processing").length,
    };
  }

  enqueuePreprocess(id: string) {
    const book = this.ensureBook(id);
    const result = preprocessText(book.sourceText);
    const nextSegments: SegmentItem[] = result.segments.map((segment) => ({
      id: crypto.randomUUID(),
      seq: segment.seq,
      rawText: segment.rawText,
      normalizedText: segment.normalizedText,
      cantoneseText: segment.cantoneseText,
      pronunciationText: segment.pronunciationText,
      audioUrl: null,
      status: "pending",
    }));

    this.segments.set(id, nextSegments);
    this.books.set(id, {
      ...book,
      status: "queued",
      segmentCount: nextSegments.length,
      updatedAt: new Date().toISOString(),
    });

    this.queueService.addPreprocessJob({ bookId: id });

    return {
      ok: true,
      queued: true,
      stage: "preprocess",
      bookId: id,
      segmentCount: nextSegments.length,
    };
  }

  enqueueGenerate(id: string) {
    const book = this.ensureBook(id);
    const segments = this.segments.get(id) ?? [];

    this.queueService.addTtsJobs(id, segments, book.voiceId ?? "zh-HK-HiuMaanNeural");

    this.books.set(id, {
      ...book,
      status: "processing",
      updatedAt: new Date().toISOString(),
    });

    return {
      ok: true,
      queued: true,
      stage: "generate",
      bookId: id,
      queue: ["tts", "merge"],
      segmentCount: segments.length,
    };
  }

  private ensureBook(id: string): BookRecord {
    const book = this.books.get(id);
    if (!book) throw new NotFoundException("Book not found");
    return book;
  }
}
