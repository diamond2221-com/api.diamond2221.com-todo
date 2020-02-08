export interface BasePost {
    postId: number;
    userId: string;
    content: string;
    addTime: string;
}
export interface PostAllInfo extends BasePost {
    imgs?: string[];
    userName: string;
    img: string;
    comments: IPostComment[];
    likeNum: number;
    liked: boolean;
    marked: boolean;
    focused: boolean;
}
export interface IPostComment {
    content: string
    id: number;
    userName: string;
    useId: string;
    addTime: string;
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

export interface PostComment {
    commentId: number;
    postId: number;
    userId: string;
    content: string;
    addTime: string;
}
