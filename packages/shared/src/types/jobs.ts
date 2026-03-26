export type PreprocessJobPayload = {
  bookId: string;
};

export type TtsJobPayload = {
  jobId: string;
  bookId: string;
  segmentId: string;
  provider?: "azure";
  voiceId?: string;
  text: string;
  outputPath: string;
};

export type MergeJobPayload = {
  bookId: string;
  outputPath?: string;
};

export type RetryJobPayload = {
  segmentId: string;
  provider?: string;
  voiceId?: string;
};
