import catchAsync from "../../utils/catchAsync.";
import sendResponse from "../../utils/sendResponse";
import { ModeratorService } from "./moderator.service";
import httpStatusCode from 'http-status';

const makeModeratorController = catchAsync(async (req, res)=>{
    const id = req.params.id
    const result = await ModeratorService.makeModeratorService(id)

    sendResponse(res,{
        statusCode: httpStatusCode.OK,
        success: true,
        message: 'User made moderator successfully',
        data: result
    })
})


const removeModeratorController = catchAsync(async (req, res)=>{
    const id = req.params.id
    const result = await ModeratorService.removeModeratorService(id)

    sendResponse(res,{
        statusCode: httpStatusCode.OK,
        success: true,
        message: 'User made moderator successfully',
        data: result
    })
})



const getModeratorController = catchAsync(async (req, res)=>{
    const result = await ModeratorService.getModeratorService()

    sendResponse(res,{
        statusCode: httpStatusCode.OK,
        success: true,
        message: 'Admin retrieved successfully',
        data: result
    })
})



export const ModeratorController = {
    makeModeratorController,
    removeModeratorController,
    getModeratorController,
}