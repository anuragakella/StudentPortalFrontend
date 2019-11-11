import React, { Component } from "react";

export class Spinner extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="spinner-dad">
          <div className="spinner-wrap">
            <div className="main">
              <div className="block1"></div>
              <div className="block2"></div>
              <div className="block3"></div>
            </div>
            <h2 className="spinner-text">{this.props.spinnerText}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;
