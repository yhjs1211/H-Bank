import { CreateUserInfoData } from "./types/createUserInfo";

export class CreateUserInfoDTO {
  private nameEnglish: string;
  private mobile: string;
  private address: string;
  private idNumber: string;
  private email: string;
  private nationality: string;
  private userId?: number;
  constructor(data: CreateUserInfoData) {
    this.nameEnglish = data.nameEnglish;
    this.mobile = data.mobile;
    this.address = data.address;
    this.idNumber = data.idNumber;
    this.email = data.email;
    this.nationality = data.nationality;
  }
  setUserId(id: number) {
    this.userId = id;
  }

  getDTO() {
    return {
      name_english: this.nameEnglish,
      mobile: this.mobile,
      address: this.address,
      id_number: this.idNumber,
      email: this.email,
      nationality: this.nationality,
      userId: this.userId,
    };
  }
}
