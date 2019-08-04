module.exports = {

  send(code: number, message: string, data = {}) {
    this.status = 200;

    this.body = {
      data,
      message,
      code
    }
  }
}
