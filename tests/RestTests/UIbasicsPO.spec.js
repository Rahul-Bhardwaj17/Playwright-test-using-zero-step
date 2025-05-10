const { test, expect } = require("@playwright/test");
const Data = require("../../testData/testData.json");
const { POManager } = require("../../pageObjects/POManager");

test("UI controls", async ({ page }) => {
  const poManager = new POManager(page);
  const loginPage = await poManager.landingPageObj();

  await loginPage.goTo();
  await loginPage.enterCredentials(
    Data.dashboardCredentials.username,
    Data.dashboardCredentials.password
  );
  await loginPage.checkMarkSelection();
  await expect(loginPage.checkMark.last()).toBeChecked();

  await loginPage.termsSelection();
  await expect(loginPage.terms).toBeChecked();
  await loginPage.terms.uncheck();

  expect(await loginPage.terms.isChecked()).toBeFalsy();
  await loginPage.optionSelection.selectOption("Student");

  await loginPage.signInClick();
});
