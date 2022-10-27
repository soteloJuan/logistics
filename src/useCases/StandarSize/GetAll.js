const { StandarSizesRepository } = require('../../persistance/inDatabaseStandarSizeRepository');


module.exports = () => ({

    Execute: async() => {

        const standarSizesRepository = new StandarSizesRepository();
        const findAllStandarSizes = await standarSizesRepository.getAllStandarSizes();        
        
        return {
            message: 'Query Successfully',
            data: findAllStandarSizes
        }
    }

});
