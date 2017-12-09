'use strict';
var request = require('request');
var jacksonParser = require('jackson-parser')
//var localStorage = require('localStorage')
var fs = require('fs');
var chalk = require('chalk');
var extractText;
var currency_table = [];
var y = 197;
var hist_data = [];
var hd = [];
var globalFlag = 1;

var request = request({
        url: "https://api.coinmarketcap.com/v1/ticker/",
        method: "GET",
        timeout: 100000,
        followRedirect: true,
        maxRedirects: 10
    },function(error, response, body){
        if(!error && response.statusCode == 200){
            //console.log('sucess!' + response.body);
            let data1 = JSON.parse(response.body);
            for (var i in data1){
                hist_data.push({ 
                    'Currency':data1[i].name,
                    'Price' : [data1[i].price_usd]  
                });
            }
            console.log(hist_data);
            fs.writeFile('hist_data_1.json', JSON.stringify(hist_data), function(err) {
                if(err) {
                    return console.log(err);
                }
            });           
        }
        else{
            console.log('error' + response.statusCode);
        }
    });


var getHistData = function() {
  return hist_data;
};


exports.getData = getHistData;