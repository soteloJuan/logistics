const { ProductOrders } = require('../model/ProductOrder.Model');

class ProductOrdersRepository{

    async create(data){
        await ProductOrders.create(data);
        return null;
    }

}

module.exports = { ProductOrdersRepository };
