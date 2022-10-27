const { UsersRepository } = require('../../persistance/inDatabaseUserRepository');


module.exports = () => ({

    Execute: async() => {

        const usersRepository = new UsersRepository();

        const findAllReceipts = await usersRepository.getAllUsers();        
        
        return {
            message: 'Query Successfully',
            data: findAllReceipts
        }
    }

});
