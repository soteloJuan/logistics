const sequelize  = require('../database/config');
const { DataTypes }  = require('sequelize');

const { Orders } = require('./Order.Model');

const Destinations = sequelize.define('destinations', {
    idDestination:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    address:{
        type: DataTypes.STRING,
        allowNull:false
    },
    zipcode:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    extNum:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    intNum:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    city:{
        type: DataTypes.STRING,
        allowNull:false
    },
    reference:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: false
});

Destinations.hasOne(Orders, {
    foreignKey:'idDestination',
    sourceKey:'idDestination'
});

Orders.belongsTo(Destinations, {
    foreignKey:'idDestination',
    targetKey:'idDestination'
});


module.exports = { Destinations };
