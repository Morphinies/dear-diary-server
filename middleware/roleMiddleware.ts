// const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';
import { secret } from '../config';

export default function (roles: any) {
  return function (req: any, res: any, next: any) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      if (!token) {
        return res.status(403).json({ message: 'Пользователь не авторизован' });
      }
      const { roles: userRoles }: any = jwt.verify(token, secret);
      let hasRole = false;
      userRoles.forEach((role: any) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: 'У вас нет доступа' });
      }
      next();
    } catch (err) {
      console.log(err);
      return res.status(403).json({ message: 'Пользователь не авторизован' });
    }
  };
}
