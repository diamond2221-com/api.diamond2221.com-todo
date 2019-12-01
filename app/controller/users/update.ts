import { Controller } from "egg";

export default class UpdateController extends Controller {
    /**
     * @description 修改账户信息
     * @author ZhangYu
     * @date 2019-08-30
     * @memberof UserController
     */
    public async create() {
        const { ctx, service } = this;
        const { userName, img, name, signature, userId, website } = ctx.request.body;
        let newUserInfo = {};
        function addProp(obj, key: string, prop: any) {
            if (prop && prop !== 0) {
                obj[key] = prop;
            }
        }

        addProp(newUserInfo, "userName", userName);
        addProp(newUserInfo, "img", img);
        addProp(newUserInfo, "name", name);
        addProp(newUserInfo, "signature", signature);
        addProp(newUserInfo, "website", website);

        const result = await service.user.changeUserInfoByUserId(userId, newUserInfo);
        ctx.send(result, 200, "修改成功");
    }
}
