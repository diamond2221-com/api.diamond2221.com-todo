import { Controller } from 'egg';
import * as OssAli from "ali-oss";
import { get_suffix, random_string } from '../utils/common';
export default class CommonController extends Controller {
    public async uploadImage() {
        const { ctx } = this;

        const client = new OssAli({
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAIej8aK2sOalxT',
            accessKeySecret: 'IivM51kqFsCVOWwKScr0Hmp08h7axl',
            bucket: 'ins-web'
        });
        const files = ctx.request.files;

        const result: string[] = [];

        for (const file of files) {
            const suffix: string = get_suffix(file.filename);
            const filename: string = random_string(16);
            let res = await client.put(`post_img/${filename}${suffix}`, file.filepath);
            result.push(res.url);
        }

        ctx.send(200, "", result)
    }
}
