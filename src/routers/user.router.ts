import { Router } from "express";
import { UserController } from "../User/user.controller";
import Auth from "../middleware/auth";

export const router = Router();

/*
    API

    GET '/users' 전체 유저 조회
    GET '/users/:userId' 단일 유저 조회
    POST '/users/signup' 회원가입
    POST '/users/login' 로그인
    POST '/users/logout' 로그아웃

*/

// Controller
const userController: UserController = new UserController();

router.route("/").get(userController.getUsers);

router.route("/signup").post(userController.createUser);

router.route("/login").post(userController.loginUser);

router.route("/logout").post(userController.logoutUser);

router
  .route("/:userId")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
