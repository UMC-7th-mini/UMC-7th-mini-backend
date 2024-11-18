import { validateUserInput, validateUserOutput } from "../dtos/user.dto.js";
import { getUserInfoService } from "./user.info.service.js";



export const getUserInfo = async (req, res, next) => { 
    try {
    
        validateUserInput(req.body.id);

        const user = await getUserInfoService(req.body.id);

        if(!user){
            return next(HttpException(404, "User not found"));
        }
        validateUserOutput(user);

        return res.status(200).json({ success: true, data: user });

    } catch(error) {

        next(error);
    }
};
