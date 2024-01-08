import mongoose from 'mongoose';

import { Blog, IBlog } from '../models';
import { blogService } from '../services';
import { mockBlog, mockUser } from './mocks';

describe('BlogService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('validateBlogParams', () => {
    it('should throw error on invalid blog details', () => {
      const blog = { title: '', excerpt: '', content: '' } as IBlog;

      expect(blogService.validateParams.bind(this, blog)).toThrow();
    });

    it('should return undefined on successfully validating blog details', () => {
      const response = blogService.validateParams(mockBlog);

      expect(response).toBeUndefined();
    });
  });

  describe('create blog', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should add new blog', async () => {
      blogService.validateParams = jest.fn().mockReturnValue(null);

      Blog.create = jest.fn().mockResolvedValue(mockBlog);

      expect(Blog.create).not.toHaveBeenCalled();

      const authUser = mockUser;
      const response = await blogService.create(mockBlog, authUser);

      expect(response.data).toEqual(mockBlog);
      expect(Blog.create).toHaveBeenCalled();
    });
  });

  describe('getBlogById', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error on invalid blog id', () => {
      mongoose.isValidObjectId = jest.fn().mockReturnValue(false);

      expect(blogService.getBlogById('id')).rejects.toThrow();
    });

    it('should throw blog not found error if blog does not exist', () => {
      mongoose.isValidObjectId = jest.fn().mockReturnValue(true);

      Blog.findById = jest.fn().mockReturnValue({ populate: jest.fn() });

      expect(blogService.getBlogById.bind(this, 'id')).rejects.toThrow('Blog does not exist');
      expect(Blog.findById).toHaveBeenCalled();
    });

    it('should return blog with id', async () => {
      mongoose.isValidObjectId = jest.fn().mockReturnValue(true);

      Blog.findById = jest.fn().mockReturnValue({ populate: jest.fn().mockResolvedValue(mockBlog) });

      const response = await blogService.getBlogById('id');

      expect(response).toEqual(mockBlog);
    });
  });

  describe('getBlog', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return blog', async () => {
      blogService.getBlogById = jest.fn().mockResolvedValue(mockBlog);

      expect(blogService.getBlogById).not.toHaveBeenCalled();

      const response = await blogService.getBlog('id');

      expect(response.success).toBe(true);
      expect(response.data).toEqual(mockBlog);
      expect(blogService.getBlogById).toHaveBeenCalledWith('id');
    });
  });

  describe('get all blog', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should return all blog', async () => {
      Blog.countDocuments = jest.fn().mockResolvedValue(1);

      const populate = jest.fn().mockResolvedValue([mockBlog]);
      const limit = jest.fn().mockReturnValue({ populate });
      const skip = jest.fn().mockReturnValue({ limit });
      const sort = jest.fn().mockReturnValue({ skip });

      Blog.find = jest.fn().mockReturnValue({ sort });

      expect(Blog.find).not.toHaveBeenCalled();

      const response = await blogService.getAll();

      expect(response.data.total).toBe(1);
      expect(response.data.blogs).toEqual([mockBlog]);
      expect(Blog.find).toHaveBeenCalled();
    });
  });

  describe('update blog', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('it should update blog', async () => {
      const blog = {
        title: 'Tester',
        excerpt: 'testing',
        content: 'test',
      } as IBlog;

      const save = jest.fn();

      blogService.validateParams = jest.fn().mockReturnValue(null);
      blogService.getBlogById = jest.fn().mockResolvedValue({ ...blog, save });

      expect(save).not.toHaveBeenCalled();

      const response = await blogService.update(blog, 'blogId');

      expect(response.success).toBe(true);
      expect(save).toHaveBeenCalled();
    });
  });

  describe('delete blog', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should throw error on invalid blog id', () => {
      mongoose.isValidObjectId = jest.fn().mockReturnValue(false);

      expect(blogService.delete('id')).rejects.toThrow();
    });

    it('should throw blog not found error if blog does not exist', () => {
      mongoose.isValidObjectId = jest.fn().mockReturnValue(true);

      Blog.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      expect(blogService.delete.bind(this, 'id')).rejects.toThrow('Blog does not exist');
      expect(Blog.findByIdAndDelete).toHaveBeenCalled();
    });

    it('should delete blog', async () => {
      const blog = {
        title: 'Tester',
        excerpt: 'testing',
        content: 'test',
      } as IBlog;

      mongoose.isValidObjectId = jest.fn().mockReturnValue(true);
      Blog.findByIdAndDelete = jest.fn().mockResolvedValue(blog);

      expect(Blog.findByIdAndDelete).not.toHaveBeenCalled();

      const response = await blogService.delete('id');

      expect(response.success).toBe(true);
      expect(response.data).toBe(blog);
    });
  });
});
