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
        const result = await StandarSizes.findAll();
        return result;
    }


}

module.exports = { StandarSizesRepository };
