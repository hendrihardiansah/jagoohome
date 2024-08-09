import { validate } from "../validation/validation.js";
import { registerUserValidation, loginUserValidation, paketValidation, createOrderValidation } from "../validation/jagoohome_validation.js";
import { prismaClient } from "../application/database.js";
import { responseError } from "../error/responseError.js";
import bcrypt from "bcrypt";
import utilityService from "./utility-service.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
// import { valid } from "joi";

const register = async (request) => {
    const user = validate(registerUserValidation, request);
    // console.log(request);
    // return(false);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if(countUser === 1){
        throw new responseError(400, "Username already exist");
    }

    user.password = await bcrypt.hash(user.password, 10);

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })
}

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true
        }
    });

    if(!user){
        throw new responseError(401, "Wrong Username or Password");
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if(!isPasswordValid){
        throw new responseError(401, "Wrong Username or Password");
    }

    //Non JWT
    /*
    const token = uuid().toString();
    return prismaClient.user.update({
        data: {
            token:token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    });
    */
    // End of Non JWT

    //JWT
    
    const payload = {
        username: user.username,
        name: user.name
    };

    const secret = process.env.JWT_SECRET;
    const expiredIn = 60*60*1; //satuan detik
    const token = jwt.sign(payload, secret, {expiresIn: expiredIn});
    return token;
    
    //End of JWT
}

const paket = async (request) => {
    // const getPaket = validate(paketValidation, request);
    // console.log(123123);

    const allPakets = await prismaClient.paket.findMany({
        select: {
            nama_paket: true,
            harga: true,
            deskripsi: true
        }
    });
    // console.log(allPakets);
    

    if(!allPakets){
        throw new responseError(404, "Paket is not found");
    }

    return allPakets;
}

const create = async (user, request) => {
    const order = validate(createOrderValidation, request);
    order.id_user = user.id_user;

    return prismaClient.contact.create({
        data: contact,
        select:{
            nama: true,
            kota: true,
            kecamatan: true,
            jalan: true
        }
    });
}

const teknisi = async (request) => {
   
    const teknisi = await prismaClient.teknisi.findUnique({
        where:{
            id: teknisi.id_teknisi
        },
        select:{
            id_teknisi: true,
            nama_teknisi: true,
            nomor_telpon: true,
            nip: true
        },
    });

    if(!teknisi){
        throw new responseError(404, "Teknisi is not found");
    }

    return teknisi;
}

export default{
    register,
    login,
    paket,
    create,
    teknisi
}