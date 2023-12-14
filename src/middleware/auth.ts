import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default class Auth {
  private readonly jwt = jwt;

  static verifyToken(req: Request, res: Response, next: NextFunction): void {}

  static createToken(req: Request) {}

  static decodeToken(req: Request) {}

  static getTokenFromRequest(req: Request) {}
}
