import { Module } from "@nestjs/common";
import { BooksModule } from "./books/books.module";
import { HealthController } from "./health.controller";

@Module({
  imports: [BooksModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
