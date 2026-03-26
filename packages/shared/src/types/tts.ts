export type TtsProvider = "azure";

export type TtsSynthesisInput = {
  text: string;
  voiceId: string;
  outputPath: string;
  format?: "audio-16khz-64kbitrate-mono-mp3" | "riff-24khz-16bit-mono-pcm";
};

export type TtsSynthesisResult = {
  provider: TtsProvider;
  voiceId: string;
  outputPath: string;
  audioUrl: string;
  durationMs?: number;
};
