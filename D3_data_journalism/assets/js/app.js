// @TODO: YOUR CODE HERE!

function xScale(data, chosenXaxis) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenXaxis]) * 0.8,
        d3.max(data, d => d[chosenXaxis]) * 1.2])
        .range([0, width]);
    return xLinearScale;
}

function yScale(data, chosenYaxis) {
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d[chosenYaxis]) * 0.8,
        d3.max(data, d => d[chosenYaxis])])
        .range([height, 0]);
    return yLinearScale;
}

function renderXaxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);

    return xAxis;
}

function renderYaxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);

    return yAxis;
}

function renderCirclesX(circlesGroup, newXScale, chosenXaxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXaxis]));
    return circlesGroup;

}

function renderLabelsX(labelsGroup, newXScale, chosenXaxis) {
    labelsGroup.transition()
        .duration(1000)
        .attr("x", d => newXScale(d[chosenXaxis]));
    return labelsGroup;
}

function renderLabelsY(labelsGroup, newYScale, chosenYaxis) {
    labelsGroup.transition()
        .duration(1000)
        .attr("y", d => newYScale(d[chosenYaxis]));
    return labelsGroup;
}

function renderCirclesY(circlesGroup, newYScale, chosenYaxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cy", d => newYScale(d[chosenYaxis]));

    return circlesGroup;
}




//function makeResponsive() {

var svgArea = d3.select('body').select("svg");

if (!svgArea.empty()) {
    svgArea.remove();
};

var svgWidth = 800;
var svgHeight = 600;

var margin = {
    top: 40,
    bottom: 80,
    right: 40,
    left: 80
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

var chosenXaxis = "poverty";
var chosenYaxis = "obesity";

d3.csv("assets/data/data.csv").then(function (data) {
    //data.poverty = +data.poverty;
    //data.obesity = +data.obesity;
    console.log(data);

    data.forEach(item => {
        item.poverty = +item.poverty
        item.obesity = +item.obesity
        item.income = +item.income
        item.healthcare = +item.healthcare
        // console.log(item.abbr)
        // item.abbr = item.abbr
    });

    //var xScale = d3.scaleLinear()
    //   .domain([d3.min(data, d => d.poverty) - 1, d3.max(data, d => d.poverty) + 2])
    //  .range([0, width]);

    var xLinearScale = xScale(data, chosenXaxis);

    var yLinearScale = yScale(data, chosenYaxis);

    //var yScale = d3.scaleLinear()
    //   .domain([d3.min(data, d => d.obesity) - 2, d3.max(data, d => d.obesity) + 2])
    //  .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    var xAxis = chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append("g")
        .call(leftAxis);

    var circlesGroup = chartGroup.selectAll('circle')
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d[chosenXaxis]))
        .attr("cy", d => yLinearScale(d[chosenYaxis]))
        .attr("class", "stateCircle")
        .attr("r", "11");


    var labelsGroup = chartGroup.selectAll('.stateText')
        .data(data)
        .enter()
        .append("text")
        .attr("class", "stateText")
        .attr("x", d => xLinearScale(d[chosenXaxis]))
        .attr("y", d => yLinearScale(d[chosenYaxis]))
        .text(d => d.abbr);

    var XaxisGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var povertyLabel = XaxisGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty")
        .classed("active", true)
        .text("Poverty (%)");

    var incomeLabel = XaxisGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "income")
        .classed("inactive", true)
        .text("Income ($)");

    var YaxisGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)");

    var ObesityLabel = YaxisGroup.append("text")
        .attr("y", -45)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("value", "obesity")
        .classed("active", true)
        .text("Obesity (%)");

    var HealthcareLabel = YaxisGroup.append("text")
        .attr("y", -65)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("value", "healthcare")
        .classed("inactive", true)
        .text("Lacks Healthcare (%)");

    XaxisGroup.selectAll("text")
        .on("click", function () {
            var value = d3.select(this).attr("value");
            if (value !== chosenXaxis) {
                chosenXaxis = value;

                xLinearScale = xScale(data, chosenXaxis);

                xAxis = renderXaxes(xLinearScale, xAxis);

                circlesGroup = renderCirclesX(circlesGroup, xLinearScale, chosenXaxis);
                labelsGroup = renderLabelsX(labelsGroup, xLinearScale, chosenXaxis);
                //}
                //}
                //)
                if (chosenXaxis === "income") {
                    povertyLabel
                        .classed("active", false)
                        .classed("inactive", true)
                    incomeLabel
                        .classed("active", true)
                        .classed("inactive", false)
                }
                else {
                    povertyLabel
                        .classed("active", true)
                        .classed("inactive", false)
                    incomeLabel
                        .classed("active", false)
                        .classed("inactive", true)
                }

            }

        });

    YaxisGroup.selectAll("text")
        .on("click", function () {
            var value = d3.select(this).attr("value");
            if (value !== chosenYaxis) {
                chosenYaxis = value;

                yLinearScale = yScale(data, chosenYaxis);

                yAxis = renderYaxes(yLinearScale, yAxis);

                circlesGroup = renderCirclesY(circlesGroup, yLinearScale, chosenYaxis);
                labelsGroup = renderLabelsY(labelsGroup, yLinearScale, chosenYaxis);
                //}
                //}
                //)
                if (chosenYaxis === "obesity") {
                    ObesityLabel
                        .classed("active", true)
                        .classed("inactive", false)
                    HealthcareLabel
                        .classed("active", false)
                        .classed("inactive", true)
                }
                else {
                    ObesityLabel
                        .classed("active", false)
                        .classed("inactive", true)
                    HealthcareLabel
                        .classed("active", true)
                        .classed("inactive", false)
                }

            }

        });


});

   // makeResponsive();
//d3.select(window).on("resize", makeResponsive);