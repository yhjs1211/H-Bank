import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { UserLoan } from "./user_loan.entity";

@Entity()
export class Loan extends BaseEntity {
  @Column({
    type: "varchar",
    length: 30,
  })
  name!: string;

  @Column({
    type: "float",
  })
  main_rate!: number;

  @OneToMany(() => UserLoan, (userLoan) => userLoan.loan)
  loanUsers!: UserLoan[];
}
