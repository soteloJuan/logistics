const { Destinations } = require('../model/Destination.Model');

class DestinationsRepository{

    async create(data){
        await Destinations.create(data);
        return null;
    }

}

module.exports = { DestinationsRepository };
