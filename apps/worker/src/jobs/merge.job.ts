import type { MergeJobPayload } from "@canto/shared/types/jobs";

export async function runMergeJob(payload: MergeJobPayload) {
  console.log("run merge job", payload);
}
