import { Request, Response } from 'express';
import ApiError from '../exceptions/apiError';

export default function (
  err: any,
  req: Request,
  res: Response
  // next: (e?: any) => void
) {
  // console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
}
