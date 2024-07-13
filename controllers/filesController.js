const fs = require('fs');
const ApiError = require('../exceptions/apiError');
const userService = require('../service/userService');

class FilesController {
  async updateFile(req, res, next) {
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
  async deleteFile(req, res, next) {
    try {
      const file_name = req.query.file_name;
      fs.unlinkSync(`storage/images/${file_name}`);
      return res.json(`success`);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FilesController();
