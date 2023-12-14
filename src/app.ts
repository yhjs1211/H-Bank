import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { dataManager } from "./DB";
import { router } from "./routers";
import { Logger } from "./middleware/logger";

class App {
  private app = express();
  private readonly dataManager = dataManager;

  init() {
    this.app.use(
      cors({
        credentials: true,
        origin: ["*"],
      })
    );

    // Middleware
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(Logger);

    this.app.use("/", router);

    this.dataManager.init();

    this.app.listen(process.env.SERVER_PORT, () => {
      console.log(`Server is running on ${process.env.SERVER_PORT}`);
    });
  }
}

const app = new App();

app.init();
