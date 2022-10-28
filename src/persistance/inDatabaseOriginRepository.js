const { Origins } = require('../model/Origins.Model');

class OriginsRepository{

    async create(data){
        await Origins.create(data);
        return null;
    }

}

module.exports = { OriginsRepository };
