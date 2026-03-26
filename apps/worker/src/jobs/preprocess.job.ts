import type { PreprocessJobPayload } from "@canto/shared/types/jobs";

export async function runPreprocessJob(payload: PreprocessJobPayload) {
  console.log("run preprocess job", payload);
}
