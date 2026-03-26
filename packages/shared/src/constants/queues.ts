export const QUEUE_NAMES = {
  preprocess: "preprocess",
  tts: "tts",
  merge: "merge",
  retry: "retry",
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];
