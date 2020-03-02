import { Controller } from 'egg';

import * as OssAli from "ali-oss";
import { get_suffix, random_string } from '../../utils/common';


export default class UploadImgsController extends Controller {
    public async create() {
        const { ctx } = this;

        const client = new OssAli({
            region: 'oss-cn-beijing',
            accessKeyId: 'LTAInaRxcKVhzEN3',
            accessKeySecret: 'DYsHsKmn7Ovt8K26M8dlrG82cnsgcb',
            bucket: 'diamond2221-com'
        });
        const files = ctx.request.files;

        const result: string[] = [];

        for (const file of files) {
            const suffix: string = get_suffix(file.filename);
            const filename: string = random_string(16);
            let res = await client.put(`post_img/${filename}${suffix}`, file.filepath);
            result.push(res.url);
        }

        ctx.send(result, 200, "")
    }

    public async index() {
        const { ctx } = this;
        console.log(ctx.request)
        console.log(ctx.query);
        ctx.send("OK", 200)
    }
}
