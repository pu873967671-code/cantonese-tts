import { AzureTtsAdapter } from "./adapters/azure.adapter";
import type { TtsProvider } from "@canto/shared/types/tts";

export function getTtsAdapter(provider: TtsProvider = "azure") {
  switch (provider) {
    case "azure":
    default:
      return new AzureTtsAdapter({
        apiKey: process.env.AZURE_TTS_API_KEY,
        region: process.env.AZURE_TTS_REGION,
        baseOutputUrl: process.env.TTS_BASE_URL,
      });
  }
}
