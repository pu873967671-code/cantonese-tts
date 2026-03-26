# cantonese-tts

Storybook-focused Cantonese TTS monorepo.

## Goal
Build a commercially-viable Cantonese text-to-speech system using:
- Azure Speech as base TTS
- preprocess pipeline for cleanup / normalization / Cantonese conversion
- lexicon priority system
- queue workers for preprocess / tts / retry / merge
- web demo for generate / status / playback / download

## Planned Stack
- Web: Next.js
- API: NestJS
- Worker: BullMQ
- DB: PostgreSQL + Prisma
- Queue: Redis
- TTS: Azure Speech
- Audio Merge: ffmpeg

## Scope Freeze (MVP)
- Single provider: Azure
- Main scene: storybook
- 3 Cantonese voices
- preprocess v1
- global + project lexicon
- segment retry
- merge + download
- progress API

## Workspace Plan
```text
apps/
  api/
  worker/
  web/
packages/
  db/
  shared/
  preprocess/
  lexicon/
  tts-core/
infra/
  docker/
  scripts/
```

## Status
Scaffold/init stage.
