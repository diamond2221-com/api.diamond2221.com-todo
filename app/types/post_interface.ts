export interface IBasePost {
    postId: number;
    userId: string;
    content: string;
    addTime: string;
}
export interface PostAllInfo extends IBasePost {
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
    userImg: string;
    userId: string;
    addTime: string;
}
