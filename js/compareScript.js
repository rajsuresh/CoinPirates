var coinBase = "";
var coinCompareTo = "";

// https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function display() {
  $.ajax({
    url: "http://localhost:8080/api/historyBuilder?coinBase=" + coinBase + "&&coinCompareTo=" + coinCompareTo,
    type: "GET",
    success: function(data){
      alert("Success called");
      $("#resultsArea").text(JSON.stringify(data));
    }
  });
}

window.onload = function() {
  coinBase = getParameterByName("coinBase");
  coinCompareTo = getParameterByName("coinCompareTo");
  console.log("Coin Base: " + coinBase + " and Coin Compare To: " + coinCompareTo);
  display();
};