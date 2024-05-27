import * as bcrypt from 'bcrypt';

const generateToken = async (length) => {
    let result= '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const encryptPassword = async( password) => {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
}

const matchingPassword = async (inputPassword, dbPassword) => {
    return await bcrypt.compare(inputPassword, dbPassword);
}

const controllerResult = async (res, result) => {
    res.status(200).json({
        code: "0" ,
        info: "OK",
        data: result
    });
}


const controllerResultPaging = async (res, result) => {

    res.status(200).json({
        data: result.data,
        paging: result.paging
    });
}

export default {
    controllerResult,
    matchingPassword,
    encryptPassword,
    generateToken,
    controllerResultPaging
}