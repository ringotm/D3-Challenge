// @TODO: YOUR CODE HERE!
function makeResponsive() {

    var svgArea = d3.select('body').select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
    };

    var svgWidth = window.innerWidth / 2.6;
    var svgHeight = window.innerHeight / 2;

    var margin = {
        top: 40,
        bottom: 40,
        right: 40,
        left: 40
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
            .domain([d3.min(data, d => d.poverty), d3.max(data, d => d.poverty)])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.obesity), d3.max(data, d => d.obesity)])
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

        //  chartGroup.append("g")
        //   .selectAll('text')
        //   .data(data)
        //   .append("text")
        //   .attr("x", d => xScale(d.poverty))
        //   .attr("y", d => yScale(d.obesity))
        //   .attr("class", "stateText")
        //  .text(d => d.abbr);


    });


};

makeResponsive();

d3.select(window).on("resize", makeResponsive);