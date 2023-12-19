import { DataSource } from "typeorm";
import * as redis from "redis";
import { User } from "./entities/user.entity";
import { UserInformation } from "./entities/user_information.entity";
import { Loan } from "./entities/loan.entity";
import { Accounts } from "./entities/account.entity";
import { UserLoan } from "./entities/user_loan.entity";
import { configData } from "../config";

class Database {
  readonly mysql;
  readonly redis;

  constructor() {
    this.mysql = new DataSource({
      type: "mysql",
      host: configData.db.host,
      database: configData.db.database,
      username: configData.db.user,
      password: configData.db.pw,
      port: parseInt(configData.db.port),
      synchronize: configData.server.env === "production",
      logging: false,
      entities: [User, UserLoan, UserInformation, Loan, Accounts],
    });

    this.redis = redis.createClient({
      url: configData.redis.url,
    });
  }

  init() {
    this.mysql
      .initialize()
      .catch((e) => {
        console.log(`occured Error about ${e}`);
      })
      .then(() => {
        console.log("MySQL has been connected..");
      });

    this.redis
      .connect()
      .catch((e) => {
        console.error(`occured Error about ${e}`);
      })
      .then(() => {
        console.log("Redis has been connected..");
      });
  }
}

export const dataManager = new Database();
