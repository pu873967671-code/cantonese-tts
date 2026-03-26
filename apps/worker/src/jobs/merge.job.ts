import type { MergeJobPayload } from "@canto/shared/types/jobs";

export async function runMergeJob(payload: MergeJobPayload) {
  const merged = {
    ...payload,
    outputPath: payload.outputPath ?? `${payload.bookId}-merged.mp3`,
  };

  console.log("run merge job", merged);
  return merged;
}
