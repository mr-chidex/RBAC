import { authService, userService } from '../services';
import { mockUser } from './mocks';

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe('adduser by admin', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetAllMocks();
    });

    it('should successfully register a user by admin', async () => {
      authService.register = jest.fn().mockResolvedValue(true);
      const mockAdmin = mockUser;

      const response = await userService.addUser(mockUser, mockAdmin);

      expect(authService.register).toHaveBeenCalled();
      expect(response).toBe(true);
    });
  });
});
