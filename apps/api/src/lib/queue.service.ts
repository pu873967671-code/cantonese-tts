import { Injectable, Logger } from "@nestjs/common";
import { QUEUE_NAMES } from "@canto/shared/constants/queues";
import type { PreprocessJobPayload, TtsJobPayload } from "@canto/shared/types/jobs";
import type { SegmentItem } from "@canto/shared/types/api";

@Injectable()
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  addPreprocessJob(payload: PreprocessJobPayload) {
    this.logger.log(`enqueue ${QUEUE_NAMES.preprocess} ${JSON.stringify(payload)}`);
    return payload;
  }

  addTtsJobs(bookId: string, segments: SegmentItem[]) {
    const jobs: TtsJobPayload[] = segments.map((segment) => ({
      jobId: `${bookId}:${segment.id}`,
    }));

    this.logger.log(`enqueue ${QUEUE_NAMES.tts} count=${jobs.length}`);
    return jobs;
  }
}
