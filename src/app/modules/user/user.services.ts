import  httpStatus  from 'http-status';
import AppError from "../../../errors/AppError";
import { IUser } from "./user.interface";
import UserModel from "./user.model";

/**
 * Creates a new user in the database.
 * @param {IUser} payload - The payload to create the user with.
 * @returns {Promise<IUser>} - A promise that resolves to the newly created user object.
 * @throws {AppError} - If there is an error creating the user, an error with a BAD_REQUEST status is thrown.
 */
const createUserService = (payload: IUser) => {
    try{
    const result = UserModel.create(payload);
    return result;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(err) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Error creating user');
    }
}

/**
 * Retrieves all users from the database.
 * @returns {Promise<IUser[]>} - A promise that resolves to an array of user objects.
 * @throws {AppError} - If there is an error retrieving users, an error with a BAD_REQUEST status is thrown.
 */

const getUserService = () => {

    try{
        const result = UserModel.find();
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(err) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Error getting users');
    }
}

/**
 * Gets a user by email
 * @param {string} email - The email address of the user to get
 * @returns {Promise<IUser>} - The user object
 * @throws {AppError} - If there is an error getting the user
 */
const getUserByEmail = (email: string) => {

    try{
        const result = UserModel.findOne({email});
        return result;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(err) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Error getting user');
    }
}


export const UserServices = {
    createUserService,
    getUserService,
    getUserByEmail
}