
const sequelize  = require('../database/config');
const { DataTypes }  = require('sequelize');

const { ProductOrders } = require('./ProductOrder.Model');

const Orders = sequelize.define('orders', {
    idOrder:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    totalProduct:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    totalPrice:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
},{
timestamps: 'createDate'
});

Orders.hasMany(ProductOrders, {
    foreignKey:'idOrder',
    sourceKey:'idOrder'
});

ProductOrders.belongsTo(Orders, {
    foreignKey:'idOrder',
    targetKey:'idOrder'
});

module.exports = { Orders };
