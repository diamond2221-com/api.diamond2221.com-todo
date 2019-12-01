import { Controller } from 'egg';

import * as OssAli from "ali-oss";
import { get_suffix, random_string } from '../../utils/common';


export default class UploadImgsController extends Controller {
    public async create() {
        const { ctx } = this;

        const client = new OssAli({
            region: 'oss-ap-northeast-1',
            accessKeyId: 'LTAInaRxcKVhzEN3',
            accessKeySecret: 'DYsHsKmn7Ovt8K26M8dlrG82cnsgcb',
            bucket: 'instagram-web'
        });
        const files = ctx.request.files;

        const result: string[] = [];

        for (const file of files) {
            const suffix: string = get_suffix(file.filename);
            const filename: string = random_string(16);
            let res = await client.put(`post_img/${filename}${suffix}`, file.filepath);
            // console.log(res, "22")
            result.push(res.url);
        }

        ctx.send(result, 200, "")
    }
}
