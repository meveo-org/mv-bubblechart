import data from "./data.js";
const displayValue = new Array();

//function taille bulle minimum
let sizeMini ;


let prec=0;

data.map((item) => {
  if (item.value > prec) {
   prec = item.value;
  } 
});



bulleMini(prec*10/100);

function bulleMini(sizeMini){
data.map((item, index) => {
  if (item.value <= sizeMini) {
    displayValue[index] = item.value;
    item.value = sizeMini;
  } else {
    displayValue[index] = item.value;
    item.value;
  }
});
}

const files = d3.map(data, (d) => d);

const chart = BubbleChart(files, {
  id: (d) => d.id,
  label: (d) => d.label,
  value: (d) => d.value,
  founds: (d) => d.founds,
  image: (d) => d.image,
  link: (d) => d.link,
  width: 600,
  height: 600,
});

function BubbleChart(
  data,
  {
    name = ([x]) => x, // alias for label
    label = name, // given d in data, returns text to display on the bubble
    value = ([, y]) => y, // given d in data, returns a quantitative size
    group, // given d in data, returns a categorical value for color
    founds, // given d in data, items founds in data
    image, //given d in data, images founds in data
    id,
    // title, // given d in data, returns text to show on hover
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links, if any
    width = 640, // outer width, in pixels
    height = width, // outer height, in pixels
    padding = 3, // padding between circles
    // margin = 1, // default margins
    marginTop = 20, // top margin, in pixels
    marginRight = 20, // right margin, in pixels
    marginBottom = 20, // bottom margin, in pixels
    marginLeft = 40, // left margin, in pixels
    groups, // array of group names (the domain of the color scale)
    colors = d3.schemeTableau10, // an array of colors (for groups)
    //  fill = "#ccc", // a static fill color, if no group channel is specified
    // fillOpacity = 1, // the fill opacity of the bubbles
    // stroke, // a static stroke around the bubbles
    // strokeWidth, // the stroke width around the bubbles, if any
    //  strokeOpacity, // the stroke opacity around the bubbles, if any
  } = {}
) {
  // Compute the values.
  // const D = d3.map(data, d => d);
  const V = d3.map(data, value);
  const D = d3.map(data, (d) => d);

  const G = group == null ? null : d3.map(data, group);
  const I = d3.range(V.length).filter((i) => V[i] > 0);

  // Unique the groups.
  if (G && groups === undefined) groups = I.map((i) => G[i]);
  groups = G && new d3.InternSet(groups);

  // Construct scales.
  const color = G && d3.scaleOrdinal(groups, colors);

  // Compute labels and titles.
  const L = label == null ? null : d3.map(data, label);
  const F = founds == null ? null : d3.map(data, founds);
  const P = image == null ? null : d3.map(data, image);
  const K = link == null ? null : d3.map(data, link);
  const Z = id == null ? null : d3.map(data, id);
  //const Val = value == null ? null : d3.map(data, value);

  // Compute layout: create a 1-deep hierarchy, and pack it.
  const root = d3
    .pack()
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .padding(padding)(d3.hierarchy({ children: I }).sum((i) => V[i]));

  var chart = document.querySelector("mv-chart-bubble").shadowRoot;

  const svg = d3
    .select(chart)
    .select("#chart")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-marginLeft, -marginTop, width, height])
    .attr("style", "max-width: 600px; height: auto; height: intrinsic;")
    .attr("fill", "currentColor")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .append("g")
    .attr("class", "clip")
    .attr("style", "filter:url(#dropshadow)");

  const bubbles = d3.select(chart).select("#center");

  const leaf = bubbles
    .selectAll("a")
    .data(root.leaves())
    .join("g")

    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  const uid = `O-${Math.random().toString(16).slice(2)}`;

  leaf.append("clipPath").attr("id", (d) => `${uid}-clip-${d.data}`);

  const clip = leaf.append("g");

  const gradiant = clip
    .append("circle")

    .attr("r", (d) => d.r);

  gradiant.each(function (p, j) {
    d3.select(this).attr("fill", "url(#Gradient" + (j % 5) + ")");
  });

  clip
    .append("a")
    .attr("xlink:href", (d) => K[d.data])
    .attr("target", link == null ? null : linkTarget)
    .append("image")
    .attr("xlink:href", "./src/img/fiche-bubblechart.svg")
    .attr("width", (d) => `${d.r / 2}`)
    .attr("height", (d) => `${d.r / 2}`)
    .attr("x", (d) => -`${d.r / 1.2 / 8}` * 10)
    .attr("y", (d) => -`${d.r / 1.2 + 10}`)
    .attr("opacity", 0);


    clip .on("mouseover", function () {
      d3.select(this)
        .select("image")
        .attr("opacity", "0")
        .transition()
        .duration(1000)
        
        .attr("opacity", function(d) {            
          if ( K[d.data] != "") {return 1}  
          else    { return 0 }          
      ;})         
    })
    clip.on("mouseout", function () {
      d3.select(this)
        .select("image")
        .attr("opacity", function(d) {            
          if ( K[d.data] != "") {return 1}  
          else    { return 0 }          
      ;})         
        .transition()
        .duration(1000)
        .attr("opacity", "0");
    })




  //image svg icon

  clip
    .append("image")
    .attr("xlink:href", (d) => P[d.data])
    .attr("width", (d) => `${d.r / 1.2}`)
    .attr("height", (d) => `${d.r / 1.2}`)
    .attr("x", (d) => -`${d.r / 1.2 / 2}`)
    .attr("y", (d) => -`${d.r / 1.2 + 10}`)
    .attr("opacity", 0.5);

  //founds

  clip
    .append("text")
    .attr("fill", "#fff")
    .attr("x", 0)
    .attr("y", (d) => `${d.r / 3.5}`)
    .attr("class", "founds")
    .text((d) => F[d.data] + " founds")
    .style("font-size", (d) => `${d.r / 3}` + "px");

  clip
    .append("text")
    .text((d) => displayValue[d.data] + " hits")
    .style("font-size", (d) => `${d.r / 6}` + "px")
    .attr("fill", "#fff")
    .attr("class", "hits")
    .attr("fill", "#fff")
    .attr("x", 0)
    .attr("y", (d) => `${d.r / 2}`)
    .attr("fill-opacity", (d, i, D) => (i === D.length - 1 ? 1 : null));

  clip
    .append("text")
    .text((d) => L[d.data])
    .style("font-size", (d) => `${d.r / 6}` + "px")
    .attr("fill", "#fff")
    .attr("class", "title")
    .attr("x", 0)
    .attr("y", 0);

  clip
    .select("tspan:last-child")
    .append("tspan")
    .text(" hits")
    .attr("class", "hits")
    .style("font-size", (d) => `${d.r / 6}` + "px");



  return Object.assign(svg.node(), { scales: { color } });
}
