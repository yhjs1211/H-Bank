import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Accounts {
  @PrimaryColumn({
    type: "varchar",
    length: 13,
  })
  id!: string;

  @Column({
    default: 0,
  })
  cash!: number;

  @Column({
    type: "varchar",
    length: 20,
  })
  password!: string;

  @Column({
    type: "boolean",
    default: false,
  })
  foreign_account!: boolean;

  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
  })
  money_nationality!: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
