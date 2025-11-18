// models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Product name is required.',
            },
            len: {
                args: [2, 100],
                msg: 'Name must be between 2 and 100 characters.',
            },
        },
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true,
            min: { // **Validation for negative prices**
                args: [0],
                msg: 'Price cannot be negative.',
            },
        },
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isInt: true,
            min: { // **Validation for negative stock**
                args: [0],
                msg: 'Stock count cannot be negative.',
            },
        },
    },
}, {
    tableName: 'products',
    timestamps: true,
});

module.exports = Product;