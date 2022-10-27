const { Router } = require('express');
const { create, login, getAll, deleteUser } = require('../controllers/user.controller');
const ValidationJWT = require('../common/middlewares/validationJWT');

const router = Router();
const validationJwt = ValidationJWT();

router.post('/createUser', create); // ACCESS ONLY ADMIN
router.get('/loginUser', login);
router.get('/getAllUser', getAll); // ACCESS ONLY ADMIN
router.delete('/deleteUser/:idUser',  deleteUser); // ACCESS ONLY ADMIN



module.exports = router;
