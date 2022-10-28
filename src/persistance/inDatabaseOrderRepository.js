const { Orders } = require('../model/Order.Model');
const { Users } = require('../model/Users.Model');
const { Origins } = require('../model/Origins.Model');
const { Destinations } = require('../model/Destination.Model');
const { StatusOrders } = require('../model/StatusOrder.Model');
const { StandarSizes } = require('../model/StandarSize.Model');

const { ProductOrders }  = require('../model/ProductOrder.Model');
class OrdersRepository{

    async create(data){
        await Orders.create(data);
        return null;
    }

    async getByIdOrder(idOrder){
        const result = await Orders.findByPk(idOrder,{
            include:[ Users, Origins, Destinations, StatusOrders, StandarSizes, {
                model: ProductOrders
            }],
            attributes:["totalWeight", "totalProduct", "totalPrice", "createDate"]
        });
        return result;
    }

    async updateStatusByIdOrder(idOrder, idStatusOrder){
        const result = await Orders.update({idStatusOrder}, {
            where: {
                idOrder
            }
        })
        return result;
    }

}

module.exports = { OrdersRepository };
