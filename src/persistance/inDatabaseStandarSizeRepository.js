
const sequelize = require('../database/config');
const { StandarSizes } = require('../model/StandarSize.Model');

class StandarSizesRepository{

    async create(data){
        await StandarSizes.create(data);
        return null;
    }

    async getByIdStandarSizes(idStandarSizes){
        const result = await StandarSizes.findByPk(idStandarSizes);
        return result;
    }

    async getAllStandarSizes(){
        const result = await StandarSizes.findAll({
            order:[
                ['weight', 'ASC']
            ]
        });
        return result;
    }

    async getMaxStandarSize(){
        const result = await StandarSizes.findAll({
            attributes: [
                sequelize.fn('MAX', sequelize.col('weight'))
            ],
            raw: true,
        });
        return result;
    }


}

module.exports = { StandarSizesRepository };
