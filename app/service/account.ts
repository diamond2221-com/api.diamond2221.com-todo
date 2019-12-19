import { Service } from "egg";
import { LoginParams, RegisterParams } from '../types/account_interface';
import * as uuid from "uuid";
import * as jwt from "jsonwebtoken";

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
        const res = await this.app.mysql.insert("tbl_user", {
            userId,
            userName: RegisterParams.userName,
            password: RegisterParams.passWord,
            addTime: Date.now(),
            lastTime: Date.now()
        });
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
    public async getUserByUserNamePassWord(LoginParams: LoginParams) {
        const res = this.app.mysql.get("tbl_user", {
            "user_name": LoginParams.userName,
            "pass_word": LoginParams.passWord
        });

        return res
    }

    /**
     *
     * @param userId 用戶Id
     */
    public async updateLastLoginTime(userId: string) {
        await this.app.mysql.update("tbl_user", {
            "last_time": Date.now()
        }, {
            where: {
                "user_id": userId
            }
        });
    }
}
