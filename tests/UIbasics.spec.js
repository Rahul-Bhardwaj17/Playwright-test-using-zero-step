const { test, expect } = require("@playwright/test");
const Data = require("../testData/testData.json");
const xlsx = require("xlsx");
const path = require("path");

//Browser context is basically used to invoke new context (new browser) {} - curly braces used to show that it is playwright context

//const testData = [{ username: "rahulshettyacademy", password: "learning" }];

/*test.each(
  `Browser context playwright Test for username: ${usernameFor}`,
  async ({ browser }, testCase) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const { username, password } = testCase;
    await runTest(page, username, password);
  }
);
async function runTest(page, username, password) {
  //Locator method is used to move to a selector
  const username = page.locator("input#username");
  const password = page.locator("input#password");
  const signInButton = page.locator("input#signInBtn");
  const cardTitles = page.locator("h4.card-title a");

  //goto method used to visit a URL
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //type method used to enter input
  await username.type(username);
  await password.type(password);

  //click method used to clicking
  await signInButton.click();

  /* await expect(await page.locator('div[style*="display"]')).toContainText(
    "Incorrect"
  );
  await username.fill("");
  await username.fill("rahulshettyacademy");

  //we are applying dynamic wait ,second element of array would execute first then first element of array would execute
  await Promise.all([page.waitForNavigation(), signInButton.click()]);

  //extracting text of 1'st out of 4 elementes
  // console.log(await cardTitles.first().textContent());

  //extracting text of 1'st out of 4 elementes
  // await cardTitles.nth(0).textContent();

  console.log("---------------------");
  //specific method in playwright to grab text from all selectors ,it will return an array
  console.log(await cardTitles.allTextContents());
}*/
const testOptions = {
  showSoftAssertions: true,
};
//we are only using page context here since we are not passing optional info at new context so playwright will recognize it
test("Page context playwright Test", async ({ page }) => {
  await page.goto("https://google.co.in");
  await expect(page).toHaveTitle("Google");
});

test("UI controls", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  //Locator method is used to move to a selector
  const username = page.locator("input#username");
  const password = page.locator("input#password");
  const signInButton = page.locator("input#signInBtn");
  const blinkingText = page.locator("a[href*='https']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  //type method used to enter input
  await username.type("rahulshettyacademy");
  await password.type("learning");

  await page.locator("span.checkmark").last().click();
  await page.locator("button#okayBtn").click();

  //checking whether radiobutton/checkmark is checked or not
  await expect(page.locator("span.checkmark").last()).toBeChecked();

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();

  expect(await page.locator("#terms").isChecked()).toBeFalsy();

  //using select class to select one of the available options
  await page.locator("select.form-control").selectOption("Student");

  //click method used to clicking
  await signInButton.click();

  await expect(blinkingText).toHaveAttribute("class", "blinkingText");
});

test.skip("Child Window handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const blinkingText = page.locator("a[href*='https']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    blinkingText.click(),
  ]);

  const text = newPage.locator(".red").textContent();
  console.log(text);
});

/*const testData = [{ username: "rahulshettyacademy", password: "learning" }];

testData.forEach(data ={

test(`parameterized test for user ${data.username}`, async ({ page }) => {
  // Your test case logic here
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const usernameInput = await page.$("input#username");
  const passwordInput = await page.$("input#password");
  const signInButton = await page.$("input#signInBtn");

  await usernameInput.type(data.username);
  await passwordInput.type(data.password);
  await signInButton.click();

  // Add assertions or validations as needed

 
});

});*/

//local array
//const testData = [{ username: "rahulshettyacademy", password: "learning" }];

/*testData.forEach((data) => {
  test(`parameterized test for user ${data.username}`, async ({ page }) => {
    // Your test case logic here
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const usernameInput = await page.$("input#username");
    const passwordInput = await page.$("input#password");
    const signInButton = await page.$("input#signInBtn");

    await usernameInput.type(data.username);
    await passwordInput.type(data.password);
    await signInButton.click();

    // Add assertions or validations as needed
  });*/

/*for (const ele of Data) {
  test(`parameterized test for user ${ele.username}`, async ({ page }) => {
    // Your test case logic here
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const usernameInput = await page.$("input#username");
    const passwordInput = await page.$("input#password");
    const signInButton = await page.$("input#signInBtn");

    await usernameInput.type(ele.username);
    await passwordInput.type(ele.password);
    await signInButton.click();

    // Add assertions or validations as needed
  });
}*/

//json
/*Data.forEach((ele) => {
  test(`parameterized test for user ${ele.username}`, async ({ page }) => {
    // Your test case logic here
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const usernameInput = await page.$("input#username");
    const passwordInput = await page.$("input#password");
    const signInButton = await page.$("input#signInBtn");

    await usernameInput.type(ele.username);
    await passwordInput.type(ele.password);
    await signInButton.click();

    // Add assertions or validations as needed
  });
});
*/

//excel
const filePath = path.join(__dirname, "../testData/sampleData.xlsx");

const workbook = xlsx.readFile(
  filePath
  // "C:/Users/kumar/OneDrive/Desktop/sampleData.xlsx"
  //"C:/Users/kumar/OneDrive/DesktopPlaywright_Automation/testData/sampleData.xlsx"
);

const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const testData = xlsx.utils.sheet_to_json(worksheet);

testData.forEach((ele) => {
  test(`parameterized test for user ${ele.username}`, async ({ page }) => {
    // Your test case logic here
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const usernameInput = await page.$("input#username");
    const passwordInput = await page.$("input#password");
    const signInButton = await page.$("input#signInBtn");

    await usernameInput.type(ele.username);
    await passwordInput.type(ele.password);
    await signInButton.click();
    await page.pause();

    // Add assertions or validations as needed
  });
});
