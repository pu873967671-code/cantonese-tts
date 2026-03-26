import { Injectable, Logger } from "@nestjs/common";
import { QUEUE_NAMES } from "@canto/shared/constants/queues";
import type {
  MergeJobPayload,
  PreprocessJobPayload,
  TtsJobPayload,
} from "@canto/shared/types/jobs";
import type { SegmentItem } from "@canto/shared/types/api";

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  addPreprocessJob(payload: PreprocessJobPayload) {
    this.logger.log(`enqueue ${QUEUE_NAMES.preprocess} ${JSON.stringify(payload)}`);
    return payload;
  }

  addTtsJobs(bookId: string, segments: SegmentItem[], voiceId: string) {
    const jobs: TtsJobPayload[] = segments.map((segment) => ({
      jobId: `${bookId}:${segment.id}`,
      bookId,
      segmentId: segment.id,
      voiceId,
      provider: "azure",
      text: segment.pronunciationText ?? segment.cantoneseText ?? segment.rawText,
      outputPath: `${bookId}-${segment.seq}.mp3`,
    }));

    this.logger.log(`enqueue ${QUEUE_NAMES.tts} count=${jobs.length}`);
    return jobs;
  }

  addMergeJob(payload: MergeJobPayload) {
    this.logger.log(`enqueue ${QUEUE_NAMES.merge} ${JSON.stringify(payload)}`);
    return payload;
  }
}
