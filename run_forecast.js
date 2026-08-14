const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  await page.goto(
    'https://minjjang831-wq.github.io/',
    {
      waitUntil: 'networkidle'
    }
  );

  console.log('페이지 로드 완료');

  await page.waitForTimeout(180000);

  await page.fill(
    '#tgToken',
    process.env.TG_TOKEN
  );

  await page.fill(
    '#tgChat',
    process.env.TG_CHAT_ID
  );

  await page.check('#tgOn');

  await page.click('#tgNow');

  console.log('예측 실행');

  await page.waitForTimeout(30000);

  await browser.close();

  console.log('전송 완료');
})();
