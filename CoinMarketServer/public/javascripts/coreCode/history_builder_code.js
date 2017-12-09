'use strict';
var request = require('request');
var Correlation = require('node-correlation');

//var localStorage = require('localStorage')
var fs = require('fs');
var y = 197;

function processFile(data){
//    console.log(data);
    fs.writeFile('hist_data.json', JSON.stringify(data), function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

function grabber(){
    request({
            url: "https://api.coinmarketcap.com/v1/ticker/",
            method: "GET",
            timeout: 100000,
            followRedirect: true,
            maxRedirects: 10
        },function(error, response, body){
            if(!error && response.statusCode == 200){
                let data1 = JSON.parse(response.body);
                fs.readFile('hist_data.json', (err, data) => {
                    if (err) throw err;
                
                    let hd = JSON.parse(data);
                    for (var i in data1){
//                            console.log(data1[i].name, data1[i].price_usd);
                        for (var j in hd){
                            if (data1[i].name == hd[j].Currency){
                                hd[j].Price.push(data1[i].price_usd);
                                break;
                            }
                        }
                        if ((j == hd.length)&&(data1[i].name != hd[j].Currency)){
                            hd.push({
                                'Currency':data1[i].name,
                                'Price' : [data1[i].price_usd]
                            });
                        }
                    }
                    processFile(hd);
                });
                
            }
            else{
                console.log('error' + response.statusCode);
            }
        });
    }

setInterval(grabber, 5000);

/*// Set some global variable for data analysis
var dataPoints = [];
var dataPoints_desired = [];
var timeAxis = [];
var corr_array = [];
var corr_master = [];
var obj;

function correlationSetup(data){
    // get data
    fs.readFile('hist_data.json', (err, datavar) => {
        if (err) throw err;
    
        let data = JSON.parse(datavar);
        for (var outer_loop = 0; outer_loop < 10; outer_loop++){
            for (var inner_loop = 0; inner_loop < 10; inner_loop++){
                var count = 0;
                for (var i = data[outer_loop].Price.length-500; i < data[outer_loop].Price.length; i++) {
                    dataPoints.push(Number(data[outer_loop].Price[i]));
                    dataPoints_desired.push(Number(data[inner_loop].Price[i]));
                    timeAxis.push(count++);
                    if (count == 500){
                        i = data[outer_loop].Price.length;
                    }
                }
                corr_array.push(Correlation.calc(dataPoints, dataPoints_desired));
                console.log(Correlation.calc(dataPoints, dataPoints_desired));
            }
            corr_master.push(corr_array);
        }
        console.log(corr_master);
    });
}

setInterval(correlationSetup, 60000);*/

