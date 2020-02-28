export interface LoginParams {
  userName: string;
  passWord: string;
}

export interface RegisterParams extends LoginParams {
  phoneNumber: number;
  rePassWord: string;
  verifyCode: string
}
