'use strict';
const slr = require('ml-regression').SLR;
//const slr = require('ml-regression').PolynomialRegression;
//const mlr = require('ml-regression').MultivariateLinearRegression;
//var Correlation = require('node-correlation');

var fs = require('fs');
var regression_eq;
var regression_eq2;
var ip_count = 0;
var op_count = 0;
var t_count = 0;
var input_var = [];
var output_var = [];
var input_var_comb =[];
var cFlag1 = 1;
var cFlag2 = 1;
var mlrFlag = 0;

function regression_setup(){
    fs.readFile('hist_data.json', (err, data) => {  
        if (err) throw err;
    
        let hd = JSON.parse(data);

        for (var j in hd){
            switch(hd[j].Currency){
 /*               case "Bitcoin":
                    {
                        input_var = hd[j].Price.map(parseFloat);
                        //input_var.push(hd[j].Price.map(parseFloat));
                        ip_count++;
                        break;
                    } */   
                case "Ethereum":
                    {
                        input_var = hd[j].Price.map(parseFloat);
                        //input_var.push(hd[j].Price.map(parseFloat));
                        ip_count++;
                        break;
                    }
            }
            if ((ip_count == 2)&&(cFlag1)&&(mlrFlag)){     // use ip_count = 2 if adding ethereum
                cFlag1 = 0;
                reshape_input(input_var);
            }
            if ((ip_count)&&(!mlrFlag)){
                t_count = 1;
            }
            
            if (hd[j].Currency == "Ripple"){
                output_var = hd[j].Price.map(parseFloat);
                op_count++;
            } 

            if ((t_count == 1)&&(op_count)&&(ip_count)&&(cFlag2)) {
                cFlag2 = 0;
                regression_analyze(input_var, output_var);      //for SLR
                //regression_analyze(input_var_comb, output_var); // for MLR
                ip_count = 0;
                op_count = 0;
                t_count = 0;
            }
        }
    });
}

function regression_analyze(input_var, output_var){
    console.log(input_var);
    console.log(output_var);

    regression_eq = new slr(input_var, output_var, 4);
    //regression_eq2 = new mlr(input_var, output_var);
    console.log(regression_eq);
    //console.log(regression_eq.predict(310));
}

function reshape_input(input_var){
    var loop_var;

    for (loop_var in input_var[0]){
        input_var_comb.push([input_var[0][loop_var],input_var[1][loop_var]]);
    }
    if (loop_var == input_var[0].length-1){
        console.log(input_var_comb);
        t_count = 1;
    }
}
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

var coins = {
    base: "",
    compareTo: ""
  };
  
  function dropdwon_1_Action() {
    document.getElementById("Dropdown_1_div").classList.toggle("show");
  }
  
  function HandleBitcoin_1() {
    //console.log("BTC 1 clicked");
    $("#selection_1").text("Bitcoin");
    //coins.base = "btc";
  }
  function HandleEthereal_1() {
    $("#selection_1").text("Ethereum");
    //coins.base = "eth";
  }
  function HandleLitecoin_1() {
    $("#selection_1").text("Litecoin");
    //coins.base = "ltc";
  }
  
  ////////////////////
  function dropdwon_2_Action() {
    document.getElementById("Dropdown_2_div").classList.toggle("show");
  }
  function HandleBitcoin_2() {
    $("#selection_2").text("Bitcoin");
    //coins.compareTo = "btc";
  }
  function HandleEthereal_2() {
    $("#selection_2").text("Ethereum");
    //coins.compareTo = "eth";
  }
  function HandleLitecoin_2() {
    $("#selection_2").text("Litecoin");
    //coins.compareTo = "ltc";
  }

  

regression_setup();
