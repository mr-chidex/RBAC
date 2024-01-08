import { IBlog, IUser } from '../../models';

export const mockUser = { name: 'test', email: 'test@email.com', password: 'test1234' } as IUser;

export const mockBlog = {
  title: 'Test title',
  excerpt: 'test excerpt',
  content: 'test content',
} as IBlog;
