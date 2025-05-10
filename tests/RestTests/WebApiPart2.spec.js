const { test, expect, request } = require("@playwright/test");
const DataJson = require("../../testData/testData2.json");
const { ApiPart2Utils } = require("../../utils/ApiPart2Utils");

let apiPart2Utils;
test.beforeEach(async () => {
  let newContext = await request.newContext();
  apiPart2Utils = new ApiPart2Utils(newContext);
});

test("post API request", async () => {
  const postResponse = await apiPart2Utils.postRequest(
    `${DataJson.baseURL}${DataJson.endPointUrls[0].post}`,
    DataJson.postPayload
  );

  expect(postResponse.status()).toBe(DataJson.responseCode[0].postResponseCode);
});

test("Get API request", async () => {
  const getResponse = await apiPart2Utils.getRequest(
    `${DataJson.baseURL}${DataJson.endPointUrls[0].get}`
  );

  expect(getResponse.status()).toBe(DataJson.responseCode[0].getResponseCode);
});

test("Put API request", async () => {
  const putResponse = await apiPart2Utils.putRequest(
    `${DataJson.baseURL}${DataJson.endPointUrls[0].put}`,
    DataJson.putPayload
  );

  expect(putResponse.status()).toBe(DataJson.responseCode[0].putResponseCode);
});

test("delete API request", async () => {
  const deleteResponse = await apiPart2Utils.deleteRequest(
    `${DataJson.baseURL}${DataJson.endPointUrls[0].delete}`
  );

  expect(deleteResponse.status()).toBe(
    DataJson.responseCode[0].deleteResponseCode
  );
});
