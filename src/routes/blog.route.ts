import expressPromise from 'express-promise-router';

import { blogController } from '../controllers';
import { authMiddleware } from '../middlewares';

const router = expressPromise();

//both admin  and user can access
router.route('/').post(authMiddleware.auth, blogController.addBlog).get(authMiddleware.auth, blogController.getAllBlog);

router
  .route('/:id')
  .get(authMiddleware.auth, blogController.getBlog) //both admin  and user can access
  .patch(authMiddleware.adminAuth, blogController.updateBlog) //only admin can access
  .delete(authMiddleware.adminAuth, blogController.deleteBlog); //only admin can access

export const blogRoutes = router;
