const { Router } = require('express');
const { create, getAll } = require('../controllers/standarSize.controller');
const ValidationJWT = require('../common/middlewares/validationJWT');

const router = Router();
const validationJwt = ValidationJWT();

router.post('/createStandarSize', create); // ACCESS ONLY ADMIN
router.get('/getAllStandarSize', getAll);



module.exports = router;
