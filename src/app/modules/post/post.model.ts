import mongoose, { Schema } from 'mongoose';
import { IPost } from './post.interface';

// Define TypeScript interface

// Define Mongoose schema
const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }]
},{
    timestamps: true
});

// Create and export the model
const PostModel = mongoose.model<IPost>('Post', postSchema);

export default PostModel;
