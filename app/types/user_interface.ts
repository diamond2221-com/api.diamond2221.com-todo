export interface IUserInfo {
    userName: string;
    name: string;
    userId: string;
    img: string;
    website: string;
    badge: number;
    signature: string;
    lastTime: string;
    password: string;
    addTime: string;
    phoneNumber: string;
}

export interface IFans extends IUser {
    followed?: boolean;
}

export interface IUser {
    badge: number;
    img: string;
    name: string;
    signature: string;
    userId: string;
    userName: string;
    website: string;
}

export interface IOtherUser extends IUser {
    postNum: number;
    fansNum: number;
    focusNum: number;
    focused: boolean;
}

export interface IOwnUser extends IOtherUser {
    phoneNumber: string;
    postNum: number;
    fansNum: number;
    focusNum: number;
    focused: boolean;
}
