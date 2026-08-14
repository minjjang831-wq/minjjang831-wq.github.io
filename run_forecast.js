const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  const fileUrl =
    "file://" +
    process.cwd() +
    "/coin-1h-forecast-auto.html";

  await page.goto(fileUrl);

  console.log("HTML 로딩");

  await page.waitForTimeout(180000);

  await page.fill(
    "#tgToken",
    process.env.TG_TOKEN
  );

  await page.fill(
    "#tgChat",
    process.env.TG_CHAT_ID
  );

  await page.check("#tgOn");

  await page.click("#tgNow");

  console.log("예측 실행");

  await page.waitForTimeout(30000);

  await browser.close();

  console.log("완료");
})();
