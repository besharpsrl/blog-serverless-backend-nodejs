import {Body, Controller, Delete, Get, Path, Post, Put, Route, Tags} from "tsoa";
import {BookDto} from "../dto/BookDto";
import {BookService} from "../service/BookService";
import {BookConverter} from "../converter/BookConverter";


@Tags('Book')
@Route('book')
export class BookController extends Controller {

    @Get('{id}')
    public async getBook(
        @Path() id: string,
    ): Promise<BookDto> {
        return BookConverter.toDto(
            await BookService.getBookById(id)
        );
    }

    @Get('')
    public async listBooks(): Promise<BookDto[]> {
        return BookConverter.toDtoList(
            await BookService.listBooks()
        );
    }

    @Post('')
    public async saveBook(
        @Body() book: BookDto,
    ) {
        await BookService.saveBook(
            BookConverter.toModel(book)
        );

        return {
            status: "Book inserted"
        }
    }

    @Put('')
    public async updateBook(
        @Body() book: BookDto
    ) {
        await BookService.updateBook(
            BookConverter.toModel(book)
        );

        return {
            status: "Book updated"
        }
    }

    @Delete('{id}')
    public async deleteBook(
        @Path() id: string
    ) {
        await BookService.deleteBook(id);

        return {
            status: "Book deleted"
        }

    }
}