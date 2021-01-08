const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const $ = require('cheerio');

const app     = express();


app.get('/snoqualmie', function(req, res){
    // The scraping magic will happen here
    let url = "https://summitatsnoqualmie.com/conditions";

   request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var  snoqSnow24API = $('#conditions_area_d5ec042997234b3797b6799d47bfcadf > div > div > ul > li:nth-child(4) > div:nth-child(2) > ul > li:nth-child(2) > div > span')
                                    .text().trim();
            snoqSnow24API = snoqSnow24API.split("\n");
            snoqSnow24API = snoqSnow24API[0];

           var snoqSnowSeasonAPI = $('#conditions_area_d5ec042997234b3797b6799d47bfcadf > div > div > ul > li:nth-child(4) > div:nth-child(2) > ul > li:nth-child(6) > div > span > span')
                                    .text().trim();
            snoqSnowSeasonAPI.split(" ");
        
        var json = {
            snoqSnow24API :snoqSnow24API,
            snoqSnowSeasonAPI : snoqSnowSeasonAPI
        };
    

        res.send(json);

        }

    });
    

});

app.get('/baker', function(req, res){

    // The scraping magic will happen here
    let url = "https://www.mtbaker.us/snow-report";
 

 
   request(url, function(error, response, html) {
        if (!error) {
        var $ = cheerio.load(html);
         var bakerSnow24API = $('body > div > header > div.c5h-banner-wrap-full.clearfix > div > div:nth-child(2) > div.small-12.medium-12.large-4.columns > div:nth-child(1) > div > div:nth-child(2) > div.report-snowfall-value.report-snowfall-value-24 > span.unit-i')
                                .text().trim();
                                bakerSnow24API = bakerSnow24API.split('″');
                                bakerSnow24API = bakerSnow24API[0];

        var bakerSnowSeasonAPI = $('body > div > header > div.c5h-banner-wrap-full.clearfix > div > div:nth-child(2) > div.small-12.medium-12.large-4.columns > div:nth-child(2) > div > div:nth-child(2) > div > span.unit-i')
                                .text().trim();
                                bakerSnowSeasonAPI = bakerSnowSeasonAPI.split('″');
                                bakerSnowSeasonAPI = bakerSnowSeasonAPI[0];

        
        var json = {
            bakerSnow24API :bakerSnow24API,
            bakerSnowSeasonAPI : bakerSnowSeasonAPI
        };
    

        res.send(json);

        }

    });
});

    app.get('/whitepass', function(req, res){
        // The scraping magic will happen here
        let url = "https://skiwhitepass.com/snow-report";
     
    
     
       request(url, function(error, response, html) {
            if (!error) {
            var $ = cheerio.load(html);
            var whiteSnow24API = $('#maincontent > section.weather-blocks > div > div:nth-child(2) > div > h2:nth-child(5)')
                                    .text().trim();
                                    whiteSnow24API = whiteSnow24API.split("\"");
                                    whiteSnow24API = whiteSnow24API[0];
    
           var whiteSnowSeasonAPI = $('#maincontent > section.weather-blocks > div > div:nth-child(2) > div > h2:nth-child(10)')
                                    .text().trim();
                                    whiteSnowSeasonAPI = whiteSnowSeasonAPI.split('summit');
                                    whiteSnowSeasonAPI = whiteSnowSeasonAPI[1].split('”');
                                    whiteSnowSeasonAPI = whiteSnowSeasonAPI[0];
            
            var json = {
                whiteSnow24API :whiteSnow24API,
                whiteSnowSeasonAPI : whiteSnowSeasonAPI
            };
        
    
            res.send(json);
    
            }
    
        });

});


app.get('/crystal', function(req, res){
    
    const puppeteer = require('puppeteer');
    const $ = require('cheerio');
    // The scraping magic will happen here
   
const url = 'https://www.crystalmountainresort.com/the-mountain/mountain-report-and-webcams#/';

puppeteer
  .launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  })
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
   
      var crystalSnowSeasonAPI= ($('#snowbase-cm-imperial:last',html).text());
      var crystalSnow24API = ($('#main-col > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > div.col.conditions-block > div > p:nth-child(3) > strong',html).text());
      crystalSnow24API = crystalSnow24API.split(".");

      crystalSnow24API = crystalSnow24API[0];

      var json = {
        crystalSnow24API :crystalSnow24API,
        crystalSnowSeasonAPI : crystalSnowSeasonAPI
  
    };


    res.send(json);
    
  })
  .catch(function(err) {
    console.log("Stevens failed");
  });

});

app.get('/stevens', function(req, res){
    
    const puppeteer = require('puppeteer');
    const $ = require('cheerio');
    // The scraping magic will happen here
   
const url = 'https://www.stevenspass.com/the-mountain/mountain-conditions/weather-report.aspx';

puppeteer
  .launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  })
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
   
      var stevenSnowSeasonAPI= ($('#snow_report_1 > div.snow_report__content.row > ul > li:nth-child(6) > div > h5',html).text());
      stevenSnowSeasonAPI = stevenSnowSeasonAPI.split("in");
      stevenSnowSeasonAPI = stevenSnowSeasonAPI[0];
      var stevenSnow24API = ($('#snow_report_1 > div.snow_report__content.row > ul > li:nth-child(3) > div > h5',html).text());
      stevenSnow24API = stevenSnowSeasonAPI.split("in");
      stevenSnow24API = stevenSnowSeasonAPI[0];



      var json = {
        stevenSnow24API :stevenSnow24API,
        stevenSnowSeasonAPI : stevenSnowSeasonAPI
  
    };


    res.send(json);
    
  })
  .catch(function(err) {
    console.log("Stevens failed");
  });

});

app.listen((process.env.PORT));
console.log('API is running on http://localhost:5000');
module.exports = app;
