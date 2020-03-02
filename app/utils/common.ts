/*
 * @Author: ZhangYu
 * @Date:   2018-12-29 14:54:27
 * @Last Modified by: zhangyu
 * @Last Modified time: 2020-03-02 22:16:14
 */

export const timestampToTime = (timestamp: number | string): string => {
    if (typeof timestamp === 'string') timestamp = Number(timestamp);
    //debugger;
    let now: Date = new Date();
    let date: Date = new Date((timestamp));
    //计算时间间隔，单位为分钟
    let inter: number = parseInt(((now.getTime() - date.getTime()) / 1000 / 60).toString());
    if (inter === 0) {
        return "刚刚";
    }
    //多少分钟前
    else if (inter < 60) {
        return inter.toString() + "分钟前";
    }
    //多少小时前
    else if (inter < 60 * 24) {
        return parseInt((inter / 60).toString()).toString() + "小时前";
    }
    //本年度内，日期不同，取日期+时间  格式如  06-13 22:11
    else if (now.getFullYear() == date.getFullYear()) {
        return (
            (date.getMonth() + 1).toString() +
            "-" +
            date.getDate().toString() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes()
        );
    } else {
        return (
            date
                .getFullYear()
                .toString()
                .substring(2, 3) +
            "-" +
            (date.getMonth() + 1).toString() +
            "-" +
            date.getDate().toString() +
            " " +
            date.getHours() +
            ":" +
            date.getMinutes()
        );
    }
};


// 根据路径获取后缀
export const get_suffix = (filename: string): string => {
    let pos: number = filename.lastIndexOf('.');
    let suffix: string = '';
    if (pos !== -1) {
        suffix = filename.substring(pos);
    }
    return suffix;
}
// 随机字符串
export const random_string = (len: number): string => {
    len = len || 32;
    let chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let maxPos: number = chars.length;
    let pwd: string = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

const base64 = () => {
    const e: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    /**
     * @description 解码 base64
     * @author ZhangYu
     * @date 2020-02-15
     * @param {string} r
     * @returns {string}
     */
    function atob(r: string): string {
        var o = String(r).replace(/=+$/, "");
        if (o.length % 4 == 1) throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var n, a, i = 0, c = 0, d = ""; a = o.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? d += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0)a = e.indexOf(a);
        return d
    }

    /**
     * @description 把字符串编码为base64
     * @author ZhangYu
     * @date 2020-02-15
     * @param {string} r
     * @returns {string}
     */
    function btoa(r: string): string {
        for (var o, n, a = String(r), i = 0, c = e, d = ""; a.charAt(0 | i) || (c = "=", i % 1); d += c.charAt(63 & o >> 8 - i % 1 * 8)) {
            if (n = a.charCodeAt(i += .75), n > 255) throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            o = o << 8 | n
        }
        return d
    }
    return {
        btoa,
        atob
    }
}
export const btoa = base64().btoa;
export const atob = base64().atob;


/**
 * @description 生成6位随机数
 * @author ZhangYu
 * @date 2020-02-18
 * @export
 * @returns {number}
 */
export function MathRand(): string {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    };
    return Num;
}


/**
 * @description　获取　ｎ　天之前的日期　返回　时间戳
 * @author ZhangYu
 * @date 2020-03-02
 * @export
 * @param {number} n
 * @returns {number}
 */
export function getNDay(n: number): number {
    let now = Date.now();
    let day = new Date(now - 60 * 60 * 24 * n * 1000);
    day.setHours(0, 0, 0, 0)
    return day.getTime()
}
