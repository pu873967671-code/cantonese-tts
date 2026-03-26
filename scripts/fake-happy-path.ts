import { preprocessText } from "../packages/preprocess/src/pipeline";
import { AzureTtsAdapter } from "../packages/tts-core/src/adapters/azure.adapter";

async function main() {
  const sourceText = "从前有一只小熊。为什么牠总是望住个山头？他们都觉得好奇。";
  const preprocessed = preprocessText(sourceText);

  const adapter = new AzureTtsAdapter({
    apiKey: process.env.AZURE_TTS_API_KEY,
    region: process.env.AZURE_TTS_REGION,
    baseOutputUrl: "/audio",
  });

  const syntheses = await Promise.all(
    preprocessed.segments.map((segment) =>
      adapter.synthesize({
        text: segment.pronunciationText,
        voiceId: "zh-HK-HiuMaanNeural",
        outputPath: `demo-${segment.seq}.mp3`,
      }),
    ),
  );

  console.log(
    JSON.stringify(
      {
        ok: true,
        inputLength: sourceText.length,
        segmentCount: preprocessed.segments.length,
        firstSegment: preprocessed.segments[0],
        firstAudio: syntheses[0],
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
