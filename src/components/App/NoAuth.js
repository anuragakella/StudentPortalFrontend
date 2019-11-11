import React, { Component } from "react";

export class NoAuth extends Component {
  render() {
    return (
      <div className="not-allowed-page">
        <h1>You do not have permission to view this page.</h1>
        <h3>Login as a site admin and comeback here.</h3>
        <img src={require('../../assets/img/not-alloed-icon.jpg')} alt="not_allowed"/>
        </div>
    );
  }
}

export default NoAuth;
