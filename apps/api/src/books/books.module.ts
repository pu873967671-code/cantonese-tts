import { Module } from "@nestjs/common";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";
import { QueueService } from "../lib/queue.service";

@Module({
  controllers: [BooksController],
  providers: [BooksService, QueueService],
})
export class BooksModule {}
