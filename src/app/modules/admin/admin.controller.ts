import catchAsync from "../../utils/catchAsync.";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
import httpStatusCode from 'http-status';

const makeAdminController = catchAsync(async (req, res)=>{
    const id = req.params.id
    const result = await AdminService.makeAdminService(id)
    console.log(result)

    sendResponse(res,{
        statusCode: httpStatusCode.OK,
        success: true,
        message: 'User made admin successfully',
        data: result
    })
})


const removeAdminController = catchAsync(async (req, res)=>{
    const id = req.params.id
    const result = await AdminService.removeAdminService(id)

    console.log(result)

    sendResponse(res,{
        statusCode: httpStatusCode.OK,
        success: true,
        message: 'User made admin successfully',
        data: result
    })
})


const getAdminController = catchAsync(async (req, res)=>{
    const result = await AdminService.getAdminsService()

    sendResponse(res,{
        statusCode: httpStatusCode.OK,
        success: true,
        message: 'Admin retrieved successfully',
        data: result
    })
})




export const AdminController = {
    makeAdminController,
    removeAdminController,
    getAdminController
}