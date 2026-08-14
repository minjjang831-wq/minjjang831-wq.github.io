const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage();

  page.setDefaultTimeout(30 * 60 * 1000);

  page.on('console', msg => {
    console.log('[PAGE]', msg.text());
  });

  await page.goto(
    'https://minjjang831-wq.github.io/',
    {
      waitUntil: 'domcontentloaded',
      timeout: 120000
    }
  );

  console.log('페이지 로드 완료');

  await page.fill('#tgToken', process.env.TG_TOKEN);
  await page.fill('#tgChat', process.env.TG_CHAT_ID);

  const checked = await page.isChecked('#tgOn');
  if (!checked) {
    await page.check('#tgOn');
  }

  console.log('텔레그램 설정 입력 완료');

  console.log('초기 자동 계산 종료 대기');

  await page.waitForFunction(() => {
    const refresh = document.querySelector('#refresh');
    if (!refresh) return false;
    return !refresh.disabled;
  }, {
    timeout: 30 * 60 * 1000
  });

  console.log('초기 계산 종료 확인');

  await page.click('#tgNow');

  console.log('전체 예측 실행');

  await page.waitForFunction(() => {
    const el = document.querySelector('#tgStatus');
    if (!el) return false;

    const text = el.textContent || '';

    return (
      text.includes('보냄') ||
      text.includes('전송 실패')
    );
  }, {
    timeout: 30 * 60 * 1000
  });

  const status = await page.textContent('#tgStatus');

  console.log('텔레그램 상태:', status);

  if (status.includes('전송 실패')) {
    throw new Error(status);
  }

  await browser.close();

  console.log('실제 전송 완료');
})();
