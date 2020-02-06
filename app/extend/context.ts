
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
  }
}
