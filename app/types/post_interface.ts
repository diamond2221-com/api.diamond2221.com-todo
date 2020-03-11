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
    comments: IPostCommentRes;
    likeNum: number;
    liked: boolean;
    marked: boolean;
    focused: boolean;
}
export interface IPostComment extends BaseComment {
    userName: string;
    userImg: string;
}


export interface BaseComment {
    id: number;
    content: string;
    rId: number;
    addTime: string;
    postId: number;
    userId: string;
}

export interface IPostComments extends IPostComment {
    edges: {
        count: number;
        edges: IPostComment[]
    };
}

export interface IPostCommentRes {
    edges: IPostComments[];
    count: number;
}
