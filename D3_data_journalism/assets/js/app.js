// @TODO: YOUR CODE HERE!

//function xScale()

function makeResponsive() {

    var svgArea = d3.select('body').select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
    };

    var svgWidth = window.innerWidth / 2;
    var svgHeight = window.innerHeight / 1.5;

    var margin = {
        top: 50,
        bottom: 50,
        right: 50,
        left: 50
    };

    var height = svgHeight - margin.top - margin.bottom;
    var width = svgWidth - margin.left - margin.right;

    var svg = d3
        .select("#scatter")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("assets/data/data.csv").then(function (data) {
        //data.poverty = +data.poverty;
        //data.obesity = +data.obesity;
        console.log(data);

        data.forEach(item => {
            item.poverty = +item.poverty
            item.obesity = +item.obesity
            console.log(item.abbr)
            // item.abbr = item.abbr
        });

        var xScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.poverty) - 1, d3.max(data, d => d.poverty) + 2])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.obesity) - 2, d3.max(data, d => d.obesity) + 2])
            .range([height, 0]);

        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);

        chartGroup.append("g")
            .call(yAxis);

        var circlesGroup = chartGroup.selectAll('circle')
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.poverty))
            .attr("cy", d => yScale(d.obesity))
            .attr("class", "stateCircle")
            .attr("r", "13");


        var labelsGroup = chartGroup.selectAll('.stateText')
            .data(data)
            .enter()
            .append("text")
            .attr("class", "stateText")
            .attr("font-size", 10)
            .attr("x", d => xScale(d.poverty))
            .attr("y", d => yScale(d.obesity))
            .text(d => d.abbr);

        var XaxisGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        var povertyLabel = XaxisGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "obesity")
            .classed("active", true)
            .text("Poverty (%)");

        var YaxisGroup = chartGroup.append("g")
            .attr("transform", "rotate(-90)");

        var ObesityLabel = YaxisGroup.append("text")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .classed("active", true)
            .text("Obesity (%)");

        XaxisGroup.selectAll("text")
            .on("click", function () {
                var value = d3.select(this).attr("value");
                if (value !== chosenXaxis) {
                    chosenXaxis = value;

                    xLinearScale = xScale
                }
            }
            )




    });


};

makeResponsive();

d3.select(window).on("resize", makeResponsive);