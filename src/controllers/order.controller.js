const UseCasesCreate = require('../useCases/Order/Create');

const create = (req, res, next) => {

    const { idUserFromToken: idUser, origin, destination, products } = req.body;

    const useCasesCreate = UseCasesCreate();
    useCasesCreate.Execute(idUser, origin, destination, products ).then( (result) => {
        res.status(200).json({
            ok: true,
            message: result.message,
            data: result.data
        });
    }, (err) => {
        console.log('error : ', err);
        next(err)
    });
}

module.exports = {
    create
}
