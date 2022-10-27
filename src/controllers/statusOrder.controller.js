const UseCasesCreate = require('../useCases/StatusOrder/Create');
const UseCasesGetAll = require('../useCases/StatusOrder/GetAll');


const create = (req, res, next) => {

    const {name} = req.body;

    const useCasesCreate = UseCasesCreate();
    useCasesCreate.Execute(name).then( (result) => {

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
    getAll
}
