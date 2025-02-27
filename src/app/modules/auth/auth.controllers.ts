
import  httpStatus  from 'http-status';
import { UserServices } from "./auth.services";
import catchAsync from "../../utils/catchAsync.";
import sendResponse from "../../utils/sendResponse";
// import { cloudinaryUpload } from '../../utils/cloudinaryUpload';
import AppError from '../../errors/AppError';
import configs from '../../configs';

const signupUserController = catchAsync(async(req, res) => {
    // console.log("here")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const img: any = await cloudinaryUpload(req?.file?.filename as string, req?.file?.path as string);
    // req.body.image = img.secure_url;
    // req.body.imageId = img.public_id;

    const result = await UserServices.signupService(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User created successfully',
        data: result
    })
})



const loginUserController = catchAsync(async(req, res) => {
    const result = await UserServices.loginUserService(req.body);

    res.cookie('refreshToken', result.refreshToken, {
        secure: configs.NODE_ENV === 'production',
        httpOnly: true,
      });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: result.user,
        token: result.accessToken
    })
})

const getUserController = catchAsync(async(req, res) => {
    const result = await UserServices.getUserService();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Users fetched successfully',
        data: result
    })
})

const getUserByEmailController = catchAsync(async(req, res) => {
    const result = await UserServices.getUserByEmail(req.params.email);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result
    })
})

const getUserByIdController = catchAsync(async(req, res) => {
    const result = await UserServices.getUserById(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: result
    })
})

const updateUserController = catchAsync(async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed in params
  
    // Call the update service
    const updatedUser = await UserServices.updateUserService(id, req.body, req.file);
  
    if (!updatedUser) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
  
    // Send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  });
  

const deleteUserController = catchAsync(async(req, res) => {
    const result = await UserServices.deleteUserService(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User deleted successfully',
        data: result
    })
})

const refreshTokenController = catchAsync(async(req, res) => {
    const { refreshToken } = req.cookies;
    // console.log(refreshToken)
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Refresh token is required');
    }
    const result = await UserServices.refreshTokenService(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully', 
        data: result
    });
})

export const UserController = {
    signupUserController,
    getUserController,
    getUserByEmailController,
    updateUserController,
    deleteUserController,
    getUserByIdController,
    loginUserController,
    refreshTokenController
}