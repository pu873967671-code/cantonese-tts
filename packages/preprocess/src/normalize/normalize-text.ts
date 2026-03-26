export function normalizeText(input: string): string {
  return input
    .replace(/兒/g, "儿")
    .replace(/裡/g, "里")
    .replace(/著/g, "着")
    .trim();
}
