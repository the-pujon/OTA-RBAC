import mongoose, { Schema } from 'mongoose';
import { IPost } from './post.interface';

// Define TypeScript interface

// Define Mongoose schema
const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create and export the model
const PostModel = mongoose.model<IPost>('Post', postSchema);

export default PostModel;
