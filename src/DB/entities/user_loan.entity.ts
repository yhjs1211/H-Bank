import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Loan } from "./loan.entity";

@Entity({
  name: "User_Loan",
})
export class UserLoan {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  loanId!: number;

  @Column({
    type: "float",
  })
  finalRate!: number;

  @Column()
  payment!: number;

  @Column({
    type: "text",
  })
  paymentSchedule!: string;

  @CreateDateColumn()
  loanStartedAt!: Date;

  @ManyToOne(() => User, (user) => user.userLoans)
  user!: User;

  @ManyToOne(() => Loan, (loan) => loan.loanUsers)
  loan!: Loan;
}
