import * as Core from '@alicloud/pop-core'

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

  send(data: any = {}, code: number = 200, message: string = "成功") {

    this.status = 200;
    if (code === 200) {
      this.body = {
        data,
        message,
        code: 200
      }
    } else {
      if (typeof data === "string") {
        this.body = {
          data: "",
          message: data,
          code
        }
      } else if (data === 200) {
        this.body = {
          data: {},
          message: "成功",
          code: 200
        }
      } else {
        this.body = {
          data,
          message,
          code
        }

      }
    }
  },

  /**
   * @description
   * @author ZhangYu
   * @date 2020-02-18
   * @param {ISms} data
   */
  sendSms(data: ISms) {

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

    return AliClient.request('SendSms', params, requestOption)
  },
  sendSms1(data: ISms) {
    return new Promise((resolve) => {
      resolve(data);
    })
  }
}
