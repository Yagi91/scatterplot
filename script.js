let DateTime = luxon.DateTime;
let myTime = (date) => DateTime.fromFormat(date, "mm:ss");
let myYear = (date) => DateTime.fromFormat(date, "yyyy");
let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let svg = d3.select("svg");
let req = new XMLHttpRequest();
let data;
let timeArr;
let yearArr;
var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0)
  .style("visibility", "hidden");
//
let w = 1100;
let h = 800;
let padding = 100;
//
let xScale;
let yScale;
let xAxis;
let yAxis;
let yAxisScale;
let xAxisScale;

//
let theme = {
  fill: ["#E3BA22", " #137B80"],
  headlineX: [h / 23, h / 14],
  tickColor: "#635F5D",
  spacing: "100px",
};
//
let drawCanvas = () => {
  svg.attr("width", w).attr("height", h);
};
let generateScales = () => {
  timeArr = data.map((val) => {
    return myTime(val.Time);
  });
  yearArr = data.map((val) => {
    return val.Year;
  });
  yScale = d3
    .scaleTime()
    .domain([d3.max(timeArr), d3.min(timeArr)])
    .range([0, h - 2 * padding]);
  xScale = d3
    .scaleLinear()
    .domain([d3.min(yearArr) - 1, d3.max(yearArr) + 1])
    .range([padding, w - padding]);
  xAxisScale = d3
    .scaleLinear()
    .domain([d3.min(yearArr) - 1, d3.max(yearArr) + 1])
    .range([padding, w - padding]);
  yAxisScale = d3
    .scaleTime()
    .domain([d3.max(timeArr), d3.min(timeArr)])
    .range([h - padding, padding]);
};
let drawAxis = () => {
  let timeFormat = d3.timeFormat("%M:%S");
  xAxis = d3.axisBottom(xAxisScale).tickFormat(d3.format("d"));
  yAxis = d3.axisLeft(yAxisScale).tickFormat(timeFormat);

  svg
    .append("text")
    .attr("class", "axis-type")
    .attr("id", "axisY-type")
    .text("TIME IN MINUTES")
    .attr("x", h / 3.5)
    .attr("y", -40)
    .attr("transform", "rotate(90)")
    .style("fill", theme.tickColor);
  svg
    .append("text")
    .attr("class", "axis-type")
    .text("codedBy: <Bryan(Yagi_91) />")
    .attr("y", h - 10)
    .style("font-style", "italic")
    .style("fill", theme.tickColor);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${h - padding})`)
    .call(xAxis)
    .selectAll(".tick")
    .style("color", theme.tickColor);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis)
    .style("color", theme.tickColor);
};
let drawCircles = () => {
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d, index) => timeArr[index])
    .attr("r", 6)
    .attr("cy", (d, index) => h - yScale(timeArr[index]) - padding)
    .attr("cx", (d) => xScale(d.Year))
    .attr("fill", (d) => (d.Doping === "" ? theme.fill[1] : theme.fill[0]))
    .attr("opacity", "0.7")
    .on("mouseover", (e, d) => {
      div
        .attr("id", "tooltip")
        .style("opacity", 0.8)
        .style("visibility", "visible")
        .attr("data-year", d.Year);
      div
        .html(
          `${d.Name}, ` +
            d.Nationality +
            "<br>" +
            "Year: " +
            d.Year +
            ", Time: " +
            d.Time +
            (d.Doping ? "<br/><br/>" + d.Doping : "")
        )
        .style("left", e.pageX + 5 + "px")
        .style("top", e.pageY - 28 + "px");
    })
    .on("mouseout", () => {
      div.style("opacity", 0).style("visibility", "hidden");
    });
};
let drawLegend = () => {
  let legend = svg.append("g").attr("id", "legend");

  d3.selectAll(".heading")
    .data(theme.headlineX)
    .attr("y", (d) => d);

  legend
    .append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("y", h / 3)
    .attr("x", w / 1.3)
    .attr("fill", theme.fill[1]);
  legend
    .append("text")
    .text("No Doping Allegations")
    .attr("y", h / 2.86)
    .attr("x", w / 1.27);
  legend
    .append("rect")
    .attr("width", 15)
    .attr("height", 15)
    .attr("y", h / 3.3)
    .attr("x", w / 1.3)
    .attr("fill", theme.fill[0]);
  legend
    .append("text")
    .text("Riders with Doping Allegations")
    .attr("y", h / 3.14)
    .attr("x", w / 1.27);
};

req.open("GET", url, true);
req.send();
req.onload = () => {
  data = JSON.parse(req.response);
  drawCanvas();
  generateScales();
  drawAxis();
  drawCircles();
  drawLegend();
};
