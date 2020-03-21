import * as Core from '@alicloud/pop-core'
import { Context } from '../../typings/app';

const AliClient = new Core({
    accessKeyId: 'LTAInaRxcKVhzEN3',
    accessKeySecret: 'DYsHsKmn7Ovt8K26M8dlrG82cnsgcb',
    endpoint: 'https://dysmsapi.aliyuncs.com',
    apiVersion: '2017-05-25'
});
interface ISms {
    phoneNumbers: string, /* 接收短信的手机号码。 多个用 , 隔开 */
    SignName: string, /* 短信签名名称。请在控制台签名管理页面签名名称一列查看。 */
    TemplateCode: string /* 短信模板ID。请在控制台模板管理页面模板CODE一列查看。 */
    Code: string
}

module.exports = {

    send(this: Context, data: any = {}, code: number = 200, message: string = "成功") {
        let body: any = {};
        this.status = 200;
        if (code === 200) {
            body = {
                data,
                message,
                code: 200
            }
            this.body = body;
            return body;
        } else {
            if (typeof data === "string") {
                body = {
                    data: "",
                    message: data,
                    code
                };
                this.body = body;
                return body;
            } else if (data === 200) {
                body = {
                    data: {},
                    message: "成功",
                    code: 200
                }
                this.body = body;
                return body;
            } else {
                body = {
                    data,
                    message,
                    code
                };
                this.body = body;
                return body;

            }
        }
    },

    /**
     * @description
     * @author ZhangYu
     * @date 2020-02-18
     * @param {ISms} data
     */
    sendSms(this: Context, data: ISms) {

        var params = {
            "RegionId": "cn-hangzhou",
            "PhoneNumbers": data.phoneNumbers,
            "SignName": data.SignName,
            "TemplateCode": data.TemplateCode,
            "TemplateParam": JSON.stringify({ code: data.Code })
        }

        var requestOption = {
            method: 'POST'
        };

        return new Promise((resolve, reject) => {
            return AliClient.request('SendSms', params, requestOption).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err);
                this.send('你的操作太频繁了，请稍后再试', 400)
                this.app.logger.error(err);
            })
        })
    },
    sendSms1(data: ISms) {
        return new Promise((resolve) => {
            resolve(data);
        })
    },
    getUid(this: Context) {
        return this.request.header["client-uid"]
    }
}
