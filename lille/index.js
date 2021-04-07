
const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('firefox').build();
    try {

        // Apply timeout for 5 seconds
        await driver.manage().setTimeouts( { implicit: 5000 } );
          // Navigating to google
        await driver.get('https://www.google.com');
        // finding out which browser and which operating system the user is using.
        let  capability = await driver.getCapabilities();
        let browserName = await cap.getBrowserName().toLowerCase();
        console.log(browserName);
        let os = await cap.getPlatform().toString();
        console.log(os);

        //hitting the second api and getting the title of the page
        // Apply timeout for 5 seconds
        await driver.manage().setTimeouts( { implicit: 5000 } );
        // Navigate to url
        await driver.get('https://www.google.com/search?q=rwanda');
        // get the info we want
        let tittle = await driver.getTitle();
        console.log(tittle);

        //get the language of a web page
        let language = await driver.findElement(By.tagName("html")).getAttribute("lang");
        console.log(language);


    }
    finally{
        driver.quit();
    }
})();
