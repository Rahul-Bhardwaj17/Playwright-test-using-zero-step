const { use } = require("../playwright.config");
const { baseURL } = use;

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameLocator = page.locator("input#username");
    this.passwordLocator = page.locator("input#password");
    this.signInButton = page.locator("input#signInBtn");
    this.checkMark = page.locator("span.checkmark");
    this.okayButton = page.locator("button#okayBtn");
    this.terms = page.locator("#terms");
    this.optionSelection = page.locator("select.form-control");
    this.orderTab = page.locator("//button[contains(text(), ' ORDERS')]");
  }

  async goTo() {
    await this.page.goto(`${baseURL}/loginpagePractise/`);
  }

  async clientUrl() {
    await this.page.goto(`${baseURL}/client`);
  }

  async enterCredentials(username, password) {
    await this.usernameLocator.type(username);
    await this.passwordLocator.type(password);
  }

  async checkMarkSelection() {
    await this.checkMark.last().click();
    await this.okayButton.click();
  }

  async termsSelection() {
    await this.terms.click();
  }

  async signInClick() {
    await this.signInButton.click();
  }

  async clickOnOrderTab() {
    await this.orderTab.click();
  }
}

module.exports = { LoginPage };
