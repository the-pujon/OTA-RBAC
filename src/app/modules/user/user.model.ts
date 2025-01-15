import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from "bcrypt";
import configs from '../../configs';


// Mongoose Schema definition
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: false, default: 'user', enum: ['user', 'admin'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  address: { type: String, required: true }
});


// Middleware for hashing password before saving data
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(
      this.password,
      Number(configs.bcrypt_salt_rounds),
    );
  
    next();
  });
  

  // deleting password before sending response
userSchema.post("save", function (doc, next) {
    doc.set("password", undefined, { strict: false });
    next();
  });

//Static method to check if user exist with given email
  userSchema.statics.isUserExist = async function (email: string) {
    return await UserModel.findOne({ email }).select("+password");
  };

  //static method for compare password
userSchema.statics.isPasswordMatch = async function (
    plainPassword: string,
    hashedPassword: string,
  ) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };
  
  


  // Create Mongoose model based on schema
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
