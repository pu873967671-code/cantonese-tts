import type { TtsSynthesisInput, TtsSynthesisResult } from "@canto/shared/types/tts";

export class AzureTtsAdapter {
  constructor(
    private readonly config: {
      apiKey?: string;
      region?: string;
      baseOutputUrl?: string;
    } = {},
  ) {}

  async synthesize(input: TtsSynthesisInput): Promise<TtsSynthesisResult> {
    const baseOutputUrl = this.config.baseOutputUrl ?? "/audio";

    return {
      provider: "azure",
      voiceId: input.voiceId,
      outputPath: input.outputPath,
      audioUrl: `${baseOutputUrl}/${input.outputPath.split("/").pop()}`,
      durationMs: undefined,
    };
  }
}
