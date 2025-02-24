import httpStatus  from 'http-status';
import AppError from "../../errors/AppError"
import UserModel from "../auth/auth.model"

const makeModeratorService = async(id: string) =>{
    const moderator = await UserModel.findByIdAndUpdate(id, {role: 'moderator'}, {new: true})
    if (!moderator) throw new AppError(httpStatus.NOT_FOUND,'User not found')
    return moderator
}

const removeModeratorService = async(id: string)=>{
    const moderator = await UserModel.findByIdAndDelete(id)
    if (!moderator) throw new AppError(httpStatus.NOT_FOUND,('User not found'))
    return moderator
}

export const ModeratorService = {
    makeModeratorService,
    removeModeratorService
}