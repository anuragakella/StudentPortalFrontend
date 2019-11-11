import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { getSubjects } from "../../reducers/actions/getSubjects";
import Spinner from "../App/Spinner";
import { Link, Switch, withRouter } from "react-router-dom";
import {analyticsSelector} from '../../reducers/actions/analyticsSelector'
import {analyticsStateChange} from '../../reducers/actions/analyticsStateChange'


export class TableData extends Component {
  constructor(props) {
    super(props);
    this.filtered = [];
    this.subTable = [];
    this.getSubFilter = this.getSubFilter.bind(this);
    this.filterSubjects = this.filterSubjects.bind(this);
    this.drawTable = this.drawTable.bind(this);
    this.getData = false;
    this.subLoadCntr = [];
    this.filtereds = [];
    this.index = 0;
    this.state = { selected: "" };
    this.teahcRef = React.createRef();
    this.subRef = React.createRef();
    this.teahcerSelect = this.teahcerSelect.bind(this);
    this.subSelect = this.subSelect.bind(this);
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

  async componentDidMount() {
    this.index = 0;
    this.getData = true;
    console.log("tabledata.js --mount");
    if(!(this.props.subState.subState.length > 0)){
    var formData = await this.fetchReq(
      "http://192.168.0.7:8000/api/forms/filters/question/1/",
      "Token 7c89f89223259dc057801365418f671da2c7cc79"
    );
    await this.filterSubjects(formData);
    } else {
      console.log('data already loaded')
    }
  }

  async filterSubjects(data) {
    var auth = "Token 7c89f89223259dc057801365418f671da2c7cc79";
    var url = "http://192.168.0.7:8000/api/forms/filters/subjectState/";
    if (data !== undefined) {
      for (var i = 0; i < data.length; i++) {
        var url_ic = url + "incomplete/" + data[i].form_child.sub_id + "/";
        var url_c = url + "complete/" + data[i].form_child.sub_id + "/";
        var sub = {
          subName: "",
          subID: "",
          incomplete: 0,
          complete: 0,
          subOwner: ""
        };

        var inc = await this.fetchReq(url_ic, auth);
        sub.incomplete = inc.length;
        var cc = await this.fetchReq(url_c, auth);
        sub.complete = cc.length;
        sub.subName = data[i].form_child.sub_name;
        sub.subID = data[i].form_child.sub_id;
        sub.subOwner =
          data[i].form_child.subject_owner.user.first_name +
          " " +
          data[i].form_child.subject_owner.user.last_name;
          sub.subUser = data[i].form_child.subject_owner.user.username
        await this.filtered.push(sub);
        await this.subTable.push({
          subName: sub.subName,
          subID: sub.subID,
          total_res: 0,
          subOwner: sub.subOwner,
          subUser: sub.subUser
        });
        // console.log("SUBTABLE:");
        // console.log(this.subTable);
        this.props.getSubjects(this.filtered);
      }
      await this.getSubFilter();
      this.forceUpdate();
    } else {
      console.log("Error. Backend did not respond.");
    }
  }

  async getSubFilter() {
      if(this.props.token !== undefined){
        if(Object.keys(this.props.token).length > 0 ){
    if (this.subTable.length >= 0) {
      this.filtereds = [];
      var url =
        "http://192.168.0.7:8000/api/super/forms/filters/subjectState/complete/";
      var auth = "Token " + this.props.token.token;
      for (var i = 0; i < this.props.subState.subState.length; i++) {
        this.filtereds = await this.fetchReq(
          url + this.props.subState.subState[i].subID + "/",
          auth
        );
        console.log(this.filtereds);
        this.subTable[
          this.filtereds[0].form_child.sub_id - 1
        ].total_res += this.filtereds.length;
      }
      this.props.analyticsStateChange({subTable: this.subTable});
      console.log(this.subTable);
    } else {
      console.log("LOADING...");
    }
  }
}
  }

  componentDidUpdate() {
    console.log(this.props.token)
  }
  //render={(props) => <SubjectDetail subName={sub.subName} {...props}/>}
  drawTable() {
    console.log(this.props.subTable)
    var tdata = [];
    this.props.subTable.forEach(sub => {
      tdata.push(
        <Fragment>
          <div>
          </div>{" "}
          <tr>
            <td>{sub.subID}</td>
            <td>
              <Fragment>
                <Switch>
                  <Link
                    to={
                      "/analytics/subject/" + sub.subName.toLowerCase().replace(/ /g, "_") + "+" + sub.subID
                    }
                  >
                    {sub.subName}
                  </Link>
                </Switch>
              </Fragment>
            </td>
            <td>{sub.total_res}</td>
            <td>0</td>
          </tr>
        </Fragment>
      );
    });
    console.log(tdata);
    return tdata;
  }

  drawTeacher() {
    console.log(this.props.subTable);
    var tdata = [];
    this.props.subTable.forEach(sub => {
      tdata.push(
        <Fragment>
          <tr>
            <td>{sub.subID}</td>
            <td>
              <Fragment>
                <Switch>
                  <Link
                    to={
                      "/analytics/teacher/" + sub.subUser.toLowerCase().replace(/ /g, "_")
                    }
                  >
                    {sub.subOwner}
                  </Link>
                </Switch>
              </Fragment>
            </td>
            <td>{sub.total_res}</td>
            <td>0</td>
          </tr>
        </Fragment>
      );
    });
    console.log(tdata);
    return tdata;
  }

  teahcerSelect() {
    this.props.analyticsSelector({ selected: "TEC_SORT" });
    this.teahcRef.current.classList.value += " tab-selected";
    this.subRef.current.classList.value = this.subRef.current.classList.value.replace(
      " tab-selected",
      ""
    );
    console.log(this.state.selected);
  }
  subSelect() {
    this.props.analyticsSelector({ selected: "SUB_SORT" });
    this.subRef.current.classList.value += " tab-selected";
    this.teahcRef.current.classList.value = this.teahcRef.current.classList.value.replace(
      "tab-selected",
      " "
    );
    console.log(this.teahcRef.current.classList.value);
    console.log(this.state.selected);
  }

  

  render() {
    return this.props.subTable !== undefined ? (
             <div>
        <h1 className="tab-text">Filter Forms by: </h1>
        <div className="card-flex">
          <div className="tabs">
            <h1 ref={this.teahcRef} onClick={this.teahcerSelect}>
              Teacher
            </h1>
            <h1 ref={this.subRef} onClick={this.subSelect}>
              Subject
            </h1>
          </div>
        </div>
        {this.props.analytics.selected === "SUB_SORT" ? (
          <div className="anl-table">
          {/* {this.drawRoutes()} */}
            <table>
              <tr>
                <th>S.No</th>
                <th>Subject Name</th>
                <th>Total Responses</th>
                <th>Average Score</th>
              </tr>
              {this.drawTable()}
            </table>
          </div>
        ) : this.props.analytics.selected === "TEC_SORT" ? (
          <div className="anl-table">
            <table>
              <tr>
                <th>S.No</th>
                <th>Professor Name</th>
                <th>Total Responses</th>
                <th>Average Score</th>
              </tr>
              {this.drawTeacher()}
            </table>
          </div>
        ) : (
          <div>
            <h1>Select a tab above to continue</h1>
          </div>
        )}
      </div> 
     ) : (
      <div>
        <Spinner spinnerText="Analyzing Data..."/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { subState, analytics, analyticsState, token } = state;
  return { subState, analytics, ownProps, token, subTable: analyticsState.subTable };
};

export default withRouter(connect(
  mapStateToProps,
  { getSubjects, analyticsSelector, analyticsStateChange }
)(TableData));
