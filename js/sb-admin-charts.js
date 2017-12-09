// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

//var Correlation = require('node-correlation');
//var gulp_excel = require('gulp-excel2html');

// Set some global variable for data analysis
var y = 0;
var dataPoints = [];
var dataPoints_desired = [];
var timeAxis = [];
var obj;

// get data
function addData(data) {
  var count = 0;
  console.log(data[0].Price.length);
	for (var i = data[0].Price.length-500; i < data[0].Price.length; i++) {
        dataPoints.push(Number(data[0].Price[i]));
        dataPoints_desired.push(Number(data[1].Price[i]));
        timeAxis.push(count++);
        if (count == 500){
          i = data[0].Price.length;
        }
    }
    
    console.log(dataPoints);
    console.log(dataPoints_desired);
}
$.ajaxSetup({
  async: false
});

// Your $.getJSON() request is now synchronous...
$.getJSON("../CoinMarketServer/public/javascripts/coreCode/hist_data.json", addData);

// Set the global configs back to asynchronous 
$.ajaxSetup({
  async: true
});


// -- Area Chart Example
var ctx = document.getElementById("myAreaChart1");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: timeAxis,
    datasets: [{
      //label: "Sessions",
      lineTension: 0.1,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 1,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 1,
      data: dataPoints,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'second'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          //min: 0,
          //max: 20000,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

// -- Area Chart Example
var ctx2 = document.getElementById("myAreaChart2");
var myLineChart2 = new Chart(ctx2, {
  type: 'line',
  data: {
    labels: timeAxis,
    datasets: [{
      //label: "Sessions",
      lineTension: 0.1,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 1,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 1,
      data: dataPoints_desired,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'second'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          //min: 0,
          //max: 20000,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

// -- Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [{
      label: "Revenue",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: [4215, 5312, 6251, 7841, 9821, 14984],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 15000,
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});
// -- Pie Chart Example
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Blue", "Red", "Yellow", "Green"],
    datasets: [{
      data: [12.21, 15.58, 11.25, 8.32],
      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745'],
    }],
  },
});
