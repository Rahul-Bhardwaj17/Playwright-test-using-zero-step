const Data = require("../testData/testData.json");

class ApiUtils {
  constructor(newContext, payLoad) {
    this.newContext = newContext;
    this.payLoad = payLoad;
  }

  async getToken() {
    const loginResponse = await this.newContext.post(
      `${Data.baseURL}${Data.urls.postUrl}`,
      {
        data: this.payLoad,
      }
    );

    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    const token = await loginResponseJson.token;

    console.log(token);

    return token;
  }

  async createOrder(orderIdPayload) {
    let response = {};
    response.token = await this.getToken();

    const orderResponse = await this.newContext.post(
      `${Data.baseURL}${Data.urls.createOrderUrl}`,
      {
        data: orderIdPayload,
        headers: {
          Authorization: response.token,
          "Content-type": "application/json",
        },
      }
    );

    const orderResponseJson = await orderResponse.json();
    const orderID = await orderResponseJson.orders;
    response.orderID = orderID;
    console.log(orderID);

    return response;
  }
}

module.exports = { ApiUtils };
