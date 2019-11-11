import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainApp from "./MainApp.js";
import Login from "../Authentication/Login";
import Navbar from "./Navbar.js";
//import PrivateRoute from './auth/PrivateRoute'
import { connect } from "react-redux";
import { changeAuth } from "../../reducers/actions/changeAuth";
import { sendError } from "../../reducers/actions/sendError";
import Analytics from "../Analytics/Analytics.js";
import SubjectDetail from "../Analytics/SubjectDetail.js";
import NoAuth from '../App/NoAuth'
import { TeacherDetail } from "../Analytics/TeacherDetail.js";


export class BossApp extends Component {
    constructor(props) {
        super(props);
        this.isAuth = true;
    }

    componentDidMount() {
      console.log(this.props)
      if(this.props.token === undefined){
        console.log("changing auth")
      }
    }

  render() {
    return ( 
      <div>
        <Router>
          <div className="no-mobile">
            <h3>This website is Desktop only.</h3>
            <p>To use this website, switch to a desktop browser.</p>
            <div className="no-mobile-brand">
              <img
                src={require("../../assets/img/sriit-logo.png")}
                alt="logo"
                className="no-mobile-img"
              />
              <h2>SRIIT | Feedback Portal</h2>
            </div>
          </div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainApp} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/analytics" component={Analytics} />
            <Route exact path="/analytics/subject/:subDet" render={(props) => <SubjectDetail token={this.props.state.token} {...props} /> } />
            <Route exact path="/analytics/teacher/:tecDet"  render={(props) => <TeacherDetail token={this.props.state.token} {...props} /> } />
          </Switch>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};


export default connect(
  mapStateToProps,
  { changeAuth, sendError }
)(BossApp);
