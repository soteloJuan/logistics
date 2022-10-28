const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const { errorHandler } = require('./common/customError/errorHandler');

// Database
const databaseConexion = require('./database/config');

//models
require('./model/Users.Model');
require('./model/Destination.Model');
require('./model/Origins.Model');
require('./model/StandarSize.Model');
require('./model/StatusOrder.Model');
require('./model/Order.Model');
require('./model/ProductOrder.Model');


const Routes = require('./routes');
class App{

    port;

    constructor(){
        this.port = process.env.PORT  || 300;
        this.app = express();
        this.middlewares();
        this.routes();
        this.initDatabase();
    }
    
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(morgan('dev'));
    }
    
    routes(){
        this.app.use('/api',Routes);
        this.app.use(errorHandler);

    }

    async initDatabase(){
        try{
            await databaseConexion.sync({force: false});
        }catch(error){
            throw new Error('Error on Databse Conexion');
        }
    }

    init(){
        this.app.listen(this.port);
    }
}

module.exports = { App };
