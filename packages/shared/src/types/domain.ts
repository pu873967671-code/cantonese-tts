export type SceneType = "storybook" | "education" | "article" | "news";

export type BookStatus =
  | "draft"
  | "queued"
  | "preprocessing"
  | "processing"
  | "merging"
  | "done"
  | "failed";

export type SegmentStatus =
  | "pending"
  | "queued"
  | "processing"
  | "done"
  | "failed";

export type JobStatus = "queued" | "running" | "retrying" | "done" | "failed";
