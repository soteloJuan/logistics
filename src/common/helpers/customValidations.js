
const isValueNullToken = (token) => {

    return (token?.length === 0 || token.trim() == "" || token === undefined || token === null) ? (true) : (false);
};

const validationEmail = async(email) => {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const isValid = validRegex.test(email);
    return isValid
};


const validationsFields = async(data) => {

    
    const arrayKeys = Object.keys(data);
    const arrayValues = Object.values(data);

    for (const index in arrayKeys) {
        if(!arrayValues[index]){
            return {
                ok:true,
                nameField: arrayKeys[index],
            };
        }
    }
    return {
        ok:false,
        nameField: '',
    };
};

module.exports = {
    validationsFields,
    validationEmail,
    isValueNullToken
}