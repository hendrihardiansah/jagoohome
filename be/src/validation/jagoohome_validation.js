import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required()
})

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

const getPaketValidation = Joi.object({
    nama_paket: Joi.string().max(100).optional()
})

const createOrderValidation = Joi.object({
    nama: Joi.string().max(100).required(),
    email: Joi.string().max(100).required(),
    upload_identity: Joi.string().max(100).required(),
    kota: Joi.string().max(100).required(),
    kecamatan: Joi.string().max(100).required(),
    jalan: Joi.string().max(100).required(),
    paket_id: Joi.number().max(10).required()
})

const updateOrderValidation = Joi.object({
    id: Joi.number().positive().required(),
    nama: Joi.string().max(100).optional(),
    email: Joi.string().max(100).optional(),
    upload_identity: Joi.string().max(100).optional(),
    kota: Joi.string().max(100).optional(),
    kecamatan: Joi.string().max(100).optional(),
    jalan: Joi.string().max(100).optional(),
    paket_id: Joi.number().max(10).optional()
})

const updateStatusValidation = Joi.object({
    id: Joi.number().max(10).required(),
    status_id: Joi.string().max(10).required(),
    reject_reason: Joi.string().max(100).optional()
})

const getOrderValidation = Joi.object({
    id: Joi.number().max(10).optional()
})

const getTeknisiValidation = Joi.object({
    id: Joi.number().max(10).optional()
})

const logoutUserValidation = Joi.object({
    username: Joi.string().max(100).required()
})

export{
    registerUserValidation,
    loginUserValidation,
    getPaketValidation,
    createOrderValidation,
    updateOrderValidation,
    updateStatusValidation,
    getOrderValidation,
    getTeknisiValidation,
    logoutUserValidation
}