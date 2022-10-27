
const { Users } = require('../model/Users.Model');

class UsersRepository{

    async create(data){
        await Users.create(data);
        return null;
    }

    async getByIdUser(idUser){
        const result = await Users.findByPk(idUser);
        return result;
    }

    async getAllUsers(){
        const result = await Users.findAll();
        return result;
    }

    async getByEmail(email){
        const result = await Users.findOne({
            where:{
                email
            }
        });
        return result;
    }

    async updateActive(idUser, active){
        const result = await Users.update({active}, {
            where:{
                idUser
            },
        });
        return result;
    }

    async login(email, password){
        const result = await Users.findOne({
            where:{
                email,
                password
            }
        });
        return result;
    }
}

module.exports = { UsersRepository };
