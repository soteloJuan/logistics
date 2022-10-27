class ApplicationException extends Error{
    status = 400;
    constructor(message = 'An unexpected error ocurred', status = 400){
        super(message);
        this.status = status;
    }

}


module.exports = {
    ApplicationException
}