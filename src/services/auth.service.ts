import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

import config from '../config';
import { ILogin, IUser, User, UserRole } from '../models';
import { validateLoginParams, validateRegisterParams } from '../validators';
import { errorResponse } from '../handlers';

export class AuthService {
  async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(12);
    return await bcrypt.hash(password, salt);
  }

  validateRegisterationParams(body: IUser) {
    const { error } = validateRegisterParams(body);
    if (error) {
      return errorResponse(error.details[0].message, 400);
    }
  }

  async validateRegisterationEmail(email: string) {
    const isEmail = await this.findUserByEmail(email);
    if (isEmail) {
      return errorResponse('Email already in use', 400);
    }
  }

  async register(body: IUser, admin?: IUser) {
    //check for errors in body data
    this.validateRegisterationParams(body);

    const { name, email, password } = body;

    // check if email is already in use
    await this.validateRegisterationEmail(email);

    // hash password
    const hashPassword = await this.hashPassword(password);

    await User.create({
      name,
      email,
      password: hashPassword,
      role: admin ? UserRole.USER : UserRole.ADMIN,
      addedBy: admin && admin._id,
    });

    return {
      success: true,
      message: 'Account successfully created',
    };
  }

  async validateCredentials(email: string, password: string) {
    //check if email is correct
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse('Email or Password is incorrect', 400);
    }

    //check if password is correct
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return errorResponse('Email or Password is incorrect', 400);
    }

    return user;
  }

  getToken(user: IUser) {
    return JWT.sign(
      {
        iat: Date.now(),
        iss: 'RBAC',
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      config.SECRET_KEY,
      { expiresIn: '24h' },
    );
  }

  async login(body: ILogin) {
    const { error } = validateLoginParams(body);
    if (error) {
      return errorResponse(error.details[0].message, 400);
    }

    const { email, password } = body;

    const user = await this.validateCredentials(email, password);

    const token = this.getToken(user);

    return {
      success: true,
      message: 'Login successful',
      data: token,
    };
  }
}

export const authService = new AuthService();
