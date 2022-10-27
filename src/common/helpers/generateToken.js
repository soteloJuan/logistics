const  jwt = require('jsonwebtoken');

const GenerateJWT = async (idUser) => {

    const privateKey = process.env.SECRETORPRIVATEKEY || 'helloWorld';
    const payload = idUser;

    return  await jwt.sign({ payload }, privateKey, { expiresIn: '24h' });
};

module.exports = {
    GenerateJWT
}