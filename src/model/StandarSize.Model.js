const sequelize  = require('../database/config');
const { DataTypes }  = require('sequelize');

const { Orders } = require('./Order.Model');

const StandarSizes = sequelize.define('standarSizes', {
    idStandarSize:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    weight:{
        type: DataTypes.FLOAT,
        allowNull:false
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull:false
    }
},{
    timestamps: false
});

StandarSizes.hasMany(Orders, {
    foreignKey:'idStandarSize',
    sourceKey:'idStandarSize'
});

Orders.belongsTo(StandarSizes, {
    foreignKey:'idStandarSize',
    targetKey:'idStandarSize'
});


module.exports = { StandarSizes };
