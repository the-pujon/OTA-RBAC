import httpStatus  from 'http-status';
import AppError from "../../errors/AppError"
import UserModel from "../auth/auth.model"

const makeAdminService = async(id: string) =>{
    const admin = await UserModel.findByIdAndUpdate(id, {role: 'admin'}, {new: true})
    if (!admin) throw new AppError(httpStatus.NOT_FOUND,'User not found')
    return admin
}

const removeAdminService = async(id: string)=>{
    const admin = await UserModel.findByIdAndDelete(id)
    if (!admin) throw new AppError(httpStatus.NOT_FOUND,('User not found'))
    return admin
}

export const AdminService = {
    makeAdminService,
    removeAdminService
}