import catchAsync from "../../utils/catchAsync.";
import sendResponse from "../../utils/sendResponse";
import { AdminService } from "./admin.service";
import httpStatusCode from 'http-status';

const makeAdminController = catchAsync(async (req, res)=>{
    const id = req.params.id
    const result = await AdminService.makeAdminService(id)

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

    sendResponse(res,{
        statusCode: httpStatusCode.OK,
        success: true,
        message: 'User made admin successfully',
        data: result
    })
})




export const AdminController = {
    makeAdminController,
    removeAdminController
}