import * as jwt from 'jsonwebtoken';
import { secret } from '../config';
import { Request, Response } from 'express';

export default function (roles: any) {
  return function (req: Request, res: Response, next: (e?: any) => void) {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = (req.headers as any).authorization.split(' ')[1];
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
