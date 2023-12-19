export class LoginDTO {
  private loginId: string;
  private password: string;
  constructor(data: { loginId: string; password: string }) {
    this.loginId = data.loginId;
    this.password = data.password;
  }

  getDTO() {
    return { loginId: this.loginId, password: this.password };
  }
}
