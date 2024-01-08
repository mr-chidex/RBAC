import mongoose from 'mongoose';
import { errorResponse } from '../handlers';
import { Blog, IBlog, IUser } from '../models';
import { validateBlogParams } from '../validators';

export class BlogService {
  validateParams(body: IBlog) {
    const { error } = validateBlogParams(body);
    if (error) {
      return errorResponse(error.details[0].message, 400);
    }
  }

  async create(body: IBlog, user: IUser) {
    this.validateParams(body);

    const { title, excerpt, content } = body;

    const blog = await Blog.create({
      title,
      excerpt,
      content,
      author: user._id,
    });

    return {
      success: true,
      message: 'Blog successfully added',
      data: blog,
    };
  }

  async getBlogById(blogId: string) {
    if (!mongoose.isValidObjectId(blogId)) {
      return errorResponse('invalid blog id', 400);
    }

    const blog = await Blog.findById(blogId).populate({
      path: 'author',
      select: 'name email',
    });

    if (!blog) {
      return errorResponse('Blog does not exist', 404);
    }

    return blog;
  }

  async getBlog(blogId: string) {
    const blog = await this.getBlogById(blogId);

    return {
      success: true,
      message: 'Success',
      data: blog,
    };
  }

  async getAll(query?: any) {
    const total = await Blog.countDocuments();
    const page = parseInt(query?.page) || 1;
    const limit = parseInt(query?.offset) || 10;
    const start = (page - 1) * limit;

    const blogs = await Blog.find().sort({ _id: -1 }).skip(start).limit(limit).populate({
      path: 'author',
      select: 'name email',
    });

    return {
      success: true,
      message: 'Success',
      data: { total, blogs },
    };
  }

  async update(body: IBlog, blogId: string) {
    this.validateParams(body);

    const { title, content, excerpt } = body;

    const blog = await this.getBlogById(blogId);

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.excerpt = excerpt || blog.excerpt;

    await blog.save();

    return {
      success: true,
      message: 'Blog successfully updated',
      date: blog,
    };
  }

  async delete(blogId: string) {
    if (!mongoose.isValidObjectId(blogId)) {
      return errorResponse('invalid blog id', 400);
    }

    const blog = await Blog.findByIdAndDelete(blogId);

    if (!blog) {
      return errorResponse('Blog does not exist', 404);
    }

    return {
      success: true,
      message: 'Blog successfully deleted',
      data: blog,
    };
  }
}

export const blogService = new BlogService();
