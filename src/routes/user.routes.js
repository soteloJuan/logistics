const { Router } = require('express');
const { create, login, getAll, deleteUser } = require('../controllers/user.controller');
const ValidationJWT = require('../common/middlewares/validationJWT');

const router = Router();
const validationJwt = ValidationJWT();

router.post('/createUser', validationJwt.validationJWTAdmin, create);
router.get('/loginUser', login);
router.get('/getAllUser', validationJwt.validationJWTAdmin, getAll);
router.delete('/deleteUser/:idUser', validationJwt.validationJWTAdmin, deleteUser); 



module.exports = router;
