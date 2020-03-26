import { Service } from "egg";
import { IUser, IFans, IOtherUser, IOwnUser } from "../types/user_interface";
import { getNDay } from "../utils/common";
import { User } from "../model/user"

export default class UserService extends Service {

    public async getUserDetailInfo(user_id: string, type: 'user_id' | 'user_name', myUser_id: string) {
        const { service } = this;
        let userInfo: User | null = null;
        if (type === 'user_id') {
            userInfo = await service.user.getUserInfoByUserId(user_id);
        } else if (type === 'user_name') {
            userInfo = await service.user.getUserInfoByUsername(user_id);
        }
        if (!userInfo) {
            return null
        }
        if (myUser_id && myUser_id !== userInfo.userId) {
            delete userInfo.phoneNumber
        }
        delete userInfo.addTime
        delete userInfo.lastTime
        delete userInfo.passWord
        let result: IOtherUser | IOwnUser = {
            ...userInfo,
            postNum: 0,
            fansNum: 0,
            focusNum: 0,
            focused: false
        }
        result.postNum = await service.post.getUserPostsCountByUserId(userInfo.userId);
        result.fansNum = await service.user.getUserFansCountByUserId(userInfo.userId);
        result.focusNum = await service.user.getUserFocusCountByfocusUserId(userInfo.userId);
        result.focused = await service.user.floowedByUserId(userInfo.userId, myUser_id)
        return result;
    }
    /**
     * 通过用户Id 来获取用户的 信息
     * @param userId
     */
    public async getUserInfoByUserId(userId: string) {
        return await this.app.model.User.getUserInfoByUserId(userId);
    }

    /**
     * 通过用户username 来获取用户的 信息
     * @param userName
     */
    public async getUserInfoByUsername(userName: string) {
        return await this.app.model.User.getUserInfoByUserName(userName);
    }


    /**
     * 通过用户phoneNumber 来获取用户的 信息
     * @param phoneNumber
     */
    public async getUserInfoByPhoneNumber(phoneNumber: string) {
        return await this.app.model.User.getUserInfoByPhoneNumber(phoneNumber);
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
        return Boolean(await this.app.model.Post.checkIsSelfPost(postId, userId));
    }

    /**
     * 通过用户Id 获取 粉丝总数
     * @param userId
     */
    public async getUserFansCountByUserId(userId: string): Promise<number> {
        return await this.app.model.Focus.getUserFansNum(userId)
    }

    /**
     * 通过用户Id 获取 关注总数
     * @param focusUserId
     */
    public async getUserFocusCountByfocusUserId(focusUserId: string): Promise<number> {
        return await this.app.model.Focus.getUserFocusNum(focusUserId);
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
        const res = await this.app.model.Focus.findFocusUser(userId, focusUserId)
        if (res) {
            return 1;
        } else {
            try {
                await this.app.model.Focus.createFocus(userId, focusUserId)
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
        return await this.app.model.Focus.destroyFocus(userId, focusUserId)
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
        let users = await app.model.Focus.fetchFocusList(focusUserId, page, size)

        let result: IFans[] = [];

        for (const user of users) {
            const { img, name, signature, userId, userName, website, badge } = await service.user.getUserInfoByUserId(user.userId) as User;
            const fan: IFans = { img, name, signature, userId, userName, website, badge, focused: true }
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

        let users = await app.model.Focus.fetchFansList(focusUserId, page, size)

        let result: IFans[] = [];
        for (const user of users) {
            const { img, name, signature, userId, userName, website, badge } = await service.user.getUserInfoByUserId(user.focusUserId) as User;
            const focused: boolean = await service.user.floowedByUserId(userId, focusUserId);
            const fan: IFans = { img, name, signature, userId, userName, website, badge, focused }
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

        const res = await this.app.model.Focus.getUserFocusUser(userId, focusUserId);
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
        const { User, /* Focus */ } = this.app.model;

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
            // let fansNum = await Focus.count({ where: { user_id: user.user_id } })
            // let focusNum = await Focus.count({ where: { focus_user_id: user.user_id } })
            result.push({
                userId: user.userId,
                userName: user.userName,
                img: user.img,
                name: user.name,
                signature: user.signature,
                website: user.website,
                badge: user.badge,
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

    public async getSuggestedUser(page: number, size: number, user_id: string): Promise<IOtherUser[]> {

        const focusSql: string = `SELECT fu.user_id FROM tbl_focus AS fu WHERE fu.focus_user_id = '${user_id}' ORDER BY fu.add_time DESC`;
        const sql: string = `SELECT
                            vr.user_id,
                            COUNT( vr.user_id ) AS counts
                        FROM
                            tbl_visit_record AS vr
                        WHERE
                            vr.visit_user_id IN (${focusSql})
                            AND vr.add_time >= '${getNDay(3)}'
                            AND vr.user_id != '${user_id}'
                            AND vr.user_id NOT IN (${focusSql})
                        GROUP BY
                            vr.user_id
                        ORDER BY
                            counts DESC
                            LIMIT ${(page - 1) * size},
                            ${size}`
        const res: { user_id: string, counts: number }[] = await this.app.mysql.query(sql);

        const userList: IOtherUser[] = [];
        for (let index = 0; index < res.length; index++) {
            const user: IOtherUser | null = await this.service.user.getUserDetailInfo(res[index].user_id, 'user_id', user_id)
            if (user) {
                userList.push(user)
            }
        }

        // console.log(getNDay(3))

        return userList;
    }
}


