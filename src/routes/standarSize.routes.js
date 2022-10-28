const { Router } = require('express');
const { create, getAll } = require('../controllers/standarSize.controller');
const ValidationJWT = require('../common/middlewares/validationJWT');

const router = Router();
const validationJwt = ValidationJWT();

router.post('/createStandarSize', validationJwt.validationJWTAdmin, create);
router.get('/getAllStandarSize', validationJwt.validationJWTAdmin, getAll);



module.exports = router;
