import { Module } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { QueueService } from "../lib/queue.service";
import { PrismaService } from "../lib/prisma.service";

@Module({
  controllers: [BooksController],
  providers: [BooksService, QueueService, PrismaService],
})
export class BooksModule {}
