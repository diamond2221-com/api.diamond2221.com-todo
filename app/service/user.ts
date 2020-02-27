import { Service } from "egg";
import { UserInfo } from '../types/account_interface';
import { IUser, IFans } from "../types/user_interface";

export default class UserService extends Service {
    /**
     * 通过用户Id 来获取用户的 信息
     * @param userId
     */
    public async getUserInfoByUserId(userId: string): Promise<UserInfo> {
        const user = await this.app.model.User.getUserInfoByUserId(userId);
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
            addTime: user ? user.add_time : '',
            phoneNumber: user ? user.phone_number : ''
        }
    }

    /**
     * 通过用户username 来获取用户的 信息
     * @param userName
     */
    public async getUserInfoByUsername(userName: string): Promise<UserInfo | null> {
        const user = await this.app.model.User.getUserInfoByUserName(userName);
        if (user) {

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
                addTime: user ? user.add_time : '',
                phoneNumber: user ? user.phone_number : ''
            }
        } else {
            return null
        }
    }

    /**
     * 通过用户Id 来修改用户信息
     * @param userId
     * @param newUserInfo
     */
    public async changeUserInfoByUserId(userId: string, newUserInfo) {
        await this.app.model.User.updateUserInfo(newUserInfo, userId)
        return newUserInfo;
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
    public async focusUserByUserId(userId: string, focusUserId: string): Promise<number> {
        const res = await this.app.model.Focus.findOne({
            where: {
                user_id: userId,
                focus_user_id: focusUserId
            }
        })
        if (res) {
            return 1;
        } else {
            try {
                await this.app.model.Focus.create({
                    user_id: userId,
                    focus_user_id: focusUserId,
                    add_time: Date.now()
                })
            } catch (error) {
                return 2;
            }
            return 0
        }
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
     * @description 通过userID 查询 focusUserId 是否已关注 userId 用户
     * @author ZhangYu
     * @date 2019-12-01
     * @param {string} userId
     * @param {string} focusUserId
     * @memberof UserService
     */
    public async floowedByUserId(userId: string, focusUserId: string): Promise<boolean> {

        const res = await this.app.model.Focus.count({ where: { user_id: userId, focus_user_id: focusUserId } })
        return Boolean(res);
    }

    /**
     * @description 根据用户昵称 搜索用户
     * @author ZhangYu
     * @date 2020-01-17
     * @param {string} userName
     * @returns
     * @memberof UserService
     */
    public async searchUser(userName: string): Promise<IUser[]> {
        const { User, Focus } = this.app.model;

        // User.hasMany(Focus)
        // let res = await User.findAll({
        //     where: {
        //         user_name: {
        //             [Sequelize..like]: `%${userName}%`
        //         }
        //     },
        //     include: [{
        //         model: Focus,
        //         as: "f",
        //         attributes: ["f.focus_user_id"]
        //     }]
        // })

        `SELECT
            al1.user_Id as userId,
            al1.user_name as userName,
            al1.img img,
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


        let users = await User.findAllUsersOrLikeUserName(userName);
        let result: IUser[] = [];
        for (let i = 0; i < users.length; i++) {
            let user = users[i];
            let fansNum = await Focus.count({ where: { user_id: user.user_id } })
            let focusNum = await Focus.count({ where: { focus_user_id: user.user_id } })
            // ...user,
            result.push({
                userId: user.user_id,
                userName: user.user_name,
                img: user.img,
                name: user.name,
                signature: user.signature,
                website: user.website,
                badge: user.badge,
                fansNum,
                focusNum
            })
        }

        return result
    }


    /**
     * @description 验证当前用户名  是否已被其他用户使用
     * @author ZhangYu
     * @date 2020-02-06
     * @param {string} user_id
     * @param {string} user_name
     * @memberof UserService
     */
    public async verifyRepeatUserName(user_id: string, user_name: string): Promise<boolean> {
        const { User } = this.app.model;
        const res = await User.findUserOrNotEqUserIdAndUserName(user_id, user_name);
        return Boolean(res);
    }

    /**
     * @description 验证当前手机号  是否已被其他用户使用
     * @author ZhangYu
     * @date 2020-02-19
     * @param {string} user_id
     * @param {string} user_phone
     * @memberof UserService
     */
    public async verifyRepeatPhoneNumber(user_id: string, phone_number: string) {
        const { User } = this.app.model;
        const res = await User.findUserOrNotEqUserIdAndPhoneNumber(user_id, phone_number);
        return Boolean(res);
    }
}


