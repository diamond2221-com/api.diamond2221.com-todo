export interface LoginParams {
  userName: string;
  passWord: string;
}

export interface RegisterParams extends LoginParams {
  rePassWord: string;
}


export interface UserInfo {
  addTime: string;
  badge: number;
  img: string;
  name: string | null;
  password: string;
  signature: string | null;
  userId: string;
  userName: string;
  website: string | null;
  lastTime: string;
}
