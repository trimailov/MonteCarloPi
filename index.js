var inCircle = 0;
var outCircle = 0;

var cycleStep = 500;
var cycles = 100000;

var h = 400,
    w = 400,
    r = 1;

var vis = d3.select("svg");
var piResult = d3.select("#pi-result");
var count = d3.select("#cycle");
var accuracy = d3.select("#accuracy");

var svg = document.getElementsByTagName("svg")[0];

vis.attr("width", w)
    .attr("height", h);

var showPi = function() {
  // random coordinates from -1 to 1
  var x = Math.random() * 2 - 1;
  var y = Math.random() * 2 - 1;

  var cx = (x * w/2) + w/2;
  var cy = (y * h/2) + h/2;
  var vectorLength = Math.sqrt(x * x + y * y);

  var circle = vis.append("circle")
        .attr("cx", cx)
        .attr("cy", cy)
        .attr("r", r);

  if (vectorLength <= 1) {
    inCircle += 1;

    circle.attr("fill", "red")
          .attr("class", "red");
  } else {
    outCircle += 1;

    circle.attr("fill", "blue")
          .attr("class", "blue");
  }

  var cycle = inCircle + outCircle;
  var pi = ((inCircle / cycle) * 4);
  var error = Math.abs(1 - (Math.PI / pi)) * 100;
  piResult.text("Pi: " + pi.toFixed(6));
  count.text("Cycle: " + cycle);
  accuracy.text("Error: " + error.toFixed(6) + "%");

  if (cycle >= cycles) {
    clearInterval(interval);
  }

};

var multiShowPi = function() {
  for (var i=0; i<cycleStep; i++) {
    showPi();
  }
};
var interval = setInterval(multiShowPi, 1);
