import type { RetryJobPayload } from "@canto/shared/types/jobs";

export async function runRetryJob(payload: RetryJobPayload) {
  console.log("run retry job", payload);
}
