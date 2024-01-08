import { Request, Response } from 'express';
import { blogService } from '../services';

class BlogController {
  //@Post
  async addBlog(req: Request | any, res: Response) {
    const user = req.user;
    const response = await blogService.create(req.body, user);
    res.status(201).json({ ...response });
  }

  //@GET
  async getAllBlog(req: Request, res: Response) {
    const response = await blogService.getAll(req.query);
    res.status(200).json({ ...response });
  }

  //@GET
  async getBlog(req: Request, res: Response) {
    const response = await blogService.getBlog(req.params?.id);
    res.status(200).json({ ...response });
  }

  //@Patch
  async updateBlog(req: Request, res: Response) {
    const response = await blogService.update(req.body, req.params?.id);
    res.status(200).json({ ...response });
  }

  //@Delete
  async deleteBlog(req: Request, res: Response) {
    const response = await blogService.delete(req.params?.id);
    res.status(200).json({ ...response });
  }
}

export const blogController = new BlogController();
