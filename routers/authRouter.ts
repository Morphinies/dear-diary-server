import { Router } from 'express';
const { body } = require('express-validator');
import authMiddleware from '../middleware/authMiddleware';
import userController from '../controllers/userController';

const authRouter = Router();
authRouter.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 32 }),
  userController.registration
);
authRouter.post('/login', userController.login);
authRouter.post('/logout', userController.logout);
authRouter.get('/refresh', userController.refresh);
authRouter.get('/activate/:link', userController.activate);
authRouter.post('/resend_link', userController.resendLink);
authRouter.get('/users', authMiddleware, userController.getUsers);
authRouter.get('/is_auth', authMiddleware, userController.checkAuth);

export default authRouter;
// module.exports = authRouter;
