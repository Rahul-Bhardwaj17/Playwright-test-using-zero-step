const { test, expect, request } = require("@playwright/test");
const { ApiUtils } = require("../../utils/ApiUtils");
const Data = require("../../testData/testData.json");
const { POManager } = require("../../pageObjects/POManager");

let response, poManager, page;

test.beforeAll(async ({ browser }) => {
  const newContext = await request.newContext();

  const apiUtils = new ApiUtils(newContext, Data.ClientCredentials);
  response = await apiUtils.createOrder(Data.orders);

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });

  page = await context.newPage();
  poManager = new POManager(page);
});

test("Playwright create order with API", async () => {
  const orderPage = await poManager.orderPageObj();
  const loginPage = await poManager.landingPageObj();

  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await loginPage.clientUrl();
  await loginPage.clickOnOrderTab();

  const OrderIDWebPage = await orderPage.orderIDValue();
  expect(response.orderID[0]).toBe(OrderIDWebPage);

  await orderPage.deleteOrderId();
});
