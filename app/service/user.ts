import { Service } from "egg";

export default class AccountService extends Service {

    public async getUserPostsByUserId(userId: number, size: number, page: number) {
        const res = await this.app.mysql.select("ins_post", {
            where: {
                userId
            },
            orders: [['addTime', 'desc']],
            limit: size,
            offset: page * size
        })
        return res
    }

}
