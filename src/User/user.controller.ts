import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";

export class UserController {
  private readonly userService: UserService = new UserService();

  getUser = (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params.id;
    const user = this.userService.findUserById(id);
  };
}
