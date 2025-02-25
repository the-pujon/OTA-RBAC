import httpStatus  from 'http-status';
import AppError from "../../errors/AppError"
import UserModel from "../auth/auth.model"

const makeModeratorService = async(id: string) =>{


    const user = await UserModel.findById(id)

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    if(user!.role === 'superAdmin'){
        throw new AppError(httpStatus.FORBIDDEN, 'You cannot make a superAdmin an moderator')
    }

    const moderator = await UserModel.findByIdAndUpdate(id, {role: 'moderator'}, {new: true})
    if (!moderator) throw new AppError(httpStatus.NOT_FOUND,'User not found')
    return moderator
}

const removeModeratorService = async(id: string)=>{


    const user = await UserModel.findById(id)

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    if(user!.role === 'superAdmin'){
        throw new AppError(httpStatus.FORBIDDEN, 'You cannot remove a superAdmin an moderator')
    }



    const moderator = await UserModel.findByIdAndUpdate(id, {role: 'user'}, {new: true})
    if (!moderator) throw new AppError(httpStatus.NOT_FOUND,('User not found'))
    return moderator
}

const getModeratorService = async()=>{
    const moderators = await UserModel.find({role: 'moderator'})
    console.log("moderators", moderators)
    return moderators
}


export const ModeratorService = {
    makeModeratorService,
    removeModeratorService,
    getModeratorService,
}