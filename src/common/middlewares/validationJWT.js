const jwt = require('jsonwebtoken');

const { UsersRepository } = require('../../persistance/inDatabaseUserRepository');

// helper
const { isValueNullToken } = require('../helpers/customValidations');

module.exports = () => ({

    validationJWTGeneral: async(req, res, next) => {
        try{
            const token = req.header('token') || "";
            const usersRepository = new UsersRepository();
            const privateKey = process.env.SECRETORPRIVATEKEY || 'helloworld';

            const isNull = isValueNullToken(token)
            if(isNull) {
                return res.status(401).json({
                    ok:false,
                    message:'The Token Is Required!',
                    data:[]
                });
            }
            
            const { payload } = jwt.verify(token, privateKey) ; 
            const resultFindUser = await  usersRepository.getByIdUser(payload);

            if(!resultFindUser.dataValues) {
                return res.status(401).json({
                    ok:false,
                    message:'The User Does Not Exist!',
                    data:[]
                });
            }

            req.body.idUserFromToken = payload;
            next();
        }catch(error){
            return res.status(401).json({
                ok:false,
                message:'Token Validation Failed!',
                data:[]
            });
        }
    },
    validationJWTAdmin: async(req, res, next) => {
        try{
            const token = req.header('token') || "";
            const usersRepository = new UsersRepository();
            const privateKey = process.env.SECRETORPRIVATEKEY || 'helloworld';

            const isNull = isValueNullToken(token)
            if(isNull) {
                return res.status(401).json({
                    ok:false,
                    message:'The Token Is Required!',
                    data:[]
                });
            }
            
            const { payload } = jwt.verify(token, privateKey) ; 
            const resultFindUser = await  usersRepository.getByIdUser(payload);

            if(!resultFindUser.dataValues) {
                return res.status(401).json({
                    ok:false,
                    message:'The User Does Not Exist!',
                    data:[]
                });
            }
            const role = resultFindUser.dataValues.role;
            if(role != 'admin') {
                return res.status(401).json({
                    ok:false,
                    message:'You Do Not Have Access To This Feature!',
                    data:[]
                });
            }

            req.body.idUserFromToken = payload;
            next();
        }catch(error){
            return res.status(401).json({
                ok:false,
                message:'Token Validation Failed!',
                data:[]
            });
        }
    }

});
