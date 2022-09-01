import { LitElement, html, css } from "lit-element";
import "mv-container";
import "https://d3js.org/d3.v7.min.js";
import "./bubblechart/src/js/mv-bubble-chart.js";

export class MvChartBubbleDemo extends LitElement {
  static get properties() {
    return {
      theme: { type: String, attribute: true },
    };
  }

  static get styles() {
    return css`
      :host {
        font-family: var(--font-family, Arial);
        font-size: var(--font-size-m, 10pt);
      }

      fieldset > label,
      label > input {
        cursor: pointer;
      }

      fieldset {
        width: 120px;
        margin-left: 10px;
        border: 2px solid red;
        -moz-border-radius: 8px;
        -webkit-border-radius: 8px;
        border-radius: 8px;
        color: #818181;
      }

      legend {
        font-weight: 500;
        color: red;
      }

      .mv-chart-demo {
        --mv-chart-margin: auto;
        --mv-chart-height: 500px;
        --mv-chart-width: 600px;
      }

      .main-container {
        --mv-container-min-width: 1000px;
      }

      .dashboard-sample {
        --mv-container-min-width: 950px;
        --mv-container-padding: 40px;
      }

      .dashboard-container {
        display: grid;
        grid-template-columns: 450px 450px;
        grid-template-rows: 290px 290px;
        grid-gap: 0;
      }

      .dashboard-grid {
        display: grid;
        grid-template-columns: 250px 250px;
        grid-template-rows: 290px 290px;
        grid-gap: 0;
      }
    `;
  }

  constructor() {
    super();
    this.theme = "light";
  }

  firstUpdated() {

  }

  render() {
    return html`
      <fieldset>
        <legend>Theme</legend>
        <label>
          <input
            type="radio"
            name="theme"
            value="light"
            checked
            @change="${this.changeTheme}"
          />Light
        </label>
        <label>
          <input
            type="radio"
            name="theme"
            value="dark"
            @change="${this.changeTheme}"
          />Dark
        </label>
      </fieldset>

      <mv-container class="main-container" .theme="${this.theme}">
        <mv-chart-bubble></mv-chart-bubble>
      </mv-container>
    `;
  }

  changeTheme = (originalEvent) => {
    const {
      target: { value },
    } = originalEvent;
    this.theme = value;
  };
}

customElements.define("mv-chart-bubble-demo", MvChartBubbleDemo);
