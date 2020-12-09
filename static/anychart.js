function myFunction() {
    var x = document.getElementById("year-select").value;
    document.getElementById("demo").innerHTML = "You selected: " + x;

    // Clear map container
    document.getElementById("container").innerHTML = ""; 
     

    //#container-map.html("");
    // load the data
    anychart.data.loadJsonFile(`/data/${x}`, function (data) {
        console.log(data)

        // Variable to hold the data
        var geoData = data

        // // create a new array with the resulting data
        var data = [];

        // Go through the initial data
        for (var i = 0; i < geoData.length; i++) {

            // insert the resulting data in the array using the AnyChart keywords 
            data.push({ id: geoData[i].ISO2, value: geoData[i].Happiness_Score, title: geoData[i].Country })

        };

        console.log(data)

        // connect the data with the map
        var chart = anychart.map(data);

        chart.geoData(anychart.maps.world);

        // specify the chart type and set the series 
        var series = chart.choropleth(data);

        // set the chart title
        chart.title("Happiness Score by Country");

        // color scale ranges
        ocs = anychart.scales.ordinalColor([
            { less: 3.999 },
            { from: 4, to: 4.499 },
            { from: 4.5, to: 4.999 },
            { from: 5, to: 5.499 },
            { from: 5.50, to: 5.999 },
            { from: 6, to: 6.499 },
            { from: 6.50, to: 6.999 },
            { greater: 7 }
        ]);

        // set scale colors
        ocs.colors(["rgb(255, 0, 0)", "	rgb(255, 128, 0)", "rgb(255,255,0)", "rgb(0,255,0)", "rgb(0,255,255)", "rgb(0,128,255)", "rgb(0,0,255)", "rgb(128,0,255)"]);

        // tell the series what to use as a colorRange (colorScale)
        series.colorScale(ocs);

        // enable the legend
        chart.legend(true);

        // set the source mode of the legend and add styles
        chart.legend()
            .itemsSourceMode("categories")
            .position('right')
            .align('top')
            .itemsLayout('vertical')
            .padding(50, 0, 0, 20)
            .paginator(false);
            

        // set the container id
        chart.container('container');

        // draw the chart
        chart.draw();
    });




//SCATTER CODE**********************************************************



    // var svgWidth = 960;
    // var svgHeight = 500;
    
    // var margin = {
    //   top: 20,
    //   right: 40,
    //   bottom: 80,
    //   left: 100
    // };
    
    // var width = svgWidth - margin.left - margin.right;
    // var height = svgHeight - margin.top - margin.bottom;
    
    // // Create an SVG wrapper, append an SVG group that will hold our chart,
    // // and shift the latter by left and top margins.
    // var svg = d3
    //   .select(".chart")
    //   .append("svg")
    //   .attr("width", svgWidth)
    //   .attr("height", svgHeight);
    
    // // Append an SVG group
    // var chartGroup = svg.append("g")
    //   .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // // Initial Params
    // var chosenXAxis = "GDP";
    
    // // function used for updating x-scale var upon click on axis label
    // function xScale(hairData, chosenXAxis) {
    //   // create scales
    //   var xLinearScale = d3.scaleLinear()
    //     .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
    //       d3.max(hairData, d => d[chosenXAxis]) * 1.2
    //     ])
    //     .range([0, width]);
    
    //   return xLinearScale;
    
    // }
    
    // // function used for updating xAxis var upon click on axis label
    // function renderAxes(newXScale, xAxis) {
    //   var bottomAxis = d3.axisBottom(newXScale);
    
    //   xAxis.transition()
    //     .duration(1000)
    //     .call(bottomAxis);
    
    //   return xAxis;
    // }
    
    // // function used for updating circles group with a transition to
    // // new circles
    // function renderCircles(circlesGroup, newXScale, chosenXAxis) {
    
    //   circlesGroup.transition()
    //     .duration(1000)
    //     .attr("cx", d => newXScale(d[chosenXAxis]));
    
    //   return circlesGroup;
    // }
    
    // // function used for updating circles group with new tooltip
    // function updateToolTip(chosenXAxis, circlesGroup) {
    
    //   var label;
    
    //   if (chosenXAxis === "GDP") {
    //     label = "GDP:";
    //   }
    //   else {
    //     label = "# of Albums:";
    //   }
    
    //   var toolTip = d3.tip()
    //     .attr("class", "tooltip")
    //     .offset([80, -60])
    //     .html(function(d) {
    //       return (`${d.Country}<br>${label} ${d[chosenXAxis]}`);
    //     });
    
    //   circlesGroup.call(toolTip);
    
    //   circlesGroup.on("mouseover", function(data) {
    //     toolTip.show(data);
    //   })
    //     // onmouseout event
    //     .on("mouseout", function(data, index) {
    //       toolTip.hide(data);
    //     });
    
    //   return circlesGroup;
    // }
    
    // // Retrieve data from the CSV file and execute everything below
    // // d3.json("/data").then(function(err, hairData) { 
    // // d3.csv("hairData.csv").then(function(hairData, err) {
    // //  if (err) throw err;
    // //    console.log(hairData);
    
    
    // hairData = geoData
    //   // parse data
    //   hairData.forEach(function(data) {
    //     data.GDP = +data.GDP;
    //     data.Score = +data.Score;
    //     data.Life_Exp = +data.Life_Exp;
    //   });
    
    //   // xLinearScale function above csv import
    //   var xLinearScale = xScale(hairData, chosenXAxis);
    
    //   // Create y scale function
    //   var yLinearScale = d3.scaleLinear()
    //     .domain([0, d3.max(hairData, d => d.Score)])
    //     .range([height, 0]);
    
    //   // Create initial axis functions
    //   var bottomAxis = d3.axisBottom(xLinearScale);
    //   var leftAxis = d3.axisLeft(yLinearScale);
    
    //   // append x axis
    //   var xAxis = chartGroup.append("g")
    //     .classed("x-axis", true)
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(bottomAxis);
    
    //   // append y axis
    //   chartGroup.append("g")
    //     .call(leftAxis);
    
    //   // append initial circles
    //   var circlesGroup = chartGroup.selectAll("circle")
    //     .data(hairData)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", d => xLinearScale(d[chosenXAxis]))
    //     .attr("cy", d => yLinearScale(d.Score))
    //     .attr("r", 20)
    //     .attr("fill", "pink")
    //     .attr("opacity", ".5");
    
    //   // Create group for two x-axis labels
    //   var labelsGroup = chartGroup.append("g")
    //     .attr("transform", `translate(${width / 2}, ${height + 20})`);
    
    //   var hairLengthLabel = labelsGroup.append("text")
    //     .attr("x", 0)
    //     .attr("y", 20)
    //     .attr("value", "GDP") // value to grab for event listener
    //     .classed("active", true)
    //     .text("Hair Metal Ban Hair Length (inches)");
    
    //   var albumsLabel = labelsGroup.append("text")
    //     .attr("x", 0)
    //     .attr("y", 40)
    //     .attr("value", "Life_Exp") // value to grab for event listener
    //     .classed("inactive", true)
    //     .text("# of Albums Released");
    
    //   // append y axis
    //   chartGroup.append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 0 - margin.left)
    //     .attr("x", 0 - (height / 2))
    //     .attr("dy", "1em")
    //     .classed("axis-text", true)
    //     .text("Number of Billboard 500 Hits");
    
    //   // updateToolTip function above csv import
    //   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
    
    //   // x axis labels event listener
    //   labelsGroup.selectAll("text")
    //     .on("click", function() {
    //       // get value of selection
    //       var value = d3.select(this).attr("value");
    //       if (value !== chosenXAxis) {
    
    //         // replaces chosenXAxis with value
    //         chosenXAxis = value;
    
    //         // console.log(chosenXAxis)
    
    //         // functions here found above csv import
    //         // updates x scale for new data
    //         xLinearScale = xScale(hairData, chosenXAxis);
    
    //         // updates x axis with transition
    //         xAxis = renderAxes(xLinearScale, xAxis);
    
    //         // updates circles with new x values
    //         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
    
    //         // updates tooltips with new info
    //         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
    
    //         // changes classes to change bold text
    //         if (chosenXAxis === "Life_Exp") {
    //           albumsLabel
    //             .classed("active", true)
    //             .classed("inactive", false);
    //           hairLengthLabel
    //             .classed("active", false)
    //             .classed("inactive", true);
    //         }
    //         else {
    //           albumsLabel
    //             .classed("active", false)
    //             .classed("inactive", true);
    //           hairLengthLabel
    //             .classed("active", true)
    //             .classed("inactive", false);
    //         }
    //       }
    //     });
    // // }).catch(function(error) {
    // //   console.log(error);




    anychart.onDocumentReady(function () {
      var year_select = document.getElementById('year-select');
    
      var data = {
        '2018': [
          {x: 1.7, value: 55},
          {x: 2.3, value: 50},
          {x: 2.6, value: 76},
          {x: 2.7, value: 64},
          {x: 4, value: 71},
          {x: 4, value: 88},
          {x: 4.5, value: 74},
          {x: 4.9, value: 83}
        ],
        '2019': [
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
      var value = year_select.value;
      series.data(data[value]);
      chart.xAxis().title(value);
    
      // enable major grids
      chart.xGrid().enabled(true);
      chart.yGrid().enabled(true);
    
      // enable minor grids
      chart.xMinorGrid().enabled(true);
      chart.yMinorGrid().enabled(true);
    
      // set the container id
      chart.container("container2").draw();
    
      year-select.addEventListener('change', function(e) {
        value = year_select.value;
        series.data(data[value]);
        chart.xAxis().title(value);
      });
    });




    };