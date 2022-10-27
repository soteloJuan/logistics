const { ApplicationException } = require('../../common/exceptions/ApplicationException');
const { StandarSizesRepository } = require('../../persistance/inDatabaseStandarSizeRepository');

// Helpers
const { validationsFields } = require('../../common/helpers/customValidations');


module.exports = () => ({

    Execute: async(
            idStandarSize,
            weight,
            price
        ) => {

        const standarSizesRepository = new StandarSizesRepository();
        const isMissingField =  await validationsFields({idStandarSize, weight, price});
        if(isMissingField.ok){ throw new ApplicationException( `The field ${isMissingField.nameField} is Required`, 400); }

        const findByIdStandarSize = await standarSizesRepository.getByIdStandarSizes(idStandarSize);
        if(findByIdStandarSize){ throw new ApplicationException('The ID Already Exists', 401); }
        
        await standarSizesRepository.create({idStandarSize, weight, price});

        return {
            message: 'Standar Size Created Successfully',
            data: []
        }
    }

});