import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BooksService } from "./books.service";
import type { CreateBookRequest } from "@canto/shared/types/api";

@Controller("v1/books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  createBook(@Body() body: CreateBookRequest) {
    return this.booksService.createBook(body);
  }

  @Get()
  listBooks() {
    return this.booksService.listBooks();
  }

  @Get(":id")
  getBook(@Param("id") id: string) {
    return this.booksService.getBook(id);
  }

  @Get(":id/segments")
  getSegments(@Param("id") id: string) {
    return this.booksService.getSegments(id);
  }

  @Get(":id/progress")
  getProgress(@Param("id") id: string) {
    return this.booksService.getProgress(id);
  }

  @Post(":id/preprocess")
  enqueuePreprocess(@Param("id") id: string) {
    return this.booksService.enqueuePreprocess(id);
  }

  @Post(":id/generate")
  enqueueGenerate(@Param("id") id: string) {
    return this.booksService.enqueueGenerate(id);
  }
}
