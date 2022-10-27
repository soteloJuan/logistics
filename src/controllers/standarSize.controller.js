const UseCasesCreate = require('../useCases/StandarSize/Create');
const UseCasesGetAll = require('../useCases/StandarSize/GetAll');

const create = (req, res, next) => {

    const {idStandarSize, weight, price} = req.body;

    const useCasesCreate = UseCasesCreate();
    useCasesCreate.Execute(idStandarSize, weight, price).then( (result) => {

        res.status(200).json({
            ok: true,
            message: result.message,
            data: result.data
        });
    }, (err) => {
        next(err)
    });
}

const getAll = (req, res, next) => {
    const useCasesGetAll = UseCasesGetAll();

    useCasesGetAll.Execute().then( (result) => {
        res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data,
        });
    }, (err) => {
        next(err)
    });
}



module.exports = {
    create,
    getAll,
}
