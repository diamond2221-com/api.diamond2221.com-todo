import { Service } from "egg";

interface PostComments {
    commentId: number;
    postId: number;
    userId: number;
    content: string;
    addTime: string;
}


export default class PostService extends Service {
    /**
     * 通过用户Id 获取 帖子 (分页)
     * @param userId
     * @param size
     * @param page
     */
    public async getUserPostsByUserId(
        userId: number,
        size: number,
        page: number
    ) {
        const res = await this.app.mysql.select("ins_post", {
            where: {
                userId
            },
            orders: [["addTime", "desc"]],
            limit: size,
            offset: (page - 1) * size
        });
        return res;
    }

    /**
     * 通过帖子Id 获取 单个帖子图片
     * @param postId
     */
    public async getUserPostImgsByPostId(postId: number) {
        const res = await this.app.mysql.select("ins_img", {
            where: {
                postId
            },
            orders: [["addTime", "desc"]]
        });
        return res.map(img => img.src + "?x-oss-process=image/auto-orient,1/interlace,1/quality,q_20/watermark,text_ZGlhbW9uZDIyMjEuY24,color_ffffff,size_10,shadow_100,x_1,y_1");
    }

    /**
     * 通过帖子Id 获取 单个帖子的评论 （分页）
     * @param postId
     * @param size
     * @param page
     */
    public async getUserPostCommentsByPostId(postId: number, size: number = 20, page: number = 1): Promise<PostComments[]> {
        const comments = await this.app.mysql.select("ins_comment", {
            where: {
                postId
            },
            orders: [["addTime", "desc"]],
            limit: size,
            offset: (page - 1) * size

        })
        return comments;
    }

    /**
     * 根据帖子Id 添加评论
     * @param postId
     * @param userId
     * @param content
     */
    public async addComments(postId: number, userId: number, content: string) {
        const comment = {
            postId,
            userId,
            content,
            addTime: Date.now()
        }
        await this.app.mysql.insert("ins_comment", comment);
        return comment;
    }


    /**
     * 用户添加帖子
     * @param content
     * @param imgs
     * @param userId
     */
    public async addPost(content: string, imgs: string[], userId: number) {
        const post = {
            content,
            userId,
            addTime: Date.now()
        }
        const res = await this.app.mysql.insert("ins_post", post);
        const postId: number = res.insertId;
        if (imgs.length) {
            for (const img of imgs) {
                await this.app.mysql.insert("ins_img", {
                    postId,
                    src: img,
                    addTime: Date.now()
                })
            }
        }
        return { ...post, imgs: imgs.map(img => img + "?x-oss-process=image/auto-orient,1/interlace,1/quality,q_20/watermark,text_ZGlhbW9uZDIyMjEuY24,color_ffffff,size_10,shadow_100,x_1,y_1"), postId };
    }



}
