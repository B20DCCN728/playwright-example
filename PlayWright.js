// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

const args = [
  // '--start-maximized',
  '-window-position=0,0',
];

const options = {
  args,
  headless: false,
  devtools: false,
  executablePath: 'D:\\Documents\\Chrome_Portable_Profile\\GoogleChromePortable\\App\\Chrome-bin\\chrome.exe',
};

const userDataDir = 'D:\\Documents\\Chrome_Portable_Profile\\GoogleChromePortable\\Data\\profile';

puppeteer.launch({
  userDataDir,
  ...options,
}).then(async (browser) => {
  // Launch a new incognito context
  const page = await browser.newPage();

  await page.setViewport({
    width: 1920,
    height: 1080,
  });

  console.log('Testing the stealth plugin..');
  await page.goto('https://iphey.com/');
  await page.waitForTimeout(2000) 
  await page.screenshot({ path: 'stealth.png', fullPage: true });

  await new Promise(resolve => setTimeout(resolve, 10000));

  console.log('All done, check the screenshot. ✨')
  await browser.close();
});
