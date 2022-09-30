import {
  LitElement,
  html,
  css,
} from "lit";

import * as d3 from 'd3';

class MvChartBubble extends LitElement {
  static get properties() {
    return {
      mood: { type: String },
    },
    {
      data: {
        type: Object,
        attribute: false,
        reflect: true
      }
    };
  }

  static get styles() {
    return css`
      svg {
        width: 50%;
        margin: auto;
        position: relative;
        display: block;
      }

      svg tspan {
        font-weight: bold;
        color: #fff;
      }

      svg tspan:last-child {
        font-weight: normal;
      }


      svg .title {
        font: normal 21px sans-serif;
        margin-bottom: 10px;
        text-transform: normal;
      }

      svg .hits {
        font: bold 11px sans-serif;
      }

      svg .founds {
        font: bold 25px sans-serif;
      }

      svg image {
        fill-opacity: 0.7;
      }

      svg .clip {
        transform: scale(0.8);
        margin: auto;
      }

      svg {
        background-color: #EAF4F8;
      }
    `;
  }
  constructor() {
    super();
    this.data = null;

  }
  render() {
    return html`
      <svg id="chart">
        <defs>
          <radialGradient id="Gradient0">
            <stop offset="0%" stop-color="#aef0c7" />
      
            <stop offset="80%" stop-color="#4c9f62" />
          </radialGradient>
          <radialGradient id="Gradient1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#e6bbf2" />
      
            <stop offset="80%" stop-color="#7b4c9f" />
          </radialGradient>
          <radialGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#FFB1BF" />
      
            <stop offset="80%" stop-color="#F14665" />
          </radialGradient>
          <radialGradient id="Gradient3" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#70CEDF" />
      
            <stop offset="80%" stop-color="#0D94AD" />
          </radialGradient>
          <radialGradient id="Gradient4" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="#FED5A5" />
      
            <stop offset="80%" stop-color="#F1960C" />
          </radialGradient>
      
          <filter id="dropshadow" x="-40%" y="-40%" width="180%" height="180%" filterUnits="userSpaceOnUse">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <!-- stdDeviation is how much to blur -->
            <feOffset dx="5" dy="5" result="offsetblur" />
            <feOffset dx="-5" dy="-5" result="offsetblur" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g id="center">
          <circle cx="250" cy="250" r="270" fill="#E2F1F6" />
          <circle id="background" cx="250" cy="250" r="250" fill="#E9F4F7" />
          <circle cx="250" cy="250" r="200" fill="white" style="filter:url(#dropshadow)" />
        </g>
      </svg>
    `;
  }



  updated() {





    console.log('updated')
    let mychart = this.shadowRoot.querySelector('g')

 
  
    console.log('initChart')

 

    this.initChart()

   
  }







initChart() {





    const displayValue = new Array();

    //function taille bulle minimum
    let sizeMini;


    let prec = 0;

    this.data.datas.map((item) => {
      if (item.value > prec) {
        prec = item.value;
      }
    });



    bulleMini(prec * this.data.percentSizeMini / 100, this.data);

    function bulleMini(sizeMini, data) {

      data.datas.map((item, index) => {
        if (item.value <= sizeMini) {
          displayValue[index] = item.value;
          item.value = sizeMini;
        } else {
          displayValue[index] = item.value;
          item.value;
        }
      });
    }

    const files = d3.map(this.data.datas, (d) => d);

    const labelBubble1 = this.data.label1;

    const labelBubble2 = this.data.label2;



    const chart = BubbleChart(files, {
      id: (d) => d.id,
      label: (d) => d.label.substr(0, 25),
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

      var chart = document.querySelector("mv-chart-bubble-demo").shadowRoot;
      chart = chart.querySelector("mv-chart-bubble").shadowRoot;

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

        d3.select(chart).select("#center").selectAll("g").remove()

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
        .attr("style", "filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 1));")
        .style('opacity', "1")

        .attr("r", (d) => d.r)

      /*
        gradiant.transition()
        .duration(2000)
      .style("opacity", "1");
      */
      gradiant.each(function (p, j) {
        d3.select(this).attr("fill", "url(#Gradient" + (j % 5) + ")");
      });

      clip
        .append("a")
        .attr("xlink:href", (d) => K[d.data])
        .attr("target", link == null ? null : linkTarget)
        .append("image")
        .attr("xlink:href", "./bubblechart/src/img/fiche-bubblechart.svg")
        .attr("width", `50px`)
        .attr("height", `50px`)
        .attr("x", (d) => -`${d.r / 1.2 / 8}` * 10)
        .attr("y", (d) => -`${d.r / 1.2 + 10}`)
        .attr("opacity", 0);


      clip.on("mouseover", function () {
        d3.select(this)
          .select("image")
          .attr("opacity", "0")
          .transition()
          .duration(1000)

          .attr("opacity", function (d) {
            if (K[d.data] != "") { return 1 }
            else { return 0 }
            ;
          })
      })
      clip.on("mouseout", function () {
        d3.select(this)
          .select("image")
          .attr("opacity", function (d) {
            if (K[d.data] != "") { return 1 }
            else { return 0 }
            ;
          })
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
        .text((d) => (labelBubble1 ? F[d.data] + " " + labelBubble1 : null))
        .style("font-size", (d) => `${d.r / 3}` + "px");

      clip
        .append("text")
        .text((d) => (labelBubble2 ? displayValue[d.data] + " " + labelBubble2 : null))
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



  }
}

customElements.define("mv-chart-bubble", MvChartBubble);
