
const { chromium } = require('playwright-extra')

const stealth = require('puppeteer-extra-plugin-stealth')()

chromium.use(stealth)

const args = [
  '--start-maximized',
  '-window-position=0,0',
];

const options = {
  args,
  headless: false,
  devtools: false,
  executablePath: 'D:\\Documents\\Chrome_Portable_Profile\\GoogleChromePortable\\App\\Chrome-bin\\chrome.exe',
};

const userDataDir = 'D:\\Documents\\Chrome_Portable_Profile\\GoogleChromePortable\\Data\\profile';

chromium.launchPersistentContext(userDataDir,
    options
  ).then(async browser => {
  // Launch a new incognito context
  const page = await browser.newPage();

  console.log('Testing the stealth plugin..')
  await page.goto('https://pypi.org/project/undetected-playwright/', { waitUntil: 'networkidle' })
  await page.screenshot({ path: 'sealth.png', fullPage: true })
  // Get the storage state, including cookies and other data
  // const storageState = await context.storageState();

  // // Print the link to the user data directory
  // console.log('User data directory:', storageStatse.userDataDir);
  await new Promise(resolve => setTimeout(resolve, 20000));

  console.log('All done, check the screenshot. ✨')
  await browser.close()
})