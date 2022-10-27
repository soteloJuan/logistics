const sequelize  = require('../database/config');
const { DataTypes }  = require('sequelize');

const { Orders } = require('./Order.Model');

const Users = sequelize.define('users', {
    idUser:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:false
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type: DataTypes.STRING,
        allowNull:false
    },
    createDate:{
        type: DataTypes.DATE,
        allowNull:false
    },
    role:{
        type: DataTypes.STRING,
        allowNull:false
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },

},{
    timestamps: false
});

Users.hasMany(Orders, {
    foreignKey:'idUser',
    sourceKey:'idUser'
});

Orders.belongsTo(Users, {
    foreignKey:'idUser',
    targetKey:'idUser'
});

module.exports = { Users };


