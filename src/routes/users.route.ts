import expressPromise from 'express-promise-router';

import { userController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = expressPromise();

router.route('/').post(authMiddleware.adminAuth, userController.registerUser);

export const userRoutes = router;
