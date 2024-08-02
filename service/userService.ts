import * as uuid from 'uuid';
import User from '../models/User';
import * as bcrypt from 'bcryptjs';
import UserDto from '../dtos/userDto';
import mailService from './mailService';
import tokenService from './tokenService';
import ApiError from '../exceptions/apiError';

class UserService {
  async registration(email: string, password: string) {
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
  async resendLink(email: string) {
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

  async activate(activationLink: string) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email: string, password: string) {
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
  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData: any = await tokenService.validateRefreshToken(refreshToken);
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
  async getUser(id: string) {
    const user = await User.findById(id);
    if (!user || !id) {
      throw ApiError.UnauthorizedError();
    }
    const userDto = new UserDto(user);
    return { ...userDto };
  }
  async getUserFromCookies(cookies: any) {
    const { refreshToken } = cookies;
    const tokenData: any = await tokenService.findToken(refreshToken);
    if (!tokenData) {
      return ApiError.UnauthorizedError();
      // return next(ApiError.UnauthorizedError());
    }
    const user = await this.getUser(tokenData.user);
    return user;
  }
}

export default new UserService();
