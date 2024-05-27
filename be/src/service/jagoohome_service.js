import { validate } from "../validation/validation.js";
import { registerUserValidation, loginUserValidation, getPaketValidation,
        createOrderValidation, getTeknisiValidation, getOrderValidation,
        logoutUserValidation, 
        updateOrderValidation,
        updateStatusValidation} from "../validation/jagoohome_validation.js";
import { prismaClient } from "../application/database.js";
import { responseError } from "../error/responseError.js";
import bcrypt from "bcrypt";
import utilityService from "./utility-service.js";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import e from "express";
// import { valid } from "joi";

const register = async (request) => {

    const user = validate(registerUserValidation, request);

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
            id: true,
            username: true,
            password: true,
            name: true,
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
        id:user.id,
        username: user.username,
        name: user.name
    };
    const secret = process.env.JWT_SECRET;
    const expiredIn = 60*60*1; //satuan detik
    const token = jwt.sign(payload, secret, {expiresIn: expiredIn});
     
    return {
        id : user.id,
        nama: user.name,
        token
    }
    // return token;
    
    //End of JWT
}

const paket = async ( user, request, query ) => {

    // const getPaket = validate(getOrderValidation, request);

    // const sortby = query.sortby;
    // const filters = [];

    // if(query.filter == "jumlah_order"){
    //     filters.push({
    //         jumlah_order:sortby
    //     });
    // }
    
    const allPakets = await prismaClient.paket.findMany({
        select: {
            nama_paket: true,
            harga: true,
            deskripsi: true,
            jumlah_order: true
        },
        // orderBy:filters
    });
    // console.log(allPakets);
    

    if(!allPakets){
        throw new responseError(404, "Paket is not found");
    }

    return allPakets;
}


const order = async (user, request) => {

    const createOrder = validate(createOrderValidation, request);
    createOrder.user_id = user.id;

    return prismaClient.order.create({
        data: createOrder,
        select:{
            id:true,
            paket:{
                select:{
                    nama_paket: true
                },
            },
            // paket_id:true
        },
    });
}

const updateorder = async (user, request) => {

    const updateOrder = validate(updateOrderValidation, request);
    const totalContact = await prismaClient.order.count({
        where:{
            id: updateOrder.id
        }
    });

    if(totalContact !==1){
        throw new responseError (404, "Contact is not found");
    }

    updateOrder.user_id = user.id;

    return prismaClient.order.update({
        where: {
            id: updateOrder.id
        },
        data: updateOrder,
        select:{
            id:true,
            nama:true,
            email:true,
            upload_identity:true,
            kota:true,
            kecamatan:true,
            jalan:true,
            paket:{
                select:{
                    nama_paket: true
                },
            },
            // paket_id:true
        },
    });
}

const updatestatus = async (user, request) => {

    const updateStatus = validate(updateStatusValidation, request);
    const totalContact = await prismaClient.order.count({
        where:{
            id: updateStatus.id
        }
    });

    if(totalContact !==1){
        throw new responseError (404, "Contact is not found");
    }

    // updateOrder.user_id = user.id;

    return prismaClient.order.update({
        where: {
            id: updateStatus.id
        },
        data: updateStatus,
        select:{
            id:true,
            status_id:true,
            reject_reason:true
            // paket_id:true
        },
    });
}

const teknisi = async ( user, request, query ) => {

    const getTeknisi = validate(getTeknisiValidation, request);
    const filters = [];
    const sortby = query.sortby;

    if(query.filter == "id"){
        filters.push({
            id:sortby
        })
    }

    if(query.filter == "nip"){
        filters.push({
            nip:sortby
        })
    }

    if(query.filter == "total_handling"){
        filters.push({
            total_handling:sortby
        })
    }

    const teknisi = await prismaClient.teknisi.findMany({
        orderBy: filters,
        where:{
            id: getTeknisi.id
        },
        select:{
            id: true,
            nama: true,
            nomor_telpon: true,
            nip: true,
            total_handling: true
        }
    });
    
    if(!teknisi){
        throw new responseError(404, "Teknisi is not found");
    }
    
    return teknisi;
}

const orderan = async ( user, request, query ) => {

    const getOrder = validate(getOrderValidation, request);

    const filters = [];
    const sortby = query.sortby;

    if(query.filter == "id"){
        filters.push({
            id:sortby
        })
    }

    if(query.filter == "status_id"){
        filters.push({
            status_id:sortby
        })
    }

    const orderan = await prismaClient.order.findMany({
        where:{
            // user:user.id,
            id: getOrder.id
        },
        orderBy:filters,
        select:{
            id: true,
            nama: true,
            email: true,
            kota: true,
            kecamatan: true,
            jalan: true,
            user_id: true,
            status_id: true,
            paket_id: true
        }
    });

    if(!order){
        throw new responseError(404, "Order is not found");
    }

    return orderan;
}

const logout = async ( user, request ) => {
    
    const getRequest = validate( logoutUserValidation, request );
    console.log(user);
    const users = await prismaClient.user.findUnique({
        where:{
            username: user.username
        }
    });

    if(!users){
        throw new responseError(404, "User is not found");
    }

    return prismaClient.user.update({
        where: {
            username: user.username
        },
        data: {
            token: null
        },
        select:{
            username: true
        },
    });
}

export default{
    register,
    login,
    paket,
    order,
    updateorder,
    updatestatus,
    teknisi,
    orderan,
    logout
}