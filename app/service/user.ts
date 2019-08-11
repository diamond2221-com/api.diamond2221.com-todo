import { Service } from "egg";
export default class UserService extends Service {
    /**
     * 通过用户Id 来获取用户的 信息
     * @param userId
     */
    public getUserInfoByUserId(userId: number) {
        return this.app.mysql.get("ins_user", {userId});
    }
}
