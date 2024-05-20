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

const paketValidation = Joi.object({
    nama_paket: Joi.string().max(100).optional()
})

const createOrderValidation = Joi.object({
    nama: Joi.string().max(100).optional(),
    // upload_identity: Joi.blob().required(),
    kota: Joi.string().max(100).optional(),
    kecamatan: Joi.string().max(100).optional(),
    jalan: Joi.string().max(100).optional()
})

const teknisiValidation = Joi.object({
    id_teknisi: Joi.number().max(10).required()
})

export{
    registerUserValidation,
    loginUserValidation,
    paketValidation,
    createOrderValidation,
    teknisiValidation
}