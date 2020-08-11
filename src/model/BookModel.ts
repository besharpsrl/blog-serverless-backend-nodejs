const { Model } = require('sequelize');

export class BookModel extends Model{
    id: number;
    title: string
}