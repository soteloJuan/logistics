const sequelize  = require('../database/config');
const { DataTypes }  = require('sequelize');

const { Orders } = require('./Order.Model');

const Origins = sequelize.define('origins', {
    idOrigin:{
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

Origins.hasOne(Orders, {
    foreignKey:'idOrigin',
    sourceKey:'idOrigin'
});

Orders.belongsTo(Origins, {
    foreignKey:'idOrigin',
    targetKey:'idOrigin'
});


module.exports = { Origins };
