const Router = require('express').Router;
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const authRouter = new Router();
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

module.exports = authRouter;
