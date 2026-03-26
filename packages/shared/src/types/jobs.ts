export type PreprocessJobPayload = {
  bookId: string;
};

export type TtsJobPayload = {
  jobId: string;
};

export type MergeJobPayload = {
  bookId: string;
};

export type RetryJobPayload = {
  segmentId: string;
  provider?: string;
  voiceId?: string;
};
