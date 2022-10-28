const { nanoid } = require('nanoid/async');

const { ApplicationException } = require('../../common/exceptions/ApplicationException');

const { OrdersRepository } = require('../../persistance/inDatabaseOrderRepository');
const { OriginsRepository } = require('../../persistance/inDatabaseOriginRepository');
const { DestinationsRepository } = require('../../persistance/inDatabaseDestinationRepository');
const { StatusOrdersRepository } = require('../../persistance/inDatabaseStatusOrderRepository');
const { StandarSizesRepository } = require('../../persistance/inDatabaseStandarSizeRepository');
const { ProductOrdersRepository } = require('../../persistance/inDatabaseProductOrderRepository');

// Helpers
const { validationsFields } = require('../../common/helpers/customValidations');

module.exports = () => ({
    
    Execute: async(idUser, origin, destination, products) => {

        const ordersRepository = new OrdersRepository();
        const originsRepository = new OriginsRepository();
        const destinationsRepository = new DestinationsRepository();
        const statusOrdersRepository = new StatusOrdersRepository();
        const standarSizesRepository = new StandarSizesRepository();
        const productOrdersRepository = new ProductOrdersRepository();

        
        const isMissingFieldOrigin =  await validationsFields({
            address: origin.address,
            zipcode: origin.zipcode,
            extNum: origin.extNum,
            intNum: origin.intNum,
            city: origin.city,
            reference: origin.reference
        });
        if(isMissingFieldOrigin.ok) throw new ApplicationException(`The field ${isMissingFieldOrigin.nameField} is Required`, 400);

        const isMissingFieldDestination =  await validationsFields({
            address: destination.address,
            zipcode: destination.zipcode,
            extNum: destination.extNum,
            intNum: destination.intNum,
            city: destination.city,
            reference: destination.reference
        });
        if(isMissingFieldDestination.ok) throw new ApplicationException(`The field ${isMissingFieldDestination.nameField} is Required`, 400);

        let totalWeight = 0;
        let totalProduct = 0;
        for (const i in products) {
            const {description, weight} = products[i]
            if(!description || !weight || weight <= 0){ throw new ApplicationException('Description and Weight are Required', 400) }
            totalProduct ++;
            totalWeight += parseInt(weight);
        }

        const findMaxStadarSize = await standarSizesRepository.getMaxStandarSize();
        const maximumWeight = Object.values(findMaxStadarSize[0]);
        if(totalWeight > maximumWeight){ throw new ApplicationException('The package exceeds the maximum weight, please contact the company', 400) }

        const resultStatusInitial = await statusOrdersRepository.getByName('creado');
        if(!resultStatusInitial) { throw new ApplicationException("Initial status not found", 400); }
        const idStatusOrder = resultStatusInitial.dataValues.idStatusOrder;

        // INSERTS

        const idOrigin = await nanoid();
        await originsRepository.create({
            idOrigin,
            address: origin.address,
            zipcode: origin.zipcode,
            extNum: origin.extNum,
            intNum: origin.intNum,
            city: origin.city,
            reference: origin.reference
        });

        const idDestination = await nanoid();
        await destinationsRepository.create({
            idDestination,
            address: destination.address,
            zipcode: destination.zipcode,
            extNum: destination.extNum,
            intNum: destination.intNum,
            city: destination.city,
            reference: destination.reference
        });

        const resultFindAllStandarSize = await standarSizesRepository.getAllStandarSizes();
        let idStandarSize = '';
        let totalPrice = 0;
        let initValueWeight = 1;
        for (const i in resultFindAllStandarSize) {
            idStandarSize = resultFindAllStandarSize[i].dataValues.idStandarSize;
            const weight = parseInt(resultFindAllStandarSize[i].dataValues.weight);
            totalPrice = parseInt(resultFindAllStandarSize[i].dataValues.price);
            if(totalWeight >= initValueWeight && totalWeight <= weight){ break; }
            initValueWeight =  1 + weight;
        }

        const idOrder = await nanoid();
        const createDate = new Date();
        
        await ordersRepository.create({idOrder, idUser, idOrigin, idDestination, idStatusOrder, idStandarSize, totalWeight, totalProduct, totalPrice, createDate})

        for (const i in products) {
            const {description, weight} = products[i];
            const idProductOrder = await nanoid();
            await productOrdersRepository.create({idProductOrder, idOrder, description, weight})
        }

        return {
            message: 'Order Created Successfully',
            data: []
        }
    }

});
