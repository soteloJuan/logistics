const { StatusOrdersRepository } = require('../../persistance/inDatabaseStatusOrderRepository');


module.exports = () => ({

    Execute: async() => {

        const statusOrdersRepository = new StatusOrdersRepository();
        const findAllStantusOrder = await statusOrdersRepository.getAllIdStatusOrders();        
        
        return {
            message: 'Query Successfully',
            data: findAllStantusOrder
        }
    }

});
