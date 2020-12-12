function myFunction() {
  var x = document.getElementById("year-select").value;
  // document.getElementById("demo").innerHTML = "You selected: " + x;


   
  




//SCATTER CODE**********************************************************

// Clear scatter container
//chartGroup.remove()
// document.getElementById("scatter").innerHTML = "";

  var svgWidth = 960;
  var svgHeight = 500;
  
  var margin = {
    top: 20,
    right: 40,
    bottom: 150,
    left: 100
  };
  
  var width = svgWidth - margin.left - margin.right;
  var height = svgHeight - margin.top - margin.bottom;
  
  // Clear graph by removing the svg
  d3.selectAll("svg").remove()

  // Create an SVG wrapper, append an SVG group that will hold our chart,
  // and shift the latter by left and top margins.
  var svg = d3
    .select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);
  
  // Append an SVG group
  var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
  // Initial Params
  var chosenXAxis = "GDP";
  
  // function used for updating x-scale var upon click on axis label
  function xScale(hairData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(hairData, d => d[chosenXAxis]) * 0.8,
        d3.max(hairData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  }
  
  // function used for updating xAxis var upon click on axis label
  function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }
  
  // function used for updating circles group with a transition to
  // new circles
  function renderCircles(circlesGroup, newXScale, chosenXAxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]));
  
    return circlesGroup;
  }
  
  // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, circlesGroup) {
  
    var label;
  
    if (chosenXAxis === "GDP") {
      label = "GDP:";
    }
    else if (chosenXAxis === "Life_Exp") {
      label = "Life_Exp:";
    }
    else if (chosenXAxis === "Social_Support") {
      label = "Social_Support:";
    }
    else if (chosenXAxis === "Freedom_Choices") {
      label = "Freedom_Choices:";
    }
    else if (chosenXAxis === "Generosity") {
      label = "Generosity:";
    }
    else {
      label = "Corruption:";
    }
  
    //Trying to format the d[chosenXAxis]
    const formater =  d3.format(".2f")
    
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        // return (`${d.Country}<br>${"Happiness Score:"} ${d.Happiness_Score}<br>${label} ${d[chosenXAxis]}`);
        // return (`${d.Country}<br>${"Happiness Score:"} ${d.Happiness_Score.toFixed(2)}<br>${label} ${d[chosenXAxis]}`);
        return (`${d.Country}<br>${"Happiness Score:"} ${d3.format(".2f") (d.Happiness_Score)}<br>${label} ${d3.format(".2f")(d[chosenXAxis])}`);
      });
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });
  
    return circlesGroup;
  }
  
  // Retrieve data from the CSV file and execute everything below
  d3.json(`/data/${x}`, function(err, hairData) { 
  // d3.csv("hairData.csv").then(function(hairData, err) {
    if (err) throw err;
    console.log(hairData);
  
  
  //hairData = geoData
    // parse data
    hairData.forEach(function(data) {
      data.GDP = +data.GDP;
      data.Happiness_Score = +data.Happiness_Score;
      data.Life_Exp = +(data['Life Expectancy']);
      data.Social_Support = +(data['Social Support']);
      data.Freedom_Choices = +(data['Freedom to Make Choices']);
      data.Generosity = +(data['Generosity']);
      data.Corruption = +(data['Corruption Perception']);
    });
  
    // xLinearScale function above csv impocrt
    var xLinearScale = xScale(hairData, chosenXAxis);
  
    // Create y scale function
    var yLinearScale = d3.scaleLinear()
      .domain([0, 8])
      .range([height, 0]);
  
    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // append x axis
    var xAxis = chartGroup.append("g")
      .classed("x-axis", true)
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    // append y axis
    chartGroup.append("g")
      .call(leftAxis);
  
    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
      .data(hairData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d[chosenXAxis]))
      .attr("cy", d => yLinearScale(d.Happiness_Score))
      .attr("r", 10)
      .attr("stroke", "#800080")
      .attr("stroke-width", 3)
      .attr("fill", "#00FFFF")
      .attr("opacity", ".8");
  
    // Create group for six x-axis labels
    var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${width / 2}, ${height + 20})`);
  
    var GDP_Label = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 20)
      .attr("value", "GDP") // value to grab for event listener
      .classed("active", true)
      .text("GDP per Capita Score");
  
    var LifeExp_Label = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 40)
      .attr("value", "Life_Exp") // value to grab for event listener
      .classed("inactive", true)
      .text("Life Expectancy Score");

    var SocialSupport_Label = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 60)
      .attr("value", "Social_Support") // value to grab for event listener
      .classed("inactive", true)
      .text("Social Support Score");

    var Freedom_Label = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 80)
      .attr("value", "Freedom_Choices") // value to grab for event listener
      .classed("inactive", true)
      .text("Freedom to Make Choices Score");

    var Generosity_Label = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 100)
      .attr("value", "Generosity") // value to grab for event listener
      .classed("inactive", true)
      .text("Generosity Score");

    var Corruption_Label = labelsGroup.append("text")
      .attr("x", 0)
      .attr("y", 120)
      .attr("value", "Corruption") // value to grab for event listener
      .classed("inactive", true)
      .text("Perception of Corruption Score");
  
    // append y axis
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .classed("axis-text", true)
      .text("Happiness Score");
  
    // updateToolTip function above csv import
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
    // x axis labels event listener
    labelsGroup.selectAll("text")
      .on("click", function() {
        // get value of selection
        var value = d3.select(this).attr("value");
        if (value !== chosenXAxis) {
  
          // replaces chosenXAxis with value
          chosenXAxis = value;
  
          // console.log(chosenXAxis)
  
          // functions here found above csv import
          // updates x scale for new data
          xLinearScale = xScale(hairData, chosenXAxis);
  
          // updates x axis with transition
          xAxis = renderAxes(xLinearScale, xAxis);
  
          // updates circles with new x values
          circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);
  
          // updates tooltips with new info
          circlesGroup = updateToolTip(chosenXAxis, circlesGroup);
  
          // changes classes to change bold text
          if (chosenXAxis === "Life_Exp") {
            LifeExp_Label
              .classed("active", true)
              .classed("inactive", false);
            GDP_Label
              .classed("active", false)
              .classed("inactive", true);
            SocialSupport_Label
              .classed("active", false)
              .classed("inactive", true);
            Freedom_Label
              .classed("active", false)
              .classed("inactive", true);
            Generosity_Label
              .classed("active", false)
              .classed("inactive", true);
            Corruption_Label
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "GDP") {
            LifeExp_Label
              .classed("active", false)
              .classed("inactive", true);
            GDP_Label
              .classed("active", true)
              .classed("inactive", false);
            SocialSupport_Label
              .classed("active", false)
              .classed("inactive", true);
            Freedom_Label
              .classed("active", false)
              .classed("inactive", true);
            Generosity_Label
              .classed("active", false)
              .classed("inactive", true);
            Corruption_Label
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "Social_Support") {
            LifeExp_Label
              .classed("active", false)
              .classed("inactive", true);
            GDP_Label
              .classed("active", false)
              .classed("inactive", true);
            SocialSupport_Label
              .classed("active", true)
              .classed("inactive", false);
            Freedom_Label
              .classed("active", false)
              .classed("inactive", true);
            Generosity_Label
              .classed("active", false)
              .classed("inactive", true);
            Corruption_Label
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "Freedom_Choices") {
            LifeExp_Label
              .classed("active", false)
              .classed("inactive", true);
            GDP_Label
              .classed("active", false)
              .classed("inactive", true);
            SocialSupport_Label
              .classed("active", false)
              .classed("inactive", true);
            Freedom_Label
              .classed("active", true)
              .classed("inactive", false);
            Generosity_Label
              .classed("active", false)
              .classed("inactive", true);
            Corruption_Label
              .classed("active", false)
              .classed("inactive", true);
          }
          else if (chosenXAxis === "Generosity") {
            LifeExp_Label
              .classed("active", false)
              .classed("inactive", true);
            GDP_Label
              .classed("active", false)
              .classed("inactive", true);
            SocialSupport_Label
              .classed("active", false)
              .classed("inactive", true);
            Freedom_Label
              .classed("active", false)
              .classed("inactive", true);
            Generosity_Label
              .classed("active", true)
              .classed("inactive", false);
            Corruption_Label
              .classed("active", false)
              .classed("inactive", true);
          }
          else {
            LifeExp_Label
              .classed("active", false)
              .classed("inactive", true);
            GDP_Label
              .classed("active", false)
              .classed("inactive", true);
            SocialSupport_Label
              .classed("active", false)
              .classed("inactive", true);
            Freedom_Label
              .classed("active", false)
              .classed("inactive", true);
            Generosity_Label
              .classed("active", false)
              .classed("inactive", true);
            Corruption_Label
              .classed("active", true)
              .classed("inactive", false);
          }
        }
      });
    // }).catch(function(error) {
    //   console.log(error);
  
  })}