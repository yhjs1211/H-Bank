import { Request, Response, NextFunction } from "express";
import { UserService, userService } from "./user.service";
import { CreateUserDTO } from "./dto/create.user.dto";
import { CreateUserInfoDTO } from "./dto/create.userInfo.dto";
import { LoginDTO } from "./dto/login.dto";
import { User } from "../DB/entities/user.entity";

export class UserController {
  private readonly userService: UserService = userService;

  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const loginDto = new LoginDTO(req.body);

    const result = await this.userService.login(loginDto);

    if (result?.accessToken && result.refreshToken) {
      res.cookie("Authorization", result.accessToken, { httpOnly: true });
      res.cookie("refreshToken", result.refreshToken, { httpOnly: true });

      res.status(200).json({
        success: true,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    }
  };

  logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    res.clearCookie("Authorization", { httpOnly: true });
    res.clearCookie("refreshToken", { httpOnly: true });

    this.userService.logout(req.body.user);

    res.status(200).json({
      success: true,
      message: "Success to logout",
    });
  };

  getUser = (req: Request, res: Response, next: NextFunction): void => {
    const { loginId, password } = req.body;
    const user: User = req.body.user;

    if (user.loginId === loginId && user.password === password) {
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Check your ID / PW. try again.",
      });
    }
  };

  getUsers = (req: Request, res: Response, next: NextFunction): void => {
    const users = this.userService.findAllUsers();

    res.status(200).json({
      users,
    });
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    const userDto = new CreateUserDTO(req.body);
    const userInfoDto = new CreateUserInfoDTO(req.body);
    const created = await this.userService.createUser(userDto, userInfoDto);

    if (created?.status) {
      if (created?.data) {
        res.status(created.status).json({
          user: created.data,
        });
      } else {
        res.status(created.status).json({
          message: created?.message,
        });
      }
    }
  };

  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};

  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {};
}
