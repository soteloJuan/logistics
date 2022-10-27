const { nanoid } = require('nanoid/async');

const { ApplicationException } = require('../../common/exceptions/ApplicationException');
const { StatusOrdersRepository } = require('../../persistance/inDatabaseStatusOrderRepository');

module.exports = () => ({

    Execute: async(name) => {

        const statusOrdersRepository = new StatusOrdersRepository();
        if(!name){ throw new ApplicationException( `The field name is Required`, 400); }

        const idStatusOrder = await nanoid();
        await statusOrdersRepository.create({idStatusOrder, name});

        return {
            message: 'Status Order Created Successfully',
            data: []
        }
    }

});
