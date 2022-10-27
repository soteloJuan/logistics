const sequelize  = require('../database/config');
const { DataTypes }  = require('sequelize');


const ProductOrders = sequelize.define('productOrders', {
    idProductOrder:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    weight:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: false
});


module.exports = { ProductOrders };
