anychart.onDocumentReady(function () {
  var menu = document.getElementById('menu');

  var data = {
    'Age': [
      {x: 1.7, value: 55},
      {x: 2.3, value: 50},
      {x: 2.6, value: 76},
      {x: 2.7, value: 64},
      {x: 4, value: 71},
      {x: 4, value: 88},
      {x: 4.5, value: 74},
      {x: 4.9, value: 83}
    ],
    'Income': [
      {x: 1.5, value: 33},
      {x: 2.4, value: 43},
      {x: 2.6, value: 56},
      {x: 2.7, value: 76},
      {x: 4.1, value: 82},
      {x: 4.2, value: 56},
      {x: 4.3, value: 32},
      {x: 5, value: 56}
    ]
  };

  // create a chart
  var chart = anychart.scatter();

  // create a marker series and set the data
  var series = chart.marker();

  // set initial data and xAxis title
  var value = menu.value;
  series.data(data[value]);
  chart.xAxis().title(value);

  // enable major grids
  chart.xGrid().enabled(true);
  chart.yGrid().enabled(true);

  // enable minor grids
  chart.xMinorGrid().enabled(true);
  chart.yMinorGrid().enabled(true);

  // set the container id
  chart.container("container").draw();

  menu.addEventListener('change', function(e) {
    value = menu.value;
    series.data(data[value]);
    chart.xAxis().title(value);
  });
});
