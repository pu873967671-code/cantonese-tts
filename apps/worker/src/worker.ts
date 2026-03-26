import { QUEUE_NAMES } from "@canto/shared/constants/queues";
import { runPreprocessJob } from "./jobs/preprocess.job";
import { runTtsJob } from "./jobs/tts.job";
import { runMergeJob } from "./jobs/merge.job";
import { runRetryJob } from "./jobs/retry.job";

async function bootstrap() {
  console.log("worker boot", QUEUE_NAMES);

  await runPreprocessJob({ bookId: "demo-book" });
  await runTtsJob({ jobId: "demo-job" });
  await runMergeJob({ bookId: "demo-book" });
  await runRetryJob({ segmentId: "demo-segment" });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
