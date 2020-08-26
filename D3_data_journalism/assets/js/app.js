// @TODO: YOUR CODE HERE!
function makeResponsive() {

    var svgArea = d3.select('body').select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
    };

    var svgWidth = window.innerWidth;
    var svgHeight = window.innerHeight;

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

    d3.csv("/data/data.csv").then(function (data) {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;

        var xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.poverty)])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.obesity)])
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
            .attr
    });


};