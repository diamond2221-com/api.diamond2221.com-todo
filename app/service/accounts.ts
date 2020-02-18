import { Service } from "egg";
import { LoginParams, RegisterParams, UserInfo } from '../types/account_interface';
import * as uuid from "uuid";
import * as jwt from "jsonwebtoken";
// import * as Sequelize from "sequelize"

export default class AccountsService extends Service {

    public async Login(userName: string, userId: string): Promise<string> {
        // 验证通过
        const token = jwt.sign({ userId, userName }, this.app.config.jwtSecret, { expiresIn: '7d' });
        await this.updateLastLoginTime(userId);
        return token;
    }

    /**
     *
     * @param {RegisterParams} RegisterParams
     * @returns {Promise<boolean>}
     * @memberof LoginService
     */
    public async Register(RegisterParams: RegisterParams): Promise<boolean> {
        const userId: string = `uu${uuid.v4().replace(/-/g, "")}`;
        const res = await this.app.model.User.create({
            user_id: userId,
            user_name: RegisterParams.userName,
            phone_number: `${RegisterParams.phoneNumber}`,
            pass_word: RegisterParams.passWord,
            add_time: Date.now(),
            last_time: Date.now()
        })
        return res ? true : false;
    }


    /**
     * @description 登录 根据 用户名 密码 获取用户信息
     * @author ZhangYu
     * @date 2019-12-18
     * @param {LoginParams} LoginParams
     * @returns
     * @memberof AccountService
     */
    public async getUserByUserNamePassWord(LoginParams: LoginParams): Promise<UserInfo | null> {
        let user = await this.app.model.User.findOne({
            where: {
                "user_name": LoginParams.userName,
                "pass_word": LoginParams.passWord
            }
        })
        if (!user) {
            user = await this.app.model.User.findOne({
                where: {
                    "phone_number": LoginParams.userName,
                    "pass_word": LoginParams.passWord
                }
            })
        }
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
                addTime: user ? user.add_time : ''
            }
        } else {
            return null;
        }

    }

    /**
     *
     * @param userId 用戶Id
     */
    public async updateLastLoginTime(userId: string) {
        await this.app.model.User.update(
            { "last_time": Date.now() },
            {
                where: {
                    "user_id": userId
                }
            })
    }

    /**
     * @description 验证用户密码是否正确
     * @author ZhangYu
     * @date 2020-02-06
     * @param {string} user_id 用户id
     * @param {pass_word} pass_word 新密码
     * @memberof AccountsService
     */
    public async verifyUserPassword(user_id: string, pass_word: string): Promise<boolean> {

        const { User } = this.app.model;
        const res = await User.findOne({
            where: {
                user_id,
                pass_word
            }
        })
        return Boolean(res);
    }

    /**
     * @description 修改用户密码
     * @author ZhangYu
     * @date 2020-02-06
     * @param {string} user_id 用户id
     * @param {pass_word} pass_word 新密码
     * @memberof AccountsService
     */
    public async changepass_word(user_id: string, pass_word: string): Promise<boolean> {
        const { User } = this.app.model;
        try {
            await User.update({ pass_word }, { where: { user_id } })
        } catch (error) {
            return false
        }
        return true
    }

    /**
     * @description 验证当前用户名 是否已占用
     * @author ZhangYu
     * @date 2020-02-06
     * @param {string} user_name
     * @memberof AccountsService
     */
    public async verifyRepeatUserName(user_name: string): Promise<boolean> {
        const { User } = this.app.model;
        const res = await User.findOne({
            where: {
                user_name
            }
        })
        return Boolean(res);
    }

    /**
     * @description 验证当前手机号 是否已占用
     * @author ZhangYu
     * @date 2020-02-18
     * @param {string} user_id
     * @param {number} phone_number
     * @memberof AccountsService
     */
    public async verifyRepeatPhoneNumber(phone_number: number): Promise<boolean> {
        const { User } = this.app.model;
        const res = await User.findOne({
            where: {
                phone_number: `${phone_number}`
            }
        })
        return Boolean(res);
    }
}
