const STORYBOOK_SAFE_RULES: Array<[RegExp, string]> = [
  [/什么/g, "乜嘢"],
  [/为什么/g, "点解"],
  [/他们/g, "佢哋"],
  [/我们/g, "我哋"],
  [/你们/g, "你哋"],
];

export function convertToCantonese(input: string): string {
  return STORYBOOK_SAFE_RULES.reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    input,
  );
}
