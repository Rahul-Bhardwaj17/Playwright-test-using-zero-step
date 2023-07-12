const { test, expect, request } = require("@playwright/test");
const bookcartJson = require("../testData/bookcartData.json");
const { ApiPart2Utils } = require("../utils/ApiPart2Utils");

let apiPart2Utils;
test.beforeEach(async () => {
  let newContext = await request.newContext();
  apiPart2Utils = new ApiPart2Utils(newContext);
});

test("Adding HP2 book to the cart", async ({ page }) => {
  const postResponse = await apiPart2Utils.postRequest(
    `${bookcartJson.baseURL}${bookcartJson.apiEndPoint[0].loginEndPoint}`,
    bookcartJson.loginPayload
  );

  expect(postResponse.status()).toBe(
    bookcartJson.responseCode[0].loginResponseCode
  );

  const responseJson = await postResponse.json();
  const token = await responseJson.token;
  console.log(token);

  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto(bookcartJson.baseURL);
  const createOrderResponse = await apiPart2Utils.postRequest(
    `${bookcartJson.baseURL}${bookcartJson.apiEndPoint[0].createOrderEndPoint}`,
    bookcartJson.createOrderPlayload
  );

  expect(createOrderResponse.status()).toBe(
    bookcartJson.responseCode[0].loginResponseCode
  );
});
