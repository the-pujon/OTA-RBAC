import httpStatus  from 'http-status';
import AppError from "../../errors/AppError"
import UserModel from "../auth/auth.model"

const makeAdminService = async(id: string) =>{

    const user = await UserModel.findById(id)

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    if(user!.role === 'superAdmin'){
        throw new AppError(httpStatus.FORBIDDEN, 'You cannot make a superAdmin an admin')
    }


    const admin = await UserModel.findByIdAndUpdate(id, {role: 'admin'}, {new: true})
    // console.log("addmin", admin)
    if (!admin) throw new AppError(httpStatus.NOT_FOUND,'User not found')
    return admin
}

const removeAdminService = async(id: string)=>{

    const user = await UserModel.findById(id)

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    if(user!.role === 'superAdmin'){
        throw new AppError(httpStatus.FORBIDDEN, 'You cannot remove super admin')
    }

    const admin = await UserModel.findByIdAndUpdate(id, {role: 'user' }, {new: true})
    if (!admin) throw new AppError(httpStatus.NOT_FOUND,('User not found'))
    return admin
}

const getAdminsService = async () => {
    const admins = await UserModel.find({ role: { $in: ['admin', 'superAdmin'] } });
    return admins;
};

export const AdminService = {
    makeAdminService,
    removeAdminService,
    getAdminsService,
}