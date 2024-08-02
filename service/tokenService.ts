import * as jwt from 'jsonwebtoken';
import tokenModel from '../models/Token';

class TokenService {
  generateToken(payload: any) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET || '', {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET || '',
      {
        expiresIn: '30d',
      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId: any, refreshToken: any) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: any) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken: any) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token: any) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '');
      return tokenData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: any) {
    try {
      const tokenData = jwt.verify(token, process.env.JWT_REFRESH_SECRET || '');
      return tokenData;
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
