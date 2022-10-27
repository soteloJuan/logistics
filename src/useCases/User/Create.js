const shajs = require('sha.js');
const { nanoid } = require('nanoid/async');

const { ApplicationException } = require('../../common/exceptions/ApplicationException');
const { UsersRepository } = require('../../persistance/inDatabaseUserRepository');

// Helpers
const { validationsFields, validationEmail } = require('../../common/helpers/customValidations');


module.exports = () => ({

    Execute: async(
            name,
            lastname,
            email,
            password,
            phone,
            role = 'client'
        ) => {

        const usersRepository = new UsersRepository();
        const isMissingField =  await validationsFields({name, lastname, email, password, phone});
        if(isMissingField.ok){ throw new ApplicationException( `The field ${isMissingField.nameField} is Required`, 400); }
        const isValidEmail = await validationEmail(email);
        if(!isValidEmail){ throw new ApplicationException( `The Email is Invalid`, 400); }
        if(password.length < 6 ) {throw new ApplicationException('The Password must have more than 6 characters', 400); }

        const findByEmail = await usersRepository.getByEmail(email);
        if(findByEmail){ throw new ApplicationException('The Email Already Exists', 401); }
        
        const idUser = await nanoid();
        const createDate = new Date();
        const active = true;
        password = await shajs('sha256').update(password).digest('hex');

        await usersRepository.create({idUser, name, lastname, email, password, phone, createDate, role, active});

        return {
            message: 'User created successfully',
            data: []
        }
    }

});