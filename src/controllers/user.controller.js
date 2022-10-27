const UseCasesCreate = require('../useCases/User/Create');
const UseCasesLogin = require('../useCases/User/Login');
const UseCasesGetAll = require('../useCases/User/GetAll');
const UseCasesDelete = require('../useCases/User/Delete');


const create = (req, res, next) => {

    const { name, lastname, email, password, phone } = req.body;

    const useCasesCreate = UseCasesCreate();
    useCasesCreate.Execute(name, lastname, email, password, phone ).then( (result) => {

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

const login = (req, res, next) => {
    const {email, password } = req.body;
    const useCasesLogin = UseCasesLogin();

    useCasesLogin.Execute(email, password).then( (result) => {
        res.status(200).json({
                ok: true,
                message: result.message,
                data: result.data,
                token: result.token
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


const deleteUser = (req, res, next) => {
    const useCasesDelete = UseCasesDelete();

    const { idUser } = req.params;
    const { active } = req.body

    useCasesDelete.Execute(idUser, active).then( (result) => {
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
    login,
    getAll,
    deleteUser
}
