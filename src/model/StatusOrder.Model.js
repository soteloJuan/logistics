const sequelize  = require('../database/config');
const { DataTypes }  = require('sequelize');

const { Orders } = require('./Order.Model');

const StatusOrders = sequelize.define('statusOrders', {
    idStatusOrder:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: false
});

StatusOrders.hasMany(Orders, {
    foreignKey:'idStatusOrder',
    sourceKey:'idStatusOrder'
});

Orders.belongsTo(StatusOrders, {
    foreignKey:'idStatusOrder',
    targetKey:'idStatusOrder'
});


module.exports = { StatusOrders };
