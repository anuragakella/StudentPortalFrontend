import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { changeAuth } from "../../reducers/actions/changeAuth";
import { updateForm } from "../../reducers/actions/updateForm";
import { getUser } from "../../reducers/actions/getUser";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.onClk = this.onClk.bind(this);
    this.resetFormClick = this.resetFormClick.bind(this);
    this.state = {reset: false, resetText: "Reset Forms"}
  }

  handleHomeClick = async () => {
    await this.props.updateForm({});
  };

  componentDidMount() {}

  async onClk() {
    await this.props.changeAuth({ isAuth: false, token: "", isStaff: false });
    await localStorage.removeItem("auth");
    window.location.reload();
  }

  resetForms() {
    console.log('')
  }

  async componentDidUpdate() {
    if(this.state.reset === true){
      this.resetForms();
    }
    if (Object.keys(this.props.user).length == 0) {
      if (
        this.props.token.token !== "" &&
        Object.keys(this.props.token).length > 0
      ) {
        var url = "http://192.168.0.7:8000/api/me/";
        var res = await fetch(url, {
          method: "GET",
          mode: "cors",
          referrer: "no-referrer",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + this.props.token.token
          },
          redirect: "follow"
        })
          .then(res => res)
          .catch(err => console.log(err));
        var jres = await res.json();
        if (jres[0] !== undefined) {
          console.log(jres[0].user);
          await this.props.getUser({
            username: jres[0].user.username,
            firstname: jres[0].user.first_name,
            lastname: jres[0].user.last_name,
            isStaff: jres[0].user.is_staff
          });
          console.log(this.props.user);
        } else {
          console.log("error");
        }
      } else {
        console.log("wating for token...");
      }
    }
  }

  async resetFormClick(){
    if(this.state.reset === false){
    this.setState({reset: true});
    } else {
    this.setState({reset: false});      
    }
  }

  welcomeText() {
    if (
      this.props.token.token !== "" &&
      Object.keys(this.props.token).length > 0
    ) {
      if (Object.keys(this.props.user).length > 0) {
        return <h2>{"Hello, " + this.props.user.username + "!"}</h2>;
      } else {
        return <h2>waiting...</h2>;
      }
    }
  }

  render() {
    return (
      <div className="nav-main">
        <div className="nav-left">
          <div className="nav" onClick={this.handleHomeClick}>
            <img
              src={require("../../assets/img/sriit-logo.png")}
              alt="logo"
              className="nav-img"
            />
            <h1 className="nav-logo">SRIIT | Portal</h1>
          </div>
        </div>
        <div className="nav-right">
          <div className="right-con">
            {/* <h2>{this.props !== undefined ? "Hello " + this.props.user[0].user.username: <div></div>}</h2> */}
            {this.welcomeText()}
            {this.props.user.isStaff ? (
              <React.Fragment>
                <div style={{background: "grey"}} title="this feature is currently disabled" className="btn btn-logout btn-disabled">
                  <div className="btn-content">
                    <h4 onClick={this.resetFormClick}  className="btn-text">{this.state.resetText}</h4>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    className="btn-icons"

                    >
                      <path fill="none" d="M0 0h24v24H0V0z" />
                      <path d="M13.26 3C8.17 2.86 4 6.95 4 12H2.21c-.45 0-.67.54-.35.85l2.79 2.8c.2.2.51.2.71 0l2.79-2.8c.31-.31.09-.85-.36-.85H6c0-3.9 3.18-7.05 7.1-7 3.72.05 6.85 3.18 6.9 6.9.05 3.91-3.1 7.1-7 7.1-1.61 0-3.1-.55-4.28-1.48-.4-.31-.96-.28-1.32.08-.42.42-.39 1.13.08 1.49C9 20.29 10.91 21 13 21c5.05 0 9.14-4.17 9-9.26-.13-4.69-4.05-8.61-8.74-8.74zm-.51 5c-.41 0-.75.34-.75.75v3.68c0 .35.19.68.49.86l3.12 1.85c.36.21.82.09 1.03-.26.21-.36.09-.82-.26-1.03l-2.88-1.71v-3.4c0-.4-.34-.74-.75-.74z" />
                    </svg>
                  </div>
                </div>
                <div onClick={() => window.location.reload()} className="btn btn-logout">
                  <div className="btn-content">
                    <h4 className="btn-text">Refresh Page</h4>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="btn-icons"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z" />
                      <path d="M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71l-.64.65z" />
                    </svg>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              <div></div>
            )}
            {this.props.token.token !== "" &&
            Object.keys(this.props.token).length > 0 ? (
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
            ) : (
              <div className="right-con">
                <h1 style={{ margin: "0.5em 0 0 0" }}>Hello!</h1>
                <h3 style={{ padding: "0.4em 0em 0em 1em" }}>
                  Login, to continue .
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { formData, user, token, analyticsData } = state;
  return {
    data: formData.data.data,
    user,
    token,
    analyticsData,
    ownProps
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { changeAuth, getUser, updateForm }
  )(Navbar)
);
