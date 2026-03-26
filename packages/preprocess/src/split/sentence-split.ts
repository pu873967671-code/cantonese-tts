export function splitIntoSegments(input: string): string[] {
  return input
    .split(/(?<=[。！？!?\n])/u)
    .map((part) => part.trim())
    .filter(Boolean);
}
