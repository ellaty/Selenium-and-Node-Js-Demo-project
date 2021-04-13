// require modules for writting our JSon objects on the CSV file.
const converter = require('json-2-csv');
const fs = require('fs');

// for the userAgent variable, I prefer using node-navigator, it gives me more precise info
const { Navigator } = require("node-navigator");
const navigator = new Navigator();
// for other browser info I use this one.
const nav = require('navigator');


const {Builder, By, Key, until} = require('selenium-webdriver');
console.log("Here is the second prototype");


// declare an array that holds all the website that I am going to scrap
var websites = ["https://stackabuse.com/","https://www.frindwinery.com/"];


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

      //get all the javascript on the page
      var embededCalls=[];
      const all = await driver.findElements(By.tagName("script"));
      // loop through the scripts
      for (info in all){
        all[info].getAttribute("innerHTML").then(function (src) {
            // check wether the sript includes a link or an API call
            if(src.includes("fetch")||src.includes("get")|| src.includes("XMLHttpRequest") ){
              // get the addresses out
              //add the call to the link collection from this website
              var call;
              if(src.includes("https")){
                call = src.match(/\bhttps?:\/\/\S+/gi);
                embededCalls.push(call);
              }
              else{
                call = src.match(/\bhttp?:\/\/\S+/gi);
                embededCalls.push(call);
              }

            }


        });

      }

      //navigator.userAgent property been accessed ? and what is its content.
      var isUserAgentAccessed;
      var userAgentInfo;
      if (navigator.userAgent == null || navigator.userAgent == "undefined"){
        isUserAgentAccessed = false;
        console.log("the user agent accessible? :" + isUserAgentAccessed);
      }
      else{
        isUserAgentAccessed = true;
        //get the its content
        userAgentInfo = navigator.userAgent;
        console.log("the user agent accessible? :" + isUserAgentAccessed);
        console.log("the user agent info is  :" + userAgentInfo);
      }

      // are cookies enabled?

      let coockieEnabledStatus = nav.cookieEnabled;
      console.log("cookie enabled status :" + coockieEnabledStatus);

      //do we have plugins?
      let plugins = nav.plugins;
      console.log("plugins :" + plugins);

      //is the browser online?
      let browserOnlineStatus = nav.onLine;
      console.log("is the browser online :" + browserOnlineStatus);

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
        "number": parseInt(web) +1,
        "name_of_web": websites[web],
        "browserName": browserName,
        "os":os,
        "language":language,
        "isUserAgentAccessed":isUserAgentAccessed,
        "userAgentInfo": userAgentInfo,
        "coockieEnabledStatus": coockieEnabledStatus,
        "plugins": plugins,
        "browserOnlineStatus": browserOnlineStatus,
        "embededCalls" : embededCalls,


      }
      data.push(record);

    }
  }
  finally{
          driver.quit();
      }
      // writting on the CSV file
      converter.json2csv(data, (err, csv) => {
          if (err) {
              throw err;
          }

          // print CSV string
          console.log(csv);
          // write CSV to a file
          fs.writeFileSync('webInfo.csv', csv);
      });
    }
answer();
