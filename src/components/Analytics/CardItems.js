import React, { Component } from "react";

export class CardItems extends Component {
  render() {
    return (
      <div>
        <div className="anl-profile-card">
          <h1 style={{ fontSize: 50 + "px" }}>{this.props.score}</h1>
          <h2 className="anl-tname">{this.props.tname}</h2>
          <p className="anl-sname">{this.props.sname}</p>
        </div>
      </div>
    );
  }
}

export default CardItems;
