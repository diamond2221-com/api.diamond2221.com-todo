import { Context } from '../../typings/app';
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
    }

}
