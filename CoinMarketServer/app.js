var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// Set our port
var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
  res.json({ message: 'API testing successful ' });
});

/*
 * Main API resosurce to serve the history_builder_code_start.js code
 */
var historyBuilder = require('./public/javascripts/coreCode/history_builder_code_start.js');
router.route('/historyBuilder').get(function (req, res) {
  res.set({
    "Access-Control-Allow-Origin": "*"
  });
  var coinBase = req.query.coinBase; // $_GET["coinBase"]
  var coinCompareTo = req.query.coinCompareTo; // $_GET["coinCompareTo"]
  var allData = historyBuilder.getData();
  if(coinBase !== undefined && coinCompareTo !== undefined) {
    if(coinBase.length > 0 && coinCompareTo .length > 0) {
      var retData = {base: {}, comparedTo: {}};
      allData.forEach(function (item) {
        switch (coinBase) {
          case 'btc':
            if (item.Currency === "Bitcoin") {
              retData.base = item;
            }
            break;
          case 'eth':
            if (item.Currency === "Ethereum") {
              retData.base = item;
            }
            break;
          case 'ltc':
            if (item.Currency === "Litecoin") {
              retData.base = item;
            }
            break;
        }
        switch (coinCompareTo) {
          case 'btc':
            if (item.Currency === "Bitcoin") {
              retData.comparedTo = item;
            }
            break;
          case 'eth':
            if (item.Currency === "Ethereum") {
              retData.comparedTo = item;
            }
            break;
          case 'ltc':
            if (item.Currency === "Litecoin") {
              retData.comparedTo = item;
            }
            break;
        }
      });
      res.json(retData);
    } else {
      res.json(allData);
    }
  } else {
    res.json(allData);
  }
});

/*
 * Main API resosurce to serve the correlation_code.js code
 */

//var corr_matrix = require('./public/javascripts/coreCode/correlation_code.js');
router.route('/correlationCode').get(function (req, res) {
  res.set({
    "Access-Control-Allow-Origin": "*"
  });
  //corr_matrix.getData();
  var fs = require('fs');
  var myData = fs.readFileSync('./public/javascripts/coreCode/corrData.json');
  //var Buffer = require('buffer/').Buffer;
  //let myArrayDataOriginal = Buffer.from(JSON.parse(myData).data);
  res.json(myData.toString('utf8'));
  console.log(myData.toString('utf8'));
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Coin Market Web Server is running on port ' + port);

module.exports = app;