import {BookModel} from "../../book/model/BookModel";
const {DataTypes } = require('sequelize');

export function InitModel(sequelize){
    BookModel.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: DataTypes.TEXT,
    }, {
        tableName: 'book',
        createdAt: false,
        updatedAt: false,
        sequelize, // We need to pass the connection instance
    })

}