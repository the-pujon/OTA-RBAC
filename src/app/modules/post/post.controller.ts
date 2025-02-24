
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync.';
import sendResponse from '../../utils/sendResponse';
import { PostService } from './post.service';

import  httpStatus  from 'http-status';


 const createPostController = catchAsync(async (req, res) => {
    const post = await PostService.createPostService(req.body);
   sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Post created successfully',
    data: post
   })
  })

 const getAllPostsController = catchAsync(async (req, res) => {
    const posts = await PostService.getAllPostsService();
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Post created successfully',
      data: posts
     })
  })

const  getPostByIdController = catchAsync(async (req, res) => {
    const postId = req.params.id;
    const post = await PostService.getPostByIdService(postId);
    if (!post) {
      throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
    }
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Post created successfully',
      data: post
     })
  })

const  updatePostController = catchAsync(async (req, res) => {
    const postId = req.params.id;
    const post = await PostService.updatePostService(postId, req.body);
    if (!post) {
      throw new Error('Post not found');
    }
    res.status(200).json({ message: 'Post updated successfully', data: post });
  })

 const deletePostController = catchAsync(async (req, res) => {
    const postId = req.params.id;
    await PostService.deletePostService(postId);
    res.status(200).json({ message: 'Post deleted successfully' });
  })

  export const PostController = {
    createPostController,
    getAllPostsController,
    getPostByIdController,
    updatePostController,
    deletePostController,
  }