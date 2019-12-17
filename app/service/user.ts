import { Service } from "egg";
import { IUser } from "../types/user_interface";
interface IFans {
    addTime: string;
    img: string;
    name: string | null;
    signature: string | null;
    userId: string;
    userName: string;
    website: string | null;
    followed?: boolean;
}


export default class UserService extends Service {
    /**
     * 通过用户Id 来获取用户的 信息
     * @param userId
     */
    public async getUserInfoByUserId(userId: string) {
        return await this.app.mysql.get("tbl_user", { userId });
    }

    /**
     * 通过用户username 来获取用户的 信息
     * @param userName
     */
    public async getUserInfoByUsername(userName: string) {
        return await this.app.mysql.get("tbl_user", { userName });
    }

    /**
     * 通过用户Id 来修改用户信息
     * @param userId
     * @param newUserInfo
     */
    public async changeUserInfoByUserId(userId: string, newUserInfo) {
        await this.app.mysql.update("tbl_user", newUserInfo, { where: { userId } })
        return newUserInfo;
    }

    /**
     * @description 查看是否已收藏该帖子
     * @author ZhangYu
     * @date 2019-09-22
     * @param {number} postId
     * @param {string} userId
     * @returns {Promise<boolean>}
     * @memberof UserService
     */
    public async findMarkPost(postId: number, userId: string): Promise<boolean> {
        let result = await this.app.mysql.get("tbl_mark_post", { postId, userId });
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description 判断是否收藏的是自己的帖子
     * @author ZhangYu
     * @date 2019-09-22
     * @param {number} postId
     * @param {string} userId
     * @returns {Promise<boolean>}
     * @memberof UserService
     */
    public async isSelfPost(postId: number, userId: string): Promise<boolean> {
        let result = await this.app.mysql.get("tbl_post", { postId, userId });
        if (result) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @description 关注帖子 通过帖子Id
     * @author ZhangYu
     * @date 2019-09-03
     * @param {number} postId
     * @param {string} userId
     * @memberof UserService
     */
    public async markPostByPostId(postId: number, userId: string) {
        await this.app.mysql.insert("tbl_mark_post", { postId, userId, addTime: Date.now() });
    }

    /**
     * 通过用户Id 获取 粉丝总数
     * @param userId
     */
    public async getUserFansCountByUserId(
        userId: string
    ) {
        const res = await this.app.mysql.count("tbl_focus", {
            userId
        });
        return res;
    }

    /**
     * 通过用户Id 获取 关注总数
     * @param focusUserId
     */
    public async getUserFocusCountByfocusUserId(
        focusUserId: string
    ) {
        const res = await this.app.mysql.count("tbl_focus", {
            focusUserId
        });
        return res;
    }

    /**
     * @description 通过userID 关注用户
     * @author ZhangYu
     * @date 2019-09-03
     * @param {string} userId 被关注者的userId
     * @param {string} focusUserId 关注者的userId
     * @memberof UserService
     */
    public async focusUserByUserId(userId: string, focusUserId: string) {
        await this.app.mysql.insert("tbl_focus", {
            userId,
            focusUserId,
            addTime: Date.now()
        });
    }

    /**
     * @description 通过userId 取消关注用户
     * @author ZhangYu
     * @date 2019-09-03
     * @param {string} userId
     * @param {string} focusUserId
     * @memberof UserService
     */
    public async cancelFocusUserByUserId(userId: string, focusUserId: string) {
        await this.app.mysql.delete("tbl_focus", { userId, focusUserId });
    }

    /**
     * @description 通过userId 获取关注用户列表（分页加载）
     * @author ZhangYu
     * @date 2019-09-03
     * @param {string} focusUserId
     * @param {number} page
     * @param {number} size
     * @memberof UserService
     */
    public async getFocusListByUserId(focusUserId: string, page: number, size: number): Promise<IFans[]> {
        const { app, service } = this;
        let users = await app.mysql.select("tbl_focus", {
            where: { focusUserId },
            orders: [["addTime", "desc"]],
            limit: size,
            offset: (page - 1) * size
        });

        let result: IFans[] = [];

        for (const user of users) {
            const { addTime, img, name, signature, userId, userName, website } = await service.user.getUserInfoByUserId(user.userId);
            const fan: IFans = { addTime, img, name, signature, userId, userName, website, followed: true }
            result = [...result, fan];
        }
        return result;
    }

    /**
     * @description  通过userId 获取粉丝用户列表（分页加载）
     * @author ZhangYu
     * @date 2019-09-03
     * @param {string} focusUserId
     * @param {number} page
     * @param {number} size
     * @returns
     * @memberof UserService
     */
    public async getFansListByUserId(focusUserId: string, page: number, size: number): Promise<IFans[]> {
        const { app, service } = this;
        let users = await app.mysql.select("tbl_focus", {
            where: { userId: focusUserId },
            orders: [["addTime", "desc"]],
            limit: size,
            offset: (page - 1) * size
        });
        let result: IFans[] = [];
        for (const user of users) {
            const { addTime, img, name, signature, userId, userName, website } = await service.user.getUserInfoByUserId(user.focusUserId);
            const followed: boolean = await service.user.floowedByUserId(userId, focusUserId);
            const fan: IFans = { addTime, img, name, signature, userId, userName, website, followed }
            result = [...result, fan];
        }
        return result;
    }

    /**
     * @description 通过userID 查询 是否我已关注该用户
     * @author ZhangYu
     * @date 2019-12-01
     * @param {string} userId
     * @param {string} otherUserId
     * @memberof UserService
     */
    public async floowedByUserId(userId: string, focusUserId: string): Promise<boolean> {
        const res = await this.app.mysql.get("tbl_focus", { userId, focusUserId})
        return Boolean(res);
    }

    /**
     * searchUser
     */
    public async searchUser(userName: string): Promise<IUser[]> {
        const sql: string = `SELECT
                                al1.userId,
                                al1.userName,
                                al1.img userImg,
                                al1.name,
                                al1.signature,
                                al1.website,
                                al1.badge,
                                al1.fansNum,
                                COUNT(tbl_focus.focusUserId) focusNum
                            FROM tbl_focus RIGHT JOIN
                            (
                                SELECT
                                    u.*,
                                    COUNT(f.userId) fansNum
                                FROM
                                    tbl_focus f
                                RIGHT JOIN tbl_user u ON u.userId = f.userId
                                WHERE
                                    userName LIKE '%${userName}%'
                                GROUP BY
                                    u.userId
                            ) al1 ON tbl_focus.focusUserId = al1.userId
                                GROUP BY
                                    al1.userId
                                ORDER BY
                                    al1.fansNum DESC
                            `;
        const res: IUser[] = await this.app.mysql.query(sql);
        return res;
    }
}
