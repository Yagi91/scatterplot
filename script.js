let DateTime = luxon.DateTime;
// let myTime = DateTime.fromISO("00:16:53");
let myTime = (date) => DateTime.fromFormat(date, "mm:ss");
let myYear = (date) => DateTime.fromFormat(date, "yyyy");
// let myTime = (date) => DateTime.fromFormat(date, "mm:ss").toISO();
// let myYear = (date) => DateTime.fromFormat(date, "yyyy").toISO();
let url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
let svg = d3.select("svg");
let req = new XMLHttpRequest();
let data;
let timeArr;
let yearArr;
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
let theme = {};
//
let drawCanvas = () => {
  svg
    .attr("width", w)
    .attr("height", h)
    .select("text")
    .style("text-anchor", "middle")
    .attr("x", w / 2)
    .attr("y", 50);
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
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${h - padding})`)
    .call(xAxis);
  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", `translate(${padding}, 0)`)
    .call(yAxis);
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d, index) => timeArr[index])
    .attr("r", 5)
    .attr("cy", (d, index) => h - yScale(timeArr[index]) - padding)
    .attr("cx", (d) => xScale(d.Year));
};
let drawCircles = () => {
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("data-xvalue", (d) => d.Year)
    .attr("data-yvalue", (d, index) => timeArr[index])
    .attr("r", 5)
    .attr("cy", (d, index) => h - yScale(timeArr[index]) - padding)
    .attr("cx", (d) => xScale(d.Year));
};
let drawLegend = () => {};

req.open("GET", url, true);
req.send();
req.onload = () => {
  data = JSON.parse(req.response);
  drawCanvas();
  generateScales();
  drawAxis();
  drawCircles();
  drawLegend();
  console.log(d3.min(timeArr));
  console.log(d3.max(yearArr));
  console.log(year);
  // console.log(new Date("1995").toUTCString());
};
