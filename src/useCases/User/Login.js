
const shajs = require('sha.js');
const { ApplicationException } = require('../../common/exceptions/ApplicationException');
const { GenerateJWT } = require('../../common/helpers/generateToken') ;

const { UsersRepository } = require('../../persistance/inDatabaseUserRepository');

module.exports = () => ({

    Execute: async(email, password) => {
        const usersRepository = new UsersRepository();

        if(!email || !password){ throw new ApplicationException('The Email and Passowrd is Required', 400); }
        if(password.length < 6 ) throw new ApplicationException('The Password must have more than 6 characters', 400);
        
        const findByEmail = await usersRepository.getByEmail(email);
        if(!findByEmail){ throw new ApplicationException('The Email Not Exists', 401); }

        password = await shajs('sha256').update(password).digest('hex');

        if(findByEmail.password != password){ throw new ApplicationException('Invalid Password', 400); }
        const token = await GenerateJWT(findByEmail.idUser);

        return {
            message: 'Query successfully',
            data: findByEmail,
            token
        }
    }

});
