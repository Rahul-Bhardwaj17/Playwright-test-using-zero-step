class ApiPart2Utils {
  constructor(newContext) {
    this.newContext = newContext;
  }

  async postRequest(postUrl, postPayload) {
    return await this.newContext.post(postUrl, {
      data: postPayload,
    });
  }

  async getRequest(getUrl) {
    return await this.newContext.get(getUrl);
  }

  async putRequest(putUrl, putPayload) {
    return await this.newContext.put(putUrl, {
      data: putPayload,
    });
  }

  async deleteRequest(deleteUrl) {
    return await this.newContext.delete(deleteUrl);
  }
}
module.exports = { ApiPart2Utils };
