import { dataManager } from "../DB";
import { User } from "../DB/entities/user.entity";
import { UserInformation } from "../DB/entities/user_information.entity";
import { ErrorHandler } from "../error/error.handle";
import Auth from "../middleware/auth";
import { CreateUserDTO } from "./dto/create.user.dto";
import { CreateUserInfoDTO } from "./dto/create.userInfo.dto";
import { LoginDTO } from "./dto/login.dto";

type ReponseUser = {
  status?: number;
  data?: User | User[];
  message?: string;
  accessToken?: string;
  refreshToken?: string;
};

export class UserService {
  private readonly userRepository = dataManager.mysql.getRepository(User);
  private readonly userInfoRepository =
    dataManager.mysql.getRepository(UserInformation);

  async findUserById(userId: string): Promise<ReponseUser | undefined> {
    const id = parseInt(userId);
    try {
      if (!id)
        throw new ErrorHandler({
          message: "Please input numeric String.",
          statusCode: "BAD_REQUEST",
        });

      const user = await this.userRepository.findOne({
        where: { id },
        relations: { userInfo: true },
      });

      if (!user)
        throw new ErrorHandler({
          message: `There is no User by ${id}`,
          statusCode: "NOT_FOUND",
        });

      return { status: 200, data: user };
    } catch (e) {
      if (e instanceof ErrorHandler) {
        return { status: e.status, message: e.message };
      } else {
        console.error("Occured Unknown Error!");
      }
    }
  }

  async findAllUsers(): Promise<ReponseUser> {
    const users = await this.userRepository.find();

    return { status: 200, data: users };
  }

  async createUser(
    userDto: CreateUserDTO,
    userInfoDto: CreateUserInfoDTO
  ): Promise<ReponseUser | undefined> {
    try {
      const chkOverlap = await this.userInfoRepository.findOne({
        where: { id_number: userInfoDto.getDTO().id_number },
      });

      if (chkOverlap)
        throw new ErrorHandler({
          statusCode: "BAD_REQUEST",
          message:
            "Exist your data. if you lost ID/PW, should check to find it.",
        });

      const user = this.userRepository.create(userDto.getDTO());
      const userInfo = this.userInfoRepository.create(userInfoDto.getDTO());

      user.userInfo = userInfo;

      const created = await this.userRepository.save(user);

      return { status: 200, data: created };
    } catch (e) {
      if (e instanceof ErrorHandler) {
        return { status: e.status, message: e.message };
      } else {
        console.error("Occured Unknown Error!");
      }
    }
  }

  async updateUser(): Promise<ReponseUser | undefined> {
    return;
  }

  async deleteUser(): Promise<ReponseUser | undefined> {
    return;
  }

  async login(loginDto: LoginDTO): Promise<ReponseUser | undefined> {
    const { loginId, password } = loginDto.getDTO();

    const user = await this.userRepository.findOne({
      where: { loginId, password },
    });

    if (!user)
      throw new ErrorHandler({
        statusCode: "UNAUTHORIZED",
        message: "Please check your ID/PW.",
      });

    const { accessToken, refreshToken } = Auth.createTokens(user.id);
    const key = `user:${user.id}`;

    await dataManager.redis.hSet(key, "refreshToken", refreshToken);
    await dataManager.redis.expire(key, 43200);

    return { status: 200, accessToken, refreshToken };
  }

  async logout(body: any): Promise<ReponseUser | undefined> {
    await dataManager.redis.hDel(`user:${body.data.id}`, "refreshToken");
    return;
  }
}

export const userService: UserService = new UserService();
