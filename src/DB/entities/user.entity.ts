import { Column, Entity, IntegerType, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Accounts } from "./account.entity";
import { UserLoan } from "./user_loan.entity";

@Entity()
export class User extends BaseEntity {
  @Column({
    type: "varchar",
    length: 20,
  })
  name!: string;

  @Column({
    type: "tinyint", // 0 ~ 255
    unsigned: true, // 음수 불허
    default: 0,
    comment: "{0:'Classic', 1:'Silver', 2:'Gold', 3:'Diamond'}",
  })
  grade!: number;

  @OneToMany(() => Accounts, (account) => account.user)
  accounts!: Accounts[];

  @OneToMany(() => UserLoan, (userLoan) => userLoan.user)
  userLoans!: UserLoan[];
}
