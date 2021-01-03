// https://jarrettmeyer.com/2018/07/17/sparklines-in-d3

const sparkline = (container, data, options) => {
    const defaults = {
        scale: {
            x: d3.scaleLinear(),
            y: d3.scaleLinear()
        },
        size: [100, 40],
        style: {
            stroke: "rgb(60, 120, 240)",
            strokeWidth: 1
        },
        value: {
            x: d => d[0],
            y: d => d[1]
        }
    };

    // Apply defaults to the given options.
    options = $.extend(true, defaults, options);

    // Add an SVG object to the given container.
    let svg = d3
        .select(container)
        .append("svg")
        .classed("sparkline", true)
        .classed("sparkline-svg", true)
        .attr("width", options.size[0])
        .attr("height", options.size[1]);

    let g = svg
        .append("g")
        .classed("sparkline", true)
        .classed("sparkline-group", true);

    let xScale = options.scale.x.range([0, options.size[0]]).domain(d3.extent(data, options.value.x));

    let yScale = options.scale.y.range([options.size[1], 0]).domain(d3.extent(data, options.value.y));

    // Create the line generator function.
    let line = d3
        .line()
        .x(d => xScale(options.value.x(d)))
        .y(d => yScale(options.value.y(d)));

    // Finally, draw the path object.
    let path = g
        .append("path")
        .classed("sparkline", true)
        .classed("sparkline-path", true)
        .datum(data)
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", options.style.stroke)
        .style("stroke-width", options.style.strokeWidth);

    return path;
};
