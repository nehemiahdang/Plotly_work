//
d3.json("data/samples.json").then(function(data) {
    // console.log(Object.entries(data));
    // "names", "metadata", "samples"
    var sample_values = data.samples.map(row => row.sample_values);
    var otu_ids = data.samples.map(row => row.otu_ids);
    var otu_labels = data.samples.map(row => row.otu_labels);
    var demo_info = data.metadata;
    // console.log(sample_values[0].slice(0,10));
    // console.log(data.metadata.filter(value => value.id === 940));
    // console.log(demo_info[0]);
    // console.log(demo_info[0].wfreq);

    // Display the initiate
    // Horizontal Bar Chart
    var data = [{
        // ID : 940
        x: sample_values[0].slice(0,10),
        y: otu_ids[0].slice(0,10).map(value => `OTU ${value}`),
        type: "bar",
        text: otu_labels[0].slice(0,10),
        orientation: "h"
    }];

    Plotly.newPlot("bar", data);

    // Randomly generates colors for the bubble chart
    var colors = [];
    for (var i = 0; i < otu_ids[0].length; i++) {
        colors.push(Math.floor(Math.random()*16777215).toString(16));
    };

    // Bubble Chart
    var data2 = [{
        x: otu_ids[0],
        y: sample_values[0],
        mode: "markers",
        marker: {
            size: sample_values[0],
            color: colors
        },
        text: otu_labels[0]
    }];

    var layout2 = {
        xaxis: {title: "OTU IDs"}
    };

    Plotly.newPlot("bubble", data2, layout2);
    
    // Gauge Chart
    var data3 = [{
        value: demo_info[0].wfreq,
        domain: {
            x: [0, 1],
            y: [0, 1]
        },
        title: {
            text: "Belly Button Washing Freq: Scrubs per Week"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {range: [null, 9]},
        }
    }];

    Plotly.newPlot("gauge", data3);

    // Target the sample-metadata ID to input the demographic info
    var demography = d3.select("#sample-metadata");

    // Empty the html content to update it
    demography.html("");

    // Loop through the dictionary to append the text
    Object.entries(demo_info[0]).forEach(([key, value]) => {
        demography.append("div").text(`${key}: ${value}`);
    });

    // Call the optionChanged() when there's a change in the dropdown menu
    d3.selectAll("#selDataset").on("change", optionChanged);

    function optionChanged() {
        // Create a variable for the dropdown menu
        var dropdownMenu = d3.select("#selDataset");

        // Assign a value of the dropdown menu options to a variable
        var subject = dropdownMenu.property("value");

        // Initialize the arrays
        // For Bar Chart
        var x = [];
        var y = [];
        var text = [];

        // For Bubble Chart
        var x2 = [];
        var y2 = [];
        var size = [];
        var text2 = [];

        // For Gauge Chart
        var gValue = [];

        // Resets the html content of the sample-metadata
        demography.html("");

        // Set conditions for the dropdown menu and update it depending on the selection
        if (subject === "940") {
            x = sample_values[0].slice(0,10),
            y = otu_ids[0].slice(0,10).map(value => `OTU ${value}`),
            text = otu_labels[0].slice(0,10),
            Object.entries(demo_info[0]).forEach(([key, value]) => {
                demography.append("div").text(`${key}: ${value}`);
            });

            x2 = otu_ids[0],
            y2 = sample_values[0],
            size = sample_values[0],
            text2 = otu_labels[0],

            gValue = demo_info[0].wfreq
        }

        if (subject === "941") {
            x = sample_values[1].slice(0,10),
            y = otu_ids[1].slice(0,10).map(value => `OTU ${value}`),
            text = otu_labels[1].slice(0,10),
            Object.entries(demo_info[1]).forEach(([key, value]) => {
                demography.append("div").text(`${key}: ${value}`);
            });

            x2 = otu_ids[1],
            y2 = sample_values[1],
            size = sample_values[1],
            text2 = otu_labels[1],

            gValue = demo_info[1].wfreq
        }

        if (subject === "943") {
            x = sample_values[2].slice(0,10),
            y = otu_ids[2].slice(0,10).map(value => `OTU ${value}`),
            text = otu_labels[2].slice(0,10),
            Object.entries(demo_info[2]).forEach(([key, value]) => {
                demography.append("div").text(`${key}: ${value}`);
            });

            x2 = otu_ids[2],
            y2 = sample_values[2],
            size = sample_values[2],
            text2 = otu_labels[2],

            gValue = demo_info[2].wfreq
        }

        if (subject === "944") {
            x = sample_values[3].slice(0,10),
            y = otu_ids[3].slice(0,10).map(value => `OTU ${value}`),
            text = otu_labels[3].slice(0,10),
            Object.entries(demo_info[3]).forEach(([key, value]) => {
                demography.append("div").text(`${key}: ${value}`);
            });

            x2 = otu_ids[3],
            y2 = sample_values[3],
            size = sample_values[3],
            text2 = otu_labels[3],

            gValue = demo_info[3].wfreq
        }

        if (subject === "945") {
            x = sample_values[4].slice(0,10),
            y = otu_ids[4].slice(0,10).map(value => `OTU ${value}`),
            text = otu_labels[4].slice(0,10),
            Object.entries(demo_info[4]).forEach(([key, value]) => {
                demography.append("div").text(`${key}: ${value}`);
            });

            x2 = otu_ids[4],
            y2 = sample_values[4],
            size = sample_values[4],
            text2 = otu_labels[4],

            gValue = demo_info[4].wfreq
        }
        // Update the bar graphs when the dropdown menu option is changed
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [y]);
        Plotly.restyle("bar", "text", [text]);
        Plotly.restyle("bubble", "x", [x2]);
        Plotly.restyle("bubble", "y", [y2]);
        Plotly.restyle("bubble", "size", [size]);
        Plotly.restyle("bubble", "text", [text2]);
        Plotly.restyle("gauge", "value", [gValue]);
    };
});