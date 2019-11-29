export interface BasePost {
    postId: number;
    userId: string;
    content: string;
    addTime: string;
}
export interface PostA extends BasePost {
    imgs?: string[];
    userName?: string;
    userImg: string;
    comments: IPostComment[];
    likeNum?: number;
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

export interface PostComments {
    commentId: number;
    postId: number;
    userId: string;
    content: string;
    addTime: string;
}
