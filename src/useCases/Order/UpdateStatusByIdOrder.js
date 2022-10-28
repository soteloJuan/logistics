const { ApplicationException } = require('../../common/exceptions/ApplicationException');

const { OrdersRepository } = require('../../persistance/inDatabaseOrderRepository');
const { StatusOrdersRepository } = require('../../persistance/inDatabaseStatusOrderRepository');


module.exports = () => ({

    Execute: async(idOrder, newStatus) => {

        const ordersRepository = new OrdersRepository();
        const statusOrdersRepository = new StatusOrdersRepository();
        
        if( !idOrder || !newStatus ){ throw new ApplicationException('idOrder and Status are Necessary', 401); }
        const resultFindByIdOrder = await ordersRepository.getByIdOrder(idOrder);
        if(!resultFindByIdOrder){ throw new ApplicationException('The Order Not Exists', 401); }
        
        const resultFindByName = await statusOrdersRepository.getByName(newStatus);
        if(!resultFindByName){ throw new ApplicationException('The New Status Not Exists', 401); }

        const disallowedStatus = 'cancelado';
        if(newStatus == disallowedStatus){ throw new ApplicationException('This Status is not Allowed.', 401); }

        const idStatusOrder = resultFindByName.dataValues.idStatusOrder;
        await ordersRepository.updateStatusByIdOrder(idOrder, idStatusOrder);

        return {
            message: 'Status Updated Successfully',
            data: []
        }
    }

});
