import { Service } from "egg";
import { LoginParams, RegisterParams, UserInfo } from '../types/account_interface';
import * as uuid from "uuid";
import * as jwt from "jsonwebtoken";
// import { User } from '../model/user';

// import md5 from "../utils/md5";

export default class AccountService extends Service {

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
            pass_word: RegisterParams.passWord,
            add_time: Date.now(),
            last_time: Date.now()
        })
        // console.log(res);
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
    public async getUserByUserNamePassWord(LoginParams: LoginParams): Promise<UserInfo> {
        const user = await this.app.model.User.findOne({
            where: {
                "user_name": LoginParams.userName,
                "pass_word": LoginParams.passWord
            }
            // attributes: [
            //     ["user_id", "userId"],
            //     "name",
            //     ["user_name", "userName"],
            //     "website",
            //     "badge",
            //     "signature",
            //     ["pass_word", "password"],
            //     ["add_time", "addTime"],
            //     ["last_time", "lastTime"],
            //     "img"
            // ]
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
}
