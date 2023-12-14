import { DataSource } from "typeorm";
import redis from "redis";
import dotenv from "dotenv";
import { User } from "./entities/user.entity";
import { UserInformation } from "./entities/user_information.entity";
import { Loan } from "./entities/loan.entity";
import { Accounts } from "./entities/account.entity";
import { UserLoan } from "./entities/user_loan.entity";

dotenv.config();

class Database {
  readonly mysql;
  // private redis;

  constructor() {
    this.mysql = new DataSource({
      type: "mysql",
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
      synchronize: true,
      logging: false,
      entities: [User, UserLoan, UserInformation, Loan, Accounts],
    });
    // this.redis = redis.createClient();
  }

  init() {
    this.mysql
      .initialize()
      .catch((e) => {
        console.log(`occured Error about ${e}`);
      })
      .then(() => {
        console.log("DB has been initialized..");
      });
  }
}

export const dataManager = new Database();
