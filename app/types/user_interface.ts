export interface IUser {
    userId: string;
    userName: string;
    img: string;
    name: string;
    signature: string;
    website: string;
    badge: number;
    fansNum: number;
    focusNum: number
}

export interface UserInfo {
    badge: number;
    img: string;
    name: string | null;
    signature: string | null;
    userId: string;
    userName: string;
    website: string | null;
    addTime: string;
    lastTime: string;
}

export interface IAllUser extends UserInfo {
    fansNum: number;
    focusNum: number
    postNum: number;
    focused: boolean;
}

export interface IFans {
    addTime: string;
    img: string;
    name: string | null;
    signature: string | null;
    userId: string;
    userName: string;
    website: string | null;
    followed?: boolean;
}
