import {BookModel} from "../model/BookModel";

export class BookService{
    public static async saveBook(book: BookModel){
        try {
            await BookModel.create({
                id: book.id,
                title: book.title
            });

        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }


    public static async updateBook(book: BookModel){
        try{
            await BookModel.update({
                title: book.title
            },{
                where: {
                    id: book.id
                }
            });

        }catch (error){
            console.error(error.name);
            throw error;
        }
    }

    public static async getBookById(bookId: string): Promise<BookModel>{
        try{
            const resp =  await BookModel.findByPk(bookId);

            if (typeof resp !== 'undefined' && resp !== null){
                return resp;
            }else{

                throw new Error(`Book ${bookId} not found`);
            }

        }catch (error){
            console.error(error.name);
            throw error;
        }
    }

    public static async listBooks(): Promise<BookModel[]>{
        try{

            return await BookModel.findAll();

        }catch (error){
            console.error(error.name);
            throw error;
        }
    }

    public static async deleteBook(bookId: string){
        try{
            const deletedRows = await BookModel.destroy({
                where: {
                    id: bookId
                }
            });

            console.log(`deleted ${deletedRows} rows`);
            if (deletedRows === 0){
                throw new Error(`Book ${bookId} not found`);
            }

        }catch (error) {
            console.error(error);
            throw error
        }
    }
}