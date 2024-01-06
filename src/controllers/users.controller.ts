import { Request, Response } from 'express';
import { userService } from '../services/users.service';

class UserController {
  //@Post
  async registerUser(req: Request | any, res: Response) {
    const response = await userService.addUser(req.body, req.user!);
    res.status(201).json({ ...response });
  }
}

export const userController = new UserController();
