const { ApplicationException } = require('../../common/exceptions/ApplicationException');

const { OrdersRepository } = require('../../persistance/inDatabaseOrderRepository');

module.exports = () => ({

    Execute: async(idOrder) => {

        const ordersRepository = new OrdersRepository();
        
        if(!idOrder){ throw new ApplicationException('idOrder is Necessary', 401); }
        
        const resultFindByIdOrder = await ordersRepository.getByIdOrder(idOrder);

        if(!resultFindByIdOrder){ throw new ApplicationException('The Order Not Exists', 401); }
        
        return {
            message: 'Query Successful',
            data: resultFindByIdOrder
        }
    }

});
