import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class UserInformation {
  @PrimaryColumn()
  userId!: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({
    name: "userId",
    referencedColumnName: "id",
  })
  user!: User;

  @Column()
  name_english!: string;

  @Column()
  mobile!: string;

  @Column()
  address!: string;

  @Column()
  id_number!: string;

  @Column()
  email!: string;

  @Column()
  nationality!: string;
}
