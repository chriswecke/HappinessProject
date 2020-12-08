anychart.onDocumentReady(function () {

    // load the data
    // anychart.data.loadJsonFile("https://static.anychart.com/git-storage/word-press/data/choropleth-map-tutorial/data.json", function (data) {
    anychart.data.loadJsonFile("/api/countries", function (data) {
        console.log(data)

        // Variables
        // go into the records section of the data
        
        var geoData = data

        // // create a new array with the resulting data
        var data = [];

        // Go through the initial data
        for (var i = 0; i < geoData.length; i++) {
            
            // insert the resulting data in the array using the AnyChart keywords 
            data.push({ id: geoData[i].ISO3, value: geoData[i].Score, title: geoData[i].Country })
            // data.push({
            //     id: "KE",
            //     value: "1.5",
            //     //title: geoData[i].Region
            // })
        };

        // connect the data with the map
        var chart = anychart.map(data);
        
        chart.geoData(anychart.maps.world);

        // specify the chart type and set the series 
        var series = chart.choropleth(data);

        // set the chart title
        chart.title("Happiness Score by Country");

        // color scale ranges
        ocs = anychart.scales.ordinalColor([
            { less: .99 },
            { from: 1, to: 1.99 },
            { from: 2, to: 2.99 },
            { from: 3, to: 3.99 },
            { from: 4, to: 4.99 },
            { from: 5, to: 5.99 },
            { from: 6, to: 6.99 },
            { greater: 7 }
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