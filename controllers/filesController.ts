import * as fs from 'fs';
import ApiError from '../exceptions/apiError';
import userService from '../service/userService';

class FilesController {
  async updateFile(req: any, res: any, next: any) {
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
      const file = req.files.file;
      file.mv(`storage/images/'${file.name}`);
      return res.json(`storage/images/'${file.name}`);
    } catch (e) {
      next(e);
    }
  }
  async deleteFile(req: any, res: any, next: any) {
    try {
      const file_name = req.query.file_name;
      fs.unlinkSync(`storage/images/${file_name}`);
      return res.json(`success`);
    } catch (e) {
      next(e);
    }
  }
}

export default new FilesController();
