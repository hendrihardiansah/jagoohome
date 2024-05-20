import utilityService from "../service/utility-service.js";
import jagoohomeService from "../service/jagoohome_service.js";
import { prismaClient } from "../application/database.js";

const register = async (req, res, next) => {

    try{
        const result = await jagoohomeService.register(req.body);
        await utilityService.controllerResult(res, result);

    }catch(e){
        next(e);
    }
}

const login = async(req, res, next) => {
    try{
        const result = await jagoohomeService.login(req.body);
        await utilityService.controllerResult(res, result);

    } catch (e){
        next(e);
    }
}

const paket = async(req, res, next) => {
    try{
        const result = await jagoohomeService.paket();
        await utilityService.controllerResult(res, result);

    } catch (e){
        next(e);
    }
}

const create = async(req, res, next) => {
    try{
        const order = req.user;
        const request = req.body;
        const result = await contactService.create(order, request);

        await utilityService.controllerResult(res, result);

    } catch (e) {
        next(e);
    }
}
const teknisi = async( res, next) => {
    try{
        const result = await jagoohomeService.teknisi(req.body);
        await utilityService.controllerResult(res, result);

    } catch (e){
        next(e);
    }
}

export default {
    register,
    login,
    paket,
    create,
    teknisi
}