const {Builder, By, Key, until} = require('selenium-webdriver');
console.log("Here is the first prototype");


// declare an array that holds all the website that I am going to scrap
var websites = ["https://stackabuse.com/","https://www.frindwinery.com/"];

// get ready to write on the file later
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'output.csv',
  header: [
    {id: 'number', title: 'number'},
    {id: 'name_of_web', title: 'name_of_web'},
    {id: 'browserName', title:'browserName'},
    {id:'os', title:'os'},
    {id:'language', title:'language'},
  ]
});

//loop through the websites one by one.
var web;
const data = [];
async function answer (){
  let driver = await new Builder().forBrowser('firefox').build();
  try{
  for (web in websites){
    let address = websites[web];



      // Apply timeout for 5 seconds
      await driver.manage().setTimeouts( { implicit: 5000 } );
        // Navigating to google
      await driver.get(address);
      // finding out which browser and which operating system the user is using.
      let  capability = await driver.getCapabilities();
      let browserName = await capability.getBrowserName().toLowerCase();
      console.log(browserName);
      let os = await capability.getPlatform().toString();
      console.log(os);

      //get the language
      //get the language of a web page
      let language = await driver.findElement(By.tagName("html")).getAttribute("lang");
      console.log(language);


      console.log(address);
      // writting my findings on an object that I will later put in my file.
      let record = {
        number: parseInt(web) +1,
        name_of_web: websites[web],
        browserName: browserName,
        os:os,
        language:language,
      }
      data.push(record);
    }
  }
    finally{
          driver.quit();
      }

      // the actual writting
      csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'));
}

answer();
