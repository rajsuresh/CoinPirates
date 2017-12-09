'use strict';
var scraperWeb = require("scraper-web");
var chalk = require('chalk');
var extractText;
var currency_table = [];
var y = 142;

scraperWeb("https://coinmarketcap.com/", function (response) {
    extractText = response;
	console.log(chalk.blue(response));
	const shape = require('shape-array');
	const personify = shape.scheme(['index', 'name', 'currency.market_cap', 'currency.Price', 'currency.Volume_24h', 'currency.circulating_supply', 'currency.Change_24h']);

    for (var i in extractText) {
		if (extractText[i] == 'BTC'){
			console.log(extractText[i], i);
		}
	}

	while (y < extractText.length) {
		let data = [extractText[y], extractText[y+2]];
		//check if the next entry in array is a number, else move ahead by 1
		if (isNaN(extractText[y+3])||(extractText[y+3]=='')){
			y++;
		}
		//convert price from string to decimals
		if (extractText[y+4].charAt(1) == '0'){
			extractText[y+4] = extractText[y+4]/(10^(extractText[y+4].length));
		}
		else{
			extractText[y+4]=extractText[y+4]/100;
		}
		data.push(extractText[y+3], extractText[y+4], extractText[y+5], extractText[y+6]);
		//check if the next entry in array is a number, else move ahead by 1
		if (isNaN(extractText[y+8])||(extractText[y+8]=='')){
			y++;
		}
		data.push(extractText[y+8]/100);
		currency_table.push(personify(data));
		y+=9;
		if (extractText[y] - 1 != data[0]){
			break;
		}
	}
	currency_table.forEach(function(element) {
		console.log(element);
	}, this);
	
});
