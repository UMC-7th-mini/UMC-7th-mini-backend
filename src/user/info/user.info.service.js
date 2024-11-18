import { nonUser } from "../../project/dtos/project.dto.js";
import { getUserInfoRepository } from "./user.info.repository.js";

export const getUserInfoService = async (data) => {
    const  user = await getUserInfoRepository ({
        userName : data.userName,
        mbti     : data.mbti,
        role     : data.role
    });

    if(!user) {
        throw new nonUser;
    }
}