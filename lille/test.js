
let {Builder} = require('selenium-webdriver');
let fs = require('fs');

(async function example() {
    let driver = await new Builder()
      .forBrowser('chrome')
      .build();

    await driver.get('https://www.example.com');
    // Returns base64 encoded string
    let encodedString = await driver.takeScreenshot();
    await fs.writeFileSync('./image.png', encodedString, 'base64');
    await driver.quit();
}())
