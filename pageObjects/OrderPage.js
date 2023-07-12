class OrderPage {
  constructor(page) {
    this.page = page;
    this.OrderIDWebPage = page.locator("tr.ng-star-inserted th");
    this.deleteButton = page.locator("//button[contains(text(),'Delete')]");
  }

  async orderIDValue() {
    return await this.OrderIDWebPage.textContent();
  }

  async deleteOrderId() {
    return await this.deleteButton.click();
  }
}

module.exports = { OrderPage };
