// id="selDataset" in the index.html
var y2018_tag = d3.select("#y2018");
var y2019_tag = d3.select("#y2019");


d3.csv("../static/data/Combined_Data.csv").then(function (data) {

    var y2018_array = [];
    var y2019_array = [];
    countries = [];
    var i = 0;

    data.forEach(function (d) {
        // console.log(d.Year)
        if (d.Year == 2018) {
            y2018_array.push([d.Country, parseFloat(d.Score), d.GDP, d.Social_Support, d.Life_Exp,
            d.Freedom_Choice, d.Generosity, d.Corruption]);

            country = d.Country;
            if (!countries.includes(country)) {
                countries.push(country);
            }
        } else {
            y2019_array.push([d.Country, parseFloat(d.Score), d.GDP, d.Social_Support, d.Life_Exp,
            d.Freedom_Choice, d.Generosity, d.Corruption]);
        }
        i++;
    });

    var y2018_sorted = [];
    var y2019_sorted = [];

    y2018_sorted = y2018_array.sort((a, b) => a[1] - b[1]).reverse();
    y2019_sorted = y2019_array.sort((a, b) => a[1] - b[1]).reverse();

    var y2018_countries = [];
    var y2018_scores = [];

    for (let i = 0; i < 10; i++) {
        y2018_countries.push(y2018_sorted[i][0]);
        y2018_scores[i] = y2018_sorted[i][1];
    }

    // console.log(y2019_array[0][0]);
    // console.log(y2018_countries);
    // console.log(y2018_scores);

    y2018_bar = document.getElementById('y2018_bar');

    Plotly.newPlot(y2018_bar, [{
        type: 'bar',
        x: y2018_scores.reverse(),
        y: y2018_countries.reverse(),

        orientation: "h"
    }], {
        margin: { t: 60 },
        title: "Top 10 Happyiness Countries in 2018"
    });

    var y2019_countries = [];
    var y2019_scores = [];

    for (let i = 0; i < 10; i++) {
        y2019_countries.push(y2019_sorted[i][0]);
        y2019_scores[i] = y2019_sorted[i][1];
    }

    // console.log(y2019_countries);
    // console.log(y2019_scores);

    y2019_bar = document.getElementById('y2019_bar');

    Plotly.newPlot(y2019_bar, [{
        type: 'bar',
        x: y2019_scores.reverse(),
        y: y2019_countries.reverse(),
        orientation: "h"
    }], {
        margin: { t: 60 },
        title: "Top 10 Happyiness Countries in 2019"
    });

    // Table presentaion
    const tbody2018 = d3.select("#y2018_table");
    for (let i = 0; i < 10; i++) {
        const row = tbody2018.append("tr");

        for (let j = 0; j < 8; j++) {
            let cell = row.append("td");
            cell.text(y2018_sorted[i][j]);
        }
    }

    const tbody2019 = d3.select("#y2019_table");
    for (let i = 0; i < 10; i++) {
        const row = tbody2019.append("tr");

        for (let j = 0; j < 8; j++) {
            let cell = row.append("td");
            cell.text(y2019_sorted[i][j]);
        }
    }

    // Country drop-down list
    countries_sorted = countries.sort();
    // console.log("countries_sorted");
    // console.log(countries_sorted);

    var select_tag = d3.select("#country-select");

    countries_sorted.forEach((c) => {
        select_tag
            .append("option")
            .property("value", c)
            .text(c);
    });

});

function comparison(name) {
    console.log(name);
    d3.csv("../static/data/Combined_Data.csv").then(function (data) {
        data.forEach(function (d) {
            // console.log(d.Year)
            if (d.Year == 2019) {
                if (d.Country == name) {
                    const t = d3.select("#compare_table");
                    const row = t.append("tr");
                    cell = row.append("td");
                    cell.text(d.Country);
                    cell = row.append("td");
                    cell.text(d.Score);
                    cell = row.append("td");
                    cell.text(d.GDP);
                    cell = row.append("td");
                    cell.text(d.Social_Support);
                    cell = row.append("td");
                    cell.text(d.Life_Exp);
                    cell = row.append("td");
                    cell.text(d.Freedom_Choice);
                    cell = row.append("td");
                    cell.text(d.Generosity);
                    cell = row.append("td");
                    cell.text(d.Corruption);
                }
            }
        });
    });
} 