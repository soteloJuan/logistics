const { Orders } = require('../model/Order.Model');

class OrdersRepository{

    async create(data){
        await Orders.create(data);
        return null;
    }

}

module.exports = { OrdersRepository };
