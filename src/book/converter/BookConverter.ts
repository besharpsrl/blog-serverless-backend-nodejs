import {BookDto} from "../dto/BookDto";
import {BookModel} from "../model/BookModel";


export class BookConverter{
    static toDto(val: BookModel): BookDto {
        return {
            id: val.id,
            title: val.title
        };
    }

    static toDtoList(val: BookModel[]): BookDto[] {
        return val.map(element =>  {
            return {
                id: element.id,
                title: element.title
            }
        });
    }

    static toModel(val: BookDto): BookModel {
        return {
            id: val.id,
            title: val.title
        };
    }
}