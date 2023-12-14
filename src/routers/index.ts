import { Router } from "express";
import { TypeRouter } from "./types/Router.type";
import { router as userRouter } from "./user.router";
import { router as accountRouter } from "./account.router";
import { router as loanRouter } from "./loan.router";

export const router = Router();

const routers: TypeRouter[] = [
  {
    path: "/accounts",
    router: accountRouter,
  },
  {
    path: "/loans",
    router: loanRouter,
  },
  {
    path: "/users",
    router: userRouter,
  },
];

routers.forEach((r) => {
  router.use(r.path, r.router);
});
