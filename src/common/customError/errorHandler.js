const { ApplicationException } = require('../exceptions/ApplicationException');

const errorHandler = (error, request, response, next) => {

    if(error instanceof ApplicationException){
        return response.status(error.status).json({
            ok: false,
            message: error.message
        });
    } 

    response.status(500).json({
        ok: false,
        message: 'Contact the Administrator'
    });
}

module.exports = { errorHandler };