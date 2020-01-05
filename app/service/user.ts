import { Service } from "egg";
import { UserInfo } from '../types/account_interface';
import * as Sequelize from "sequelize"

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
    public async getUserInfoByUserId(userId: string): Promise<UserInfo> {
        const user = await this.app.model.User.findOne({
            where: {
                user_id: userId
            }
        })
        return {
            userName: user ? user.user_name : '',
            name: user ? user.name : '',
            userId: user ? user.user_id : '',
            img: user ? user.img : '',
            website: user ? user.website : '',
            badge: user ? user.badge : 0,
            signature: user ? user.signature : '',
            lastTime: user ? user.last_time : '',
            password: user ? user.pass_word : '',
            addTime: user ? user.add_time : ''
        }
    }

    /**
     * 通过用户username 来获取用户的 信息
     * @param userName
     */
    public async getUserInfoByUsername(userName: string): Promise<UserInfo> {
        const user = await this.app.model.User.findOne({
            where: {
                user_name: userName
            }
        })
        return {
            userName: user ? user.user_name : '',
            name: user ? user.name : '',
            userId: user ? user.user_id : '',
            img: user ? user.img : '',
            website: user ? user.website : '',
            badge: user ? user.badge : 0,
            signature: user ? user.signature : '',
            lastTime: user ? user.last_time : '',
            password: user ? user.pass_word : '',
            addTime: user ? user.add_time : ''
        }
    }

    /**
     * 通过用户Id 来修改用户信息
     * @param userId
     * @param newUserInfo
     */
    public async changeUserInfoByUserId(userId: string, newUserInfo) {
        await this.app.model.User.update(newUserInfo, { where: { user_id: userId } })
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
        let result = await this.app.model.MarkPost.findOne({ where: { post_id: postId, user_id: userId } })
        return Boolean(result)
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
        let result = await this.app.model.Post.findOne({ where: { post_id: postId, user_id: userId } })
        return Boolean(result);
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
        await this.app.model.MarkPost.create({ post_id: postId, user_id: userId, add_time: Date.now() })
    }

    /**
     * 通过用户Id 获取 粉丝总数
     * @param userId
     */
    public async getUserFansCountByUserId(
        userId: string
    ): Promise<number> {
        return await this.app.model.Focus.count({ where: { user_id: userId } })
    }

    /**
     * 通过用户Id 获取 关注总数
     * @param focusUserId
     */
    public async getUserFocusCountByfocusUserId(
        focusUserId: string
    ): Promise<number> {
        return await this.app.model.Focus.count({
            where: {
                focus_user_id: focusUserId
            }
        })
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
        await this.app.model.Focus.create({
            user_id: userId,
            focus_user_id: focusUserId,
            add_time: Date.now()
        })
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
        await this.app.model.Focus.destroy({ where: { user_id: userId, focus_user_id: focusUserId } })
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
        let users = await app.model.Focus.findAll({
            where: { focus_user_id: focusUserId },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })

        let result: IFans[] = [];

        for (const user of users) {
            const { addTime, img, name, signature, userId, userName, website } = await service.user.getUserInfoByUserId(user.user_id);
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

        let users = await app.model.Focus.findAll({
            where: { user_id: focusUserId },
            order: [["add_time", "desc"]],
            limit: size,
            offset: (page - 1) * size
        })
        let result: IFans[] = [];
        for (const user of users) {
            const { addTime, img, name, signature, userId, userName, website } = await service.user.getUserInfoByUserId(user.focus_user_id);
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

        const res = await this.app.model.Focus.findOne({ where: { user_id: userId, focus_user_id: focusUserId } })
        return Boolean(res);
    }

    /**
     * searchUser
     */
    public async searchUser(userName: string) {
        `SELECT
            al1.user_Id as userId,
            al1.user_name as userName,
            al1.img userImg,
            al1.name,
            al1.signature,
            al1.website,
            al1.badge,
            al1.fansNum,
            COUNT(tbl_focus.focus_user_id) focusNum
        FROM tbl_focus RIGHT JOIN
        (
            SELECT
                u.*,
                COUNT(f.user_Id) as fansNum
            FROM
                tbl_focus f
            RIGHT JOIN tbl_user u ON u.user_Id = f.user_Id
            WHERE
                user_name LIKE '%${userName}%'
            GROUP BY
                u.user_Id
        ) al1 ON tbl_focus.focus_user_id = al1.user_Id
            GROUP BY
                al1.user_Id
            ORDER BY
                al1.fansNum DESC
        `;

        const { User, Focus } = this.app.model;
        let users = await User.findAll({
            where: {
                user_name: {
                    [Sequelize.Op.like]: `%${userName}%`
                }
            }
        })
        let result: {
            focusNum: number;
            fansNum: number;
            user_id: string;
            user_name: string;
            pass_word: string;
            img: string;
            name: string;
            signature: string;
            website: string;
            badge: number;
            add_time: string;
            last_time: string;
            id?: any;
        }[] = [];
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let fansNum = await Focus.count({ where: { user_id: user.user_id } })
            let focusNum = await Focus.count({ where: { focus_user_id: user.user_id } })
            result.push({
                ...user,
                fansNum,
                focusNum
            })
        }
        return result.map(item => {
            return {
                focusNum: item.focusNum,
                fansNum: item.fansNum,
                userId: item.user_id,
                userName: item.user_name,
                passWord: item.pass_word,
                img: item.img,
                name: item.name,
                signature: item.signature,
                website: item.website,
                badge: item.badge,
                addTime: item.add_time,
                lastTime: item.last_time,
                id: item.id
            }
        })
    }
}


