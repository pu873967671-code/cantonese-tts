import type { BookStatus, SegmentStatus } from "./domain";

export type CreateBookRequest = {
  title: string;
  sourceText: string;
  sceneType?: "storybook";
  voiceId?: string;
};

export type BookListItem = {
  id: string;
  title: string;
  status: BookStatus;
  sceneType: string;
  voiceId?: string | null;
  segmentCount: number;
  totalChars: number;
  createdAt: string;
  updatedAt: string;
};

export type BookDetail = BookListItem & {
  sourceText: string;
};

export type SegmentItem = {
  id: string;
  seq: number;
  rawText: string;
  normalizedText?: string | null;
  cantoneseText?: string | null;
  pronunciationText?: string | null;
  audioUrl?: string | null;
  status: SegmentStatus;
};

export type ProgressResponse = {
  bookId: string;
  status: BookStatus;
  totalSegments: number;
  doneSegments: number;
  failedSegments: number;
  processingSegments: number;
};
