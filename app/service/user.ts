import { Service } from "egg";
export default class UserService extends Service {
    /**
     * 通过用户Id 来获取用户的 信息
     * @param userId
     */
    public getUserInfoByUserId(userId: string) {
        return this.app.mysql.get("ins_user", { userId });
    }

    /**
     * 通过用户username 来获取用户的 信息
     * @param userName
     */
    public getUserInfoByUsername(userName: string) {
        return this.app.mysql.get("ins_user", { userName });
    }

    /**
     * 通过用户Id 来修改用户信息
     * @param userId
     * @param newUserInfo
     */
    public changeUserInfoByUserId(userId: string, newUserInfo) {
        this.app.mysql.update("ins_user", newUserInfo, { where: { userId } })
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
        await this.app.mysql.insert("ins_mark_post", { postId, userId, addTime: Date.now() });
    }

    /**
 * 通过用户Id 获取 粉丝总数
 * @param userId
 */
    public async getUserFansCountByUserId(
        userId: string
    ) {
        const res = await this.app.mysql.count("ins_focus", {
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
        const res = await this.app.mysql.count("ins_focus", {
            focusUserId
        });
        return res;
    }

    /**
     * @description 通过userID 关注用户
     * @author ZhangYu
     * @date 2019-09-03
     * @param {string} userId 关注者的userId
     * @param {string} focusUserId 被关注者的userId
     * @memberof UserService
     */
    public async focusUserByUserId(userId: string, focusUserId: string) {
        await this.app.mysql.insert("ins_focus", {
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
        await this.app.mysql.delete("ins_focus", { userId, focusUserId });
    }

    /**
     * @description 通过userId 获取关注用户列表（分页加载）
     * @author ZhangYu
     * @date 2019-09-03
     * @param {string} userId
     * @param {number} page
     * @param {number} size
     * @memberof UserService
     */
    public async getFocusListByUserId(userId: string, page: number, size: number) {
        const { app, service } = this;
        let users = await app.mysql.select("ins_focus", {
            where: { userId },
            orders: [["addTime", "desc"]],
            limit: size,
            offset: (page - 1) * size
        });
        for (const user of users) {
            users = [...users, await service.user.getFocsUserInfoByserId(user.focusUserId)];
        }
        return users;
    }

    /**
     * @description 通过userId 查询关注用户的信息
     * @author ZhangYu
     * @date 2019-09-03
     * @param {string} userId
     * @memberof UserService
     */
    public async getFocsUserInfoByserId(userId: string) {
        return this.app.mysql.get("ins_user", { where: { userId }, columns: ["userId", "userName", "img", "name"] });
    }

    /**
     * @description  通过userId 获取粉丝用户列表（分页加载）
     * @author ZhangYu
     * @date 2019-09-03
     * @param {string} userId
     * @param {number} page
     * @param {number} size
     * @returns
     * @memberof UserService
     */
    public async getFansListByUserId(userId: string, page: number, size: number) {
        const { app, service } = this;
        let users = await app.mysql.select("ins_focus", {
            where: { focusUserId: userId },
            orders: [["addTime", "desc"]],
            limit: size,
            offset: (page - 1) * size
        });
        for (const user of users) {
            users = [...users, await service.user.getFocsUserInfoByserId(user.focusUserId)];
        }
        return users;
    }

}
