import { IPost } from "./post.interface";
import PostModel from "./post.model";

 const createPostService = async (postData: IPost) => {
  const post = PostModel.create(postData);
  return post;
};

 const getAllPostsService = async () => {
  const posts = await PostModel.find().exec();
  return posts;
};

 const getPostByIdService = async (postId: string) => {
  const post = await PostModel.findById(postId).exec();
  return post;
};

 const updatePostService = async (postId: string, postData: IPost) => {
  const post = await PostModel.findByIdAndUpdate(postId, postData, { new: true });
  return post;
};

 const deletePostService = async (postId: string) => {
  await PostModel.findByIdAndDelete(postId).exec();
};


export const PostService = {
    createPostService,
    getAllPostsService,
    getPostByIdService,
    updatePostService,
    deletePostService,
  };