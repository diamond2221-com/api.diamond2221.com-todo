import { Service } from "egg";
export default class UserService extends Service {
    /**
     * 通过用户Id 来获取用户的 信息
     * @param userId
     */
    public getUserInfoByUserId(userId: number) {
        return this.app.mysql.get("ins_user", { userId });
    }

    /**
     * 通过用户Id 来修改用户信息
     * @param userId
     * @param newUserInfo
     */
    public changeUserInfoByUserId(userId: string, newUserInfo) {
        this.app.mysql.update("ins_user", newUserInfo, { where: { userId } })
    }

}
