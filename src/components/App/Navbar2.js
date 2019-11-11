import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { changeAuth } from '../../reducers/actions/changeAuth'

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onClk = this.onClk.bind(this);
  }

  handleHomeClick = () => {
    this.props.history.push("/login");
  }

  async onClk() {
    alert("logging out..");
    await this.props.changeAuth({isAuth: false});
  }

  welcomeText() {
    if( localStorage.getItem("auth") !== undefined) {
    if(Object.keys(this.props.user).length > 0){
      return (<h2>{ "Hello, " + this.props.user[0].user.username + "!"}</h2>)
    } else { 
    return(<h2>waiting...</h2>)
    }
  }
  }

  render() {
    return (
      <div className="nav-main">
        <div className="nav-left">
        </div>
        <div className="nav-right">
          <div className="right-con">
            {/* <h2>{this.props !== undefined ? "Hello " + this.props.user[0].user.username: <div></div>}</h2> */}
            {this.welcomeText()}
            <div onClick={this.onClk} className="btn btn-logout">
              <div className="btn-content">
                <h4 className="btn-text">logout</h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="btn-icons"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    formData, user, token
  } = state;
  return {
    data: formData.data.data,
    user,
    token,
    ownProps
  };
};

export default withRouter(connect(
  mapStateToProps, { changeAuth }
)(Navbar));
