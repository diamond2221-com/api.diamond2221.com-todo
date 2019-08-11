/*
 * @Author: ZhangYu
 * @Date:   2018-12-29 14:54:27
 * @Last Modified by: zhangyu
 * @Last Modified time: 2019-08-11 16:49:10
 */

export const timestampToTime = (timestamp: number): string => {
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
