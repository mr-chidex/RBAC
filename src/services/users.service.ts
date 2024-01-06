import { IUser } from '../models';
import { authService } from './auth.service';

export class UserService {
  async addUser(user: IUser, admin: IUser) {
    const response = await authService.register(user, admin);
    return response;
  }
}

export const userService = new UserService();
