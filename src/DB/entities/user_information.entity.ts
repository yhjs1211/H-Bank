import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserInformation {
  @PrimaryColumn()
  userId!: number;

  @OneToOne(() => User, (user) => user.userInfo)
  @JoinColumn({
    name: "userId",
    referencedColumnName: "id",
  })
  user!: User;

  @Column()
  name_english!: string;

  @Column({
    type: "varchar",
    length: "13",
  })
  mobile!: string;

  @Column()
  address!: string;

  @Column({
    type: "varchar",
    length: 14,
    comment: "주민등록번호",
  })
  id_number!: string;

  @Column()
  email!: string;

  @Column()
  nationality!: string;
}
