const { ApplicationException } = require('../../common/exceptions/ApplicationException');

const { UsersRepository } = require('../../persistance/inDatabaseUserRepository');

module.exports = () => ({

    Execute: async(idUser, active = false) => {
        const usersRepository = new UsersRepository();

        console.log({idUser, active});

        if(!idUser){ throw new ApplicationException('The idUser and Active is Required', 400); }
        
        const findByIdUser = await usersRepository.getByIdUser(idUser);
        if(!findByIdUser){ throw new ApplicationException('The User Not Exists', 401); }

        await usersRepository.updateActive(idUser, active);

        return {
            message: 'Updated Successfully',
            data: [],
        }
    }

});
