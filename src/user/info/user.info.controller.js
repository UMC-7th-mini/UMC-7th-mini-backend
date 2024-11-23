import HttpException from "../../middlewares/errorHandler.js";
import { getUserInfoService } from "./user.info.service.js";



export const getUserInfo = async (req, res, next) => { 
    try {
        const userKey = req.body.userKey;

        const user = await getUserInfoService(userKey);

        if(!user){
            return next(new HttpException(404, "User not found"));
        }

        return res.status(200).json({ success: true, data: user });

    } catch(error) {
        next(error);
    }
};