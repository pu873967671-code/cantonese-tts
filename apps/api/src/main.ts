import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const outputDir = process.env.TTS_OUTPUT_DIR || "/tmp/tts-output";
  app.use("/audio", express.static(outputDir));

  await app.listen(process.env.PORT || 3001);
  console.log(`api listening on http://localhost:${process.env.PORT || 3001}`);
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
