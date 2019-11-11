import React, { Component } from "react";
import { changeAuth } from "../../reducers/actions/changeAuth";
import { sendError } from "../../reducers/actions/sendError";
import { connect } from "react-redux";
import { ErrorManager } from "../Errors/ErrorManager";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { uname: null, pass: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.errRef = React.createRef();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async handleClick() {
    var url = "http://192.168.0.7:8000/auth/login";
    var res = await fetch(url, {
      method: "POST",
      mode: "cors",
      referrer: "no-referrer",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.uname + "",
        password: this.state.pass + ""
      }),
      redirect: "follow"
    })
      .then(res => res)
      .catch(err => console.log(err));
    var jres = await res.json();
    if (jres.token !== undefined) {
    this.props.changeAuth({ isAuth: true, token: jres.token });
    } else {
        console.log("error.")
     this.props.sendError({ available: true, message: "Invalid Credentials" });
        this.errRef.current.classList.value =
        this.errRef.current.classList.value.replace(" login-invisible", "");
    }
    console.log(jres.token);
  }

  doNothing() {

  }
  render() {
    return (
      <div>
      <ErrorManager />
        <div className="login-main">
        <div className="login">
          <div className="login-form" onKeyPress={(e) => {(e.key === 'Enter' ? this.handleClick() : this.doNothing())}}>
            <form>
              {" "}
              <div className="sign-in-txt">
                <h1>Sign In</h1>
                <p className="error-msg login-invisible" ref={this.errRef}>Invalid Credentials.</p>
              </div>
              <div>
                {/* <label>Username:</label> */}
                <input
                  type="text"
                  className="login-uname-txt"
                  name="uname"
                  placeholder="Username"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div>
                {/* <label>Password</label> */}
                <input
                  type="password"
                  name="pass"
                  className="login-pass-txt"
                  placeholder="Password"
                  onChange={this.handleChange}
                ></input>
              </div>
              <div className="hr"></div>
              <div onClick={this.handleClick} className="btn-login">
                Sign In
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { changeAuth, sendError }
)(LoginForm);
