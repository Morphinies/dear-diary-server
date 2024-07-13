const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const UserDto = require('../dtos/userDto');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const ApiError = require('../exceptions/apiError');

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтой ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await User.create({
      email,
      activationLink,
      password: hashPassword,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async resendLink(email) {
    const candidate = await User.findOne({ email });
    if (!candidate) {
      throw ApiError.BadRequest(`Пользователя с почтой ${email} не существует`);
    }
    const activationLink = uuid.v4();
    await User.updateOne(
      {
        email,
      },
      { activationLink }
    );

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`
    );

    const userDto = new UserDto(candidate);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с почтой ${email} не найден`);
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async getAllUsers() {
    const users = await User.find();
    return users;
  }
  async getUser(id) {
    const user = await User.findById(id);
    if (!user || !id) {
      throw ApiError.UnauthorizedError();
    }
    const userDto = new UserDto(user);
    return { ...userDto };
  }
  async getUserFromCookies(cookies) {
    const { refreshToken } = cookies;
    const tokenData = await tokenService.findToken(refreshToken);
    if (!tokenData) {
      return next(ApiError.UnauthorizedError());
    }
    const user = await this.getUser(tokenData.user);
    return user;
  }
}

module.exports = new UserService();
