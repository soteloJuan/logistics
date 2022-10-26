const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

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
        this.app.use('/api', (req, res) => {
            res.status(200).json({
                ok: true,
                message: 'Hello World'
            });
        });
    }

    initDatabase(){

    }

    init(){
        this.app.listen(this.port);
    }
}

module.exports = { App };
