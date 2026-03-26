import { cleanText } from "./clean/basic-clean";
import { splitIntoSegments } from "./split/sentence-split";
import { normalizeText } from "./normalize/normalize-text";
import { convertToCantonese } from "./convert/convert";
import { buildPronunciationText } from "./pronounce/pronunciation-builder";

export type PreprocessSegment = {
  seq: number;
  rawText: string;
  normalizedText: string;
  cantoneseText: string;
  pronunciationText: string;
};

export type PreprocessResult = {
  cleanedText: string;
  segments: PreprocessSegment[];
};

export function preprocessText(sourceText: string): PreprocessResult {
  const cleanedText = cleanText(sourceText);
  const parts = splitIntoSegments(cleanedText);

  const segments = parts.map((rawText, index) => {
    const normalizedText = normalizeText(rawText);
    const cantoneseText = convertToCantonese(normalizedText);
    const pronunciationText = buildPronunciationText(cantoneseText);

    return {
      seq: index + 1,
      rawText,
      normalizedText,
      cantoneseText,
      pronunciationText,
    };
  });

  return { cleanedText, segments };
}
