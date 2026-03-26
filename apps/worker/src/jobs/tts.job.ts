import { getTtsAdapter } from "@canto/tts-core/provider-router";
import type { TtsJobPayload } from "@canto/shared/types/jobs";

export async function runTtsJob(payload: TtsJobPayload) {
  const adapter = getTtsAdapter(payload.provider ?? "azure");

  const result = await adapter.synthesize({
    text: payload.text,
    voiceId: payload.voiceId ?? "zh-HK-HiuMaanNeural",
    outputPath: payload.outputPath,
  });

  console.log("run tts job", { payload, result });
  return result;
}
