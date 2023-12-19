import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { configData } from "../config";
import { ErrorHandler } from "../error/error.handle";
import { userService } from "../User/user.service";

export default class Auth {
  static readonly jwtManager = jwt;

  static async getTokenFromRequest(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let id: number = 0;
    const accessToken = req.cookies.Authorization;

    const decodedAccess = Auth.verifyToken(accessToken.split(" ")[1], false);

    if (decodedAccess) {
      id = decodedAccess.payload.userId;
    } else {
      const refreshToken = req.cookies.refreshToken;

      const decodedRefresh = Auth.verifyToken(refreshToken.split(" ")[1], true);

      if (decodedRefresh) {
        id = decodedRefresh.payload.userId;

        const newAccessToken = Auth.getAccesstoken(id);

        res.cookie("Authorization", newAccessToken, { httpOnly: true });
      }
    }

    const user = await userService.findUserById(String(id));

    req.body.user = user;

    next();
    return;
  }

  static createTokens(userId: number) {
    const accessToken =
      "Bearer " +
      Auth.jwtManager.sign({ userId }, configData.jwt.accessSecret, {
        expiresIn: configData.jwt.accessExpiresin,
      });

    const refreshToken =
      "Bearer " +
      Auth.jwtManager.sign({ userId }, configData.jwt.refreshSecret, {
        expiresIn: configData.jwt.refreshExpiresin,
      });

    return { success: true, accessToken, refreshToken };
  }

  static getAccesstoken(userId: number): string {
    return (
      "Bearer " +
      Auth.jwtManager.sign({ userId }, configData.jwt.accessSecret, {
        expiresIn: configData.jwt.accessExpiresin,
      })
    );
  }

  static verifyToken(
    token: string,
    needRefresh: boolean
  ): jwt.JwtPayload | undefined {
    let result;
    if (needRefresh) {
      try {
        result = this.jwtManager.verify(token, configData.jwt.refreshSecret, {
          complete: true,
        });
      } catch (e) {
        throw new ErrorHandler({
          statusCode: "UNAUTHORIZED",
          message: "Token expired already.. Please login again.",
        });
      }
    } else {
      try {
        result = this.jwtManager.verify(token, configData.jwt.accessSecret, {
          complete: true,
        });
      } catch (e) {
        return undefined;
      }
    }

    return result;
  }
}
