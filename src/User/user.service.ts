import { dataManager } from "../DB";
import { User } from "../DB/entities/user.entity";

export class UserService {
  private readonly userRepository = dataManager.mysql.getRepository(User);

  async findUserById(userId: string): Promise<User | null> {
    const id = parseInt(userId);

    if (!id) throw new Error("Please input numeric String.");

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new Error(`There is no User by ${id}`);

    return user;
  }
}
