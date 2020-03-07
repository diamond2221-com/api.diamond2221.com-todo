import { Service } from "egg";
import { LoginParams } from '../types/account_interface';
// import { IUserInfo } from "../types/user_interface"
import {User} from "../model/user"
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
    public async Register(userName: string, phoneNumber: number, passWord: string): Promise<boolean> {
        const userId: string = `uu${uuid.v4().replace(/-/g, "")}`;
        const res = await this.app.model.User.createUser(userId, userName, `${phoneNumber}`, passWord)
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
    public async getUserByUserNamePassWord(LoginParams: LoginParams) {
        let user: User | null = await this.service.user.getUserInfoByUsername(LoginParams.userName)
        if (!user) {
            user = await this.service.user.getUserInfoByPhoneNumber(LoginParams.userName);
        }
        if (user && user.passWord === LoginParams.passWord) {
            return user;
        } else {
            return null;
        }

    }

    /**
     * 更新用户最后一次登录时间
     * @param userId 用戶Id
     */
    public async updateLastLoginTime(userId: string) {
        await this.app.model.User.updateLastLoginTime(userId);
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
        const userInfo = await User.getUserInfoByUserId(user_id);
        if (userInfo && userInfo.passWord === pass_word) {
            return true;
        } else {
            return false;
        }
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
            await User.updateUserInfo({ pass_word }, user_id);
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
        const res = await User.getUserInfoByUserName(user_name);
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
        const res = await User.getUserInfoByPhoneNumber(`${phone_number}`);
        return Boolean(res);
    }
}
