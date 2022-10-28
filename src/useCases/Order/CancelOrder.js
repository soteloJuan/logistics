const moment = require('moment');

const { ApplicationException } = require('../../common/exceptions/ApplicationException');
const { OrdersRepository } = require('../../persistance/inDatabaseOrderRepository');
const { StatusOrdersRepository } = require('../../persistance/inDatabaseStatusOrderRepository');

module.exports = () => ({

    Execute: async(idOrder) => {

        const statusOrdersRepository = new StatusOrdersRepository();
        const ordersRepository = new OrdersRepository();        
        if(!idOrder){ throw new ApplicationException('idOrder is Necessary', 401); }
        const resultFindByIdOrder = await ordersRepository.getByIdOrder(idOrder);
        if(!resultFindByIdOrder){ throw new ApplicationException('The Order Not Exists', 401); }

        const currentStatusOrder = resultFindByIdOrder.dataValues.statusOrder.dataValues.name;
        if(currentStatusOrder == 'cancelado'){ throw new ApplicationException('The order has already been canceled.', 401); }

        const exceptionsToCancel = ['en_ruta','entregado']; // Se puede crear una tabla en DB y hacerlo mas dinamico
        const impossibleToCancel = exceptionsToCancel.includes(currentStatusOrder);
        if(impossibleToCancel){ throw new ApplicationException('The current status of your order makes it impossible to cancel it, as it is about to arrive at its destination or has already been delivered.', 401); }

        const createdDateOrder = resultFindByIdOrder.dataValues.createDate;
        const dateOrder = moment(new Date(createdDateOrder));
        const dateNow = moment(new Date());
        const differencesMinutes = dateNow.diff(dateOrder, 'minutes');

        let message = "";
        const minutesLimitToRefund = 2; // Se puede crear una tabla en DB y hacerlo mas dinamico
        (differencesMinutes > minutesLimitToRefund) 
            ? (message = "The order is canceled, but there will be no refund") 
            : (message = "The order is canceled, and there will be a refund");

        const findByNameStatusCancel = await statusOrdersRepository.getByName('cancelado');
        const idStatusOrder =  findByNameStatusCancel.dataValues.idStatusOrder;
        await ordersRepository.updateStatusByIdOrder(idOrder, idStatusOrder)
        return {
            message,
            data: findByNameStatusCancel
        }
    }

});
