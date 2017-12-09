'use strict';
var request = require('request');
var Correlation = require('node-correlation');

var fs = require('fs');
// Set some global variable for data analysis
var dataPoints = [];
var dataPoints_desired = [];
var timeAxis = [];
var corr_array = [];
var corr_master = [];
var obj;
var runs = 500;
var numCrypto = 30;

/* function correlationSetup(cb){
    // get data
    fs.readFile('./hist_data.json', (err, datavar) => {  
        if (err) throw err;
        //console.log("datavar", datavar);
        let data = JSON.parse(datavar);
        //console.log("data", data);
        for (var outer_loop = 0; outer_loop <= 10; outer_loop++){
            for (var inner_loop = 0; inner_loop <= 10; inner_loop++){
                var count = 0;
                for (var i = data[outer_loop].Price.length-runs; i < data[outer_loop].Price.length; i++) {
                    dataPoints.push(Number(data[outer_loop].Price[i]));
                    //console.log("outer",outer_loop, data[outer_loop].Price[i]);
                    dataPoints_desired.push(Number(data[inner_loop].Price[i]));
                    //console.log("inner", inner_loop, data[inner_loop].Price[i]);
                    timeAxis.push(count++);
                    if (count == runs){
                        i = data[outer_loop].Price.length;
                    }
                }
                corr_array.push(Correlation.calc(dataPoints, dataPoints_desired));
                //console.log(corr_array);
                dataPoints = [];
                dataPoints_desired = [];
            }
            corr_master.push(corr_array);
            corr_array = [];
        }
        
        cb(corr_master);        
    });    
} */

function correlationSetup(){
    // get data
var dataVar = fs.readFileSync('./hist_data.json');
var currency_array = [];

    
    //console.log("datavar", datavar);
    let data = JSON.parse(dataVar);
    //console.log("data", data);
    for (var outer_loop = 0; outer_loop <= numCrypto; outer_loop++){
        for (var inner_loop = 0; inner_loop <= numCrypto; inner_loop++){
            var count = 0;
            for (var i = data[outer_loop].Price.length-runs; i < data[outer_loop].Price.length; i++) {
                dataPoints.push(Number(data[outer_loop].Price[i]));
                //console.log("outer",outer_loop, data[outer_loop].Price[i]);
                dataPoints_desired.push(Number(data[inner_loop].Price[i]));
                //console.log("inner", inner_loop, data[inner_loop].Price[i]);
                timeAxis.push(count++);
                if (count == runs){
                    i = data[outer_loop].Price.length;
                }
            }
            if (outer_loop == 0){
                currency_array.push(data[inner_loop].Currency);    
            }

            corr_array.push(Correlation.calc(dataPoints, dataPoints_desired));
            //console.log(corr_array);
            dataPoints = [];
            dataPoints_desired = [];
        }
        if (outer_loop ==0){
            corr_master.push(currency_array);
        }
        corr_master.push(corr_array);
        corr_array = [];
    }
    fs.writeFileSync('./corrData.json', JSON.stringify(corr_master));
    //    return corr_master;
}


setInterval(correlationSetup, 300000);
/*function compare_btn() {

    correlationSetup();
    $("#compare_btn").text(corr_master);
  }*/
  /*
  correlationSetup(function(data){
    console.log(corr_master);
  });
  */
correlationSetup();
