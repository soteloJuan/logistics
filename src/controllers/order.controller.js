const UseCasesCreate = require('../useCases/Order/Create');
const UseCasesGetByIdOrder = require('../useCases/Order/GetByIdOrder');
const UseCasesUpdateStatusByIdOrder = require('../useCases/Order/UpdateStatusByIdOrder');
const UseCasesCancelOrder = require('../useCases/Order/CancelOrder');


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
        next(err)
    });
}

const getByIdOrder = (req, res, next) => {

    const { idOrder } = req.params;

    const useCasesGetByIdOrder = UseCasesGetByIdOrder();
    useCasesGetByIdOrder.Execute( idOrder ).then( (result) => {
        res.status(200).json({
            ok: true,
            message: result.message,
            data: result.data
        });
    }, (err) => {
        next(err)
    });
}

const updateStatus = (req, res, next) => {

    const { idOrder } = req.params;
    const { newStatus } = req.body;

    const useCasesUpdateStatusByIdOrder = UseCasesUpdateStatusByIdOrder();
    useCasesUpdateStatusByIdOrder.Execute( idOrder, newStatus ).then( (result) => {
        res.status(200).json({
            ok: true,
            message: result.message,
            data: result.data
        });
    }, (err) => {
        next(err)
    });
}

const cancelOrder = (req, res, next) => {
    
    const { idOrder } = req.params;

    const useCasesCancelOrder = UseCasesCancelOrder();
    useCasesCancelOrder.Execute( idOrder ).then( (result) => {
        res.status(200).json({
            ok: true,
            message: result.message,
            data: result.data
        });
    }, (err) => {
        next(err)
    });
}

module.exports = {
    create,
    getByIdOrder, 
    updateStatus,
    cancelOrder
}
