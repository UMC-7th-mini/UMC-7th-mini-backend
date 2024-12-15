import { nonUser } from "../../project/dtos/project.dto.js";
import { getUserInfoRepository } from "./user.info.repository.js";

export const getUserInfoService = async (userKey) => {
    const  user = await getUserInfoRepository (userKey);
    if(!user) {
        throw new nonUser;
    }
    return user;
}