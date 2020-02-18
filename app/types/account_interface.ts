export interface LoginParams {
  userName: string;
  passWord: string;
}

export interface RegisterParams extends LoginParams {
  phoneNumber: number;
  rePassWord: string;
  verifyCode: string
}

export interface UserInfo {
  badge: number;
  img: string;
  name: string | null;
  password: string;
  signature: string | null;
  userId: string;
  userName: string;
  website: string | null;
  addTime: string;
  lastTime: string;
}

export interface AllUserInfo extends UserInfo {
  postNum: number;
  fansNum: number;
  focusNum: number;
}
