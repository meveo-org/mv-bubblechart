# mv-chart

MvChart is a Meveo chart component (based on lit-element) that renders a content chart.  This is a component wrapper for [chartjs](https://www.chartjs.org/)

## Quick Start

To experiment with the MvChart component.

1. Clone this repo.

2. Serve the project from the root directory with some http server (best served with meveo itself)

3. Update the chart demo component in demo.js file

## Sample usage

```html
<mv-chart-bubble
.data="${data}" // data properties
.theme="${this.theme}" // theme is either "light" or "dark"
></mv-chart-bubble>

```

```javascript
The chart has the following properties:

{
  label1: "", // text
  label2: "", // text
  percentSizeMini: 50,  //bubble minimum size
  datas: [{
    "id": 1, // id of the data
    "label": "", // label of the data
    "founds": 10, // first value
    "value": 100, // second value
    "image": "", // icon
    "link": " " // bubble link
  }]
}
```

You can also check this [demo](https://chart.meveo.org/)

## Acknowledgement
Uses [chartjs](https://www.chartjs.org/) library for rendering the charts