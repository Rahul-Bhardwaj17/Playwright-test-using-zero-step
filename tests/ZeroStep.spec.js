const { test, expect } = require("@playwright/test");
import { ai } from "@zerostep/playwright";

test("zerostep example", async ({ page }) => {
  // Navigating to URL
  await page.goto("https://zerostep.com/");

  // Creating object of zero step AI
  const aiArgs = { page, test };

  //Get header text of navigated page
  const headerText = await ai("Get the header text", aiArgs);

  //Assert the value of header text with actual value
  expect(headerText).toBe("Supercharge your Playwright tests with AI");

  //Navigating to google
  await page.goto("https://google.com/");

  //Entering the header text value in google search box
  await ai(`Type "${headerText}" in the search box`, aiArgs);

  //Pressing enter button
  await ai("Press enter", aiArgs);
});
