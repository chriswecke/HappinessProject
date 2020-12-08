anychart.onDocumentReady(function () {

    // load the data
    // anychart.data.loadJsonFile("https://static.anychart.com/git-storage/word-press/data/choropleth-map-tutorial/data.json", function (data) {
    anychart.data.loadJsonFile("/api/countries", function (data) {
        console.log(data)
        // Variables
        // go into the records section of the data
        // var geoData = data.records
        var geoData = data

        // sum of all cases per country
        // var sumCases = 0;

        // convert cases to numbers
        // var numC;

        // // create a new array with the resulting data
        var data = [];

        // Go through the initial data
        for (var i = 0; i < geoData.length; i++) {
            // convert strings to numbers and save them to new variables
            // numC = parseInt(geoData[i].cases);

            // check if we are in the same country by comparing the geoId. 
            // if the country is the same add the cases to the appropriate variables
            // if ((geoData[i + 1]) != null && (geoData[i].geoId == geoData[i + 1].geoId)) {
            //     sumCases = sumCases + numC;
            // }
            // else {

            // add last day cases of the same country
            // sumCases = sumCases + numC;

            // insert the resulting data in the array using the AnyChart keywords 
            data.push({
                id: "AF",
                value: geoData[i]["Happiness Score"],
                //title: geoData[i].Region
            })

            // reset the variables to start over
            // sumCases = 0;

            // }
        };

        // connect the data with the map
        var chart = anychart.map(data);
        // chart.height = "40vh"
        chart.geoData(anychart.maps.world);

        // specify the chart type and set the series 
        var series = chart.choropleth(data);

        // set the chart title
        chart.title("COVID-19 Global Cases");

        // color scale ranges
        ocs = anychart.scales.ordinalColor([
            { less: 99 },
            { from: 100, to: 999 },
            { from: 1000, to: 9999 },
            { from: 10000, to: 29999 },
            { from: 30000, to: 39000 },
            { from: 40000, to: 59000 },
            { from: 60000, to: 99999 },
            { greater: 100000 }
        ]);

        // set scale colors
        ocs.colors(["rgb(252,245,245)", "rgb(241,219,216)", "rgb(229,190,185)", "rgb(211,152,145)", "rgb(192,117,109)", "rgb(178,93,86)", "rgb(152,50,48)", "rgb(150,33,31)"]);

        // tell the series what to use as a colorRange (colorScale)
        series.colorScale(ocs);

        // set the container id
        chart.container('container');

        // draw the chart
        chart.draw();
    });

});