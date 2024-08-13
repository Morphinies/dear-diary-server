import * as fs from 'fs';
import { Request, Response } from 'express';
import ApiError from '../exceptions/apiError';
import userService from '../service/userService';
import { UploadedFile } from 'express-fileupload';

class FilesController {
  async updateFile(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const user = await userService.getUserFromCookies(req.cookies);
      if (!user) {
        return next(ApiError.UnauthorizedError());
      }
      if (!fs.existsSync('storage')) {
        fs.mkdirSync('storage');
      }
      if (!fs.existsSync(`storage/images`)) {
        fs.mkdirSync(`storage/images`);
      }
      const file = req?.files?.file as UploadedFile | undefined;
      if (!file) throw new Error('File not found');
      file.mv(`storage/images/'${file.name}`);
      return res.json(`storage/images/'${file.name}`);
    } catch (e) {
      next(e as Error);
    }
  }
  async deleteFile(req: Request, res: Response, next: (e: Error) => void) {
    try {
      const file_name = req.query.file_name;
      fs.unlinkSync(`storage/images/${file_name}`);
      return res.json(`success`);
    } catch (e) {
      next(e as Error);
    }
  }
}

export default new FilesController();
