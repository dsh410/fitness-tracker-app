export const SOURCE_TAGS = ["tt", "ig", "yt", "fb"] as const;

export type SourceTag = (typeof SOURCE_TAGS)[number];

export function parseSourceTag(value: string | undefined): SourceTag | null {
  if (!value) return null;
  return SOURCE_TAGS.includes(value as SourceTag) ? (value as SourceTag) : null;
}
