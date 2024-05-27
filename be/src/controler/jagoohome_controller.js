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
        const request = req.body;
        const query = req.query;

        const result = await jagoohomeService.paket( query );
        await utilityService.controllerResult(res, result);

    } catch (e){
        next(e);
    }
}

const order = async(req, res, next) => {
    try{
        const request = req.body;
        const user = req.userToken;

        const result = await jagoohomeService.order(user, request);
        await utilityService.controllerResult(res, result);

    } catch (e) {
        next(e);
    }
}

const updateorder = async(req, res, next) => {
    try{
        const request = req.body;
        const user = req.userToken;

        const result = await jagoohomeService.updateorder(user, request);
        await utilityService.controllerResult(res, result);

    } catch (e) {
        next(e);
    }
}

const updatestatus = async(req, res, next) => {
    try{
        const request = req.body;
        const user = req.userToken;

        const result = await jagoohomeService.updatestatus(user, request);
        await utilityService.controllerResult(res, result);

    } catch (e) {
        next(e);
    }
}

const teknisi = async(req, res, next) => {
    try{
        const user = req.userToken;
        const request = req.body;
        const query = req.query;

        const result = await jagoohomeService.teknisi(user, request, query);
        await utilityService.controllerResult(res, result);

    } catch (e) {
        next(e);
    }
}

const orderan = async(req, res, next) => {
    try{
        const user = req.userToken;
        const request = req.body;
        const query = req.query;

        const result = await jagoohomeService.orderan(user, request, query);
        await utilityService.controllerResult(res, result);

    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try{
        const user = req.userToken;
        console.log(user)
        const request = {
            username : user.username
        }

        const result = await jagoohomeService.logout( request );
        await utilityService.controllerResult( res, result );
        
    } catch (e) {
        next(e);
    }

}

export default {
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