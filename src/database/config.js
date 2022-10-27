const { Sequelize } = require('sequelize');

const Database = process.env.db_mysql_database;
const User = process.env.db_mysql_user;
const Password = process.env.db_mysql_password;
const Host = process.env.db_mysql_host;

const sequelize = new Sequelize(Database, User, Password, {
    host: Host,
    dialect: 'mysql'
});

module.exports = sequelize;