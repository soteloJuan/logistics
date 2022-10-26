require('dotenv').config();

const { App } = require('./app');

const app = new App();

app.init();


module.exports = { app };
