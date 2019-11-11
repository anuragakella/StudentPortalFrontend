import React, { Component } from "react";
import ProfileCard2 from "./ProfileCard2";
import TableData from "./TableData";
import { connect } from 'react-redux'
import {analyticsSelector} from '../../reducers/actions/analyticsSelector'
import {completedForms} from '../../reducers/actions/completedForms'
import NoAuth from "../App/NoAuth";
import Spinner from "../App/Spinner";
import { Redirect } from 'react-router-dom'

export class Analytics extends Component {
  componentDidMount() {
    console.log("analytics --mounted")
    console.log(this.props.user)
    console.log(Object.keys(this.props.token).length)
    this.countForms = this.countForms.bind(this);
    this.countForms2 = this.countForms2.bind(this);
    this.state = {filtereds: [], complete: 0, total: 0}
    this.incomplete = 0;
    this.complete = 0;
    this.filtereds = [];
  }
  async componentDidUpdate() {
    console.log(this.props.token)
    console.log(this.complete);
  }

  async componentDidMount() {
    if(Object.keys(this.props.analyticsData).length === 0){
  await this.countForms()
    } else {
      console.log("data loaded.")
    }
  }

  async fetchReq(url = "", auth = "") {
    var res = await fetch(url, {
      method: "GET",
      mode: "cors",
      referrer: "no-referrer",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      redirect: "follow"
    });
    var jres = await res.json();
    //console.log("FETCH URL: " + url);
    return jres;
  }

  async countForms() {
    console.log(Object.keys(this.props.analyticsData).length <= 0);
    if(Object.keys(this.props.analyticsData).length <= 0){
    if(Object.keys(this.props.token).length > 0 ){
      if(this.props.token !== undefined){
      this.filtereds = [];
      var url ="http://192.168.0.7:8000/api/super/forms/";
      var auth = "Token " + this.props.token.token;
      this.filtereds = await this.fetchReq(url,auth);
      this.setState({filtereds: this.filtereds});
      this.setState({total: this.state.filtereds.length});
      this.setState({one: this.filtereds[0].editable})
      var comp = 0;
      for(var i = 0; i < this.filtereds.length; i++) {
        console.log(this.filtereds[i].editable);
        if(this.filtereds[i].editable === false){
          comp++;
        }
      }
      console.log(comp);
      this.props.completedForms({CompleteForms: comp, totalForms: this.filtereds.length});
      this.setState({complete: comp})
    } else {
      console.log("LOADING...");
    } 
  }
}
  }

  countForms2() {
    console.log(" COUNT FORMS: ")
    if(Object.keys(this.props.analyticsData).length > 0) {
    return (<h1>{this.props.analyticsData.CompleteForms}/{this.props.analyticsData.totalForms} forms completed.</h1>)
    } else {
      return(<Spinner spinnerText="Waiting for data..."/>);
    }
  }

  render() {
    if(Object.keys(this.props.token).length > 0) {
      if(this.props.token.token !== ""){
        return ( Object.keys(this.props.user).length > 0 ? this.props.user.isStaff ?
        (<div>
          <div className="anl-main">
            <div className="anl-header">
              <h1>Analytics Dashboard</h1>
            </div>
            <div className="anl-link-data">
              <h3 style={{color: "red"}} className="warning-anl"> WARNING: Analyzed data will be lost after a page refresh.</h3>
              <a href="http://192.168.0.7:8000/admin" className="django-link" >Django Administration</a>
            </div>

            <div className="card-flex">
            {this.countForms2()}
          </div>
          <TableData token = {this.props.token}/>
            <div className="anl-score-cards">
              {/* <ProfileCard2 /> */}
            </div>
          </div>
        </div>)
      : <NoAuth /> : <Spinner spinnerText="Waiting for data..."/>
      );
      } else { return ( <Redirect to="/login" />)}
     } else {return ( <Redirect to="/login" />)}
     
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    user, token, subState, analyticsData
  } = state;
  return {
    user,
    token,
    subState,
    analyticsData,
    ownProps
  };
};

export default connect(mapStateToProps, { analyticsSelector, completedForms })(Analytics);
