import type { TtsJobPayload } from "@canto/shared/types/jobs";

export async function runTtsJob(payload: TtsJobPayload) {
  console.log("run tts job", payload);
}
