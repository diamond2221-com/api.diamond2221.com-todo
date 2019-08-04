export interface LoginParams {
  userName: string;
  passWord: string;
}

export interface RegisterParams extends LoginParams {
  rePassWord: string;
}
