import { CreateUserData } from "./types/createUser";

export class CreateUserDTO {
  private name: string;
  private loginId: string;
  private password: string;
  private admin: boolean;
  private id?: number;
  constructor(data: CreateUserData) {
    this.name = data.name;
    this.loginId = data.loginId;
    this.password = data.password;
    this.admin = data.admin ? data.admin : false;
    if (data.id) this.id = data.id;
  }
  getDTO() {
    return {
      name: this.name,
      loginId: this.loginId,
      password: this.password,
      admin: this.admin,
    };
  }
}
