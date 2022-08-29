import {LitElement, html,css,} from "https://cdn.jsdelivr.net/gh/meveo-org/mv-dependencies@master/lit-element.js"


class MvChartBubble extends LitElement {

  static get properties() {
    return {
      mood: {type: String }
    }
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

      font-weight:normal;
    }

    .observablehq {
      display: none;
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

    svg,
    body {
      background-color: #EAF4F8;
    }

  
    
    
    `;
  }

  render() {
    return html`
      
      
      
    <svg id="chart">


      
<defs>

  <radialGradient  id="Gradient0">
    <stop offset="0%" stop-color="#aef0c7"/>

    <stop offset="80%" stop-color="#4c9f62"/>
  </radialGradient >
  <radialGradient  id="Gradient1" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0%" stop-color="#e6bbf2"/>

    <stop offset="80%" stop-color="#7b4c9f"/>
  </radialGradient >
  <radialGradient  id="Gradient2" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0%" stop-color="#FFB1BF"/>

    <stop offset="80%" stop-color="#F14665"/>
  </radialGradient >
  <radialGradient  id="Gradient3" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0%" stop-color="#70CEDF"/>

    <stop offset="80%" stop-color="#0D94AD"/>
  </radialGradient >
  <radialGradient  id="Gradient4" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0%" stop-color="#FED5A5"/>

    <stop offset="80%" stop-color="#F1960C"/>
  </radialGradient >




  <filter id="dropshadow" x="-40%" y="-40%" width="180%" height="180%" filterUnits="userSpaceOnUse">
    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> <!-- stdDeviation is how much to blur -->
    <feOffset dx="5" dy="5" result="offsetblur"/> 
    <feOffset dx="-5" dy="-5" result="offsetblur"/>
    <feMerge> 
      <feMergeNode/>
      <feMergeNode in="SourceGraphic"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>


</defs>
<g id="center">
<circle  cx="250" cy="250" r="270" fill="#E2F1F6"/>
<circle id="background" cx="250" cy="250" r="250" fill="#E9F4F7"/>
<circle cx="250" cy="250" r="200" fill="white"  style="filter:url(#dropshadow)"/>
</g>

</svg>


`;












  }





  firstUpdated(){


   







  };




  
}

customElements.define('mv-chart-bubble', MvChartBubble);