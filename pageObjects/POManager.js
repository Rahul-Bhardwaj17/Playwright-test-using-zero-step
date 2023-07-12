const { LoginPage } = require("../pageObjects/LoginPage");
const { OrderPage } = require("../pageObjects/OrderPage");

class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.orderPage = new OrderPage(this.page);
  }

  async landingPageObj() {
    return this.loginPage;
  }

  async orderPageObj() {
    return this.orderPage;
  }
}

module.exports = { POManager };
