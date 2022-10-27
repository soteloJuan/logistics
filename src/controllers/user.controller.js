
const create = async(req, res, next) => {


    res.status(200).json({
        ok: true,
        message: "Test Route Create User",
        data: result.data
    });
}

const login = async(req, res, next) => {

    res.status(200).json({
        ok: true,
        message: "Test Route Login",
    });
}

module.exports = {
    create,
    login
}
