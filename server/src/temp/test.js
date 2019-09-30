const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const hiddenUserAgent = require('puppeteer-extra-plugin-anonymize-ua');

puppeteer.use(stealth);
puppeteer.use(hiddenUserAgent({ makeWindows: true }));

async function test() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      `https://www.whatismybrowser.com/detect/what-is-my-user-agent`,
      { waitUntil: 'networkidle2', timeout: 0 }
    );

    // const result = await getPage(URL, page);

    await page.screenshot({ path: 'stealth-test-result.png', fullPage: true });
  } catch (e) {
    console.log(e);
  }
}

test();
