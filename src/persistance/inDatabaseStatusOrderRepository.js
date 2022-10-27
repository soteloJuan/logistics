const { StatusOrders } = require('../model/StatusOrder.Model');

class StatusOrdersRepository{

    async create(data){
        await StatusOrders.create(data);
        return null;
    }

    async getByIdStatusOrder(idStatusOrder){
        const result = await StatusOrders.findByPk(idStatusOrder);
        return result;
    }

    async getAllIdStatusOrders(){
        const result = await StatusOrders.findAll();
        return result;
    }


}

module.exports = { StatusOrdersRepository };