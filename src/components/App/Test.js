import React, { Component } from "react";
import StatusPanelItem from "./StatusPanelItem";
import { getSubjects } from "../../reducers/actions/getSubjects";
import { needSwitch } from "../../reducers/actions/needSwitch";
import { connect } from "react-redux";
import Spinner from "./Spinner";

export class Test extends Component {
  constructor(props) {
    super(props);
    this.state = { subState: [] };
    this.fetchReq = this.fetchReq.bind(this);
    this.filterSubjects = this.filterSubjects.bind(this);
    this.generateTabs = this.generateTabs.bind(this);
    this.cardRef = React.createRef();
    this.filtered = [];
    this.incomplete = [];
    this.complete = [];
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
    var formData = await this.fetchReq(
      "http://192.168.0.7:8000/api/forms/filters/question/1/",
      "Token 7c89f89223259dc057801365418f671da2c7cc79"
    );
    await this.filterSubjects(formData);
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

        var inc = await  this.fetchReq(url_ic, auth);
        sub.incomplete = inc.length;
        var cc = await this.fetchReq(url_c, auth);
        sub.complete = cc.length;
        sub.subName = data[i].form_child.sub_name;
        sub.subID = data[i].form_child.sub_id;
        sub.subOwner = data[i].form_child.subject_owner.user.username;
        this.filtered.push(sub);
        this.props.getSubjects(this.filtered);
        }
    } else {
      console.log("Error. Backend did not respond.");
    }
  }


    
  

  generateTabs() {
    var tabs = [];
    this.props.subState.subState.forEach((sub, index) => {
      tabs.push(<StatusPanelItem key={index + 1} sub={sub} />);
    });
    return tabs;
  }

  render() {
    if (this.props.currentSub.current_sub === undefined) {
      return (
        <div>
          <div className="qnumc-2">
            <h1 className="qnum">Progress</h1>
            <p>Click on subjects below to switch professors/ subjects</p>
          </div>
          <div className="state-card card-animate" ref={this.cardRef}>
            {this.props.subState.subState[0] !== undefined ? (
              this.generateTabs()
            ) : (
              <div>
              <Spinner />
              </div>
              
            )}
          </div>
        </div>
      );
    }
    else {
      return (
        <div>
          <div className="qnumc-2">
            <h1 className="qnum">Progress</h1>
            <p>Click on subjects below to switch professors/ subjects</p>
          </div>
          <div className="state-card" ref={this.cardRef}>
            {this.props.subState.subState[0] !== undefined ? (
              this.generateTabs()
            ) : (
              <div>
              <Spinner />
              </div>
              
            )}
          </div>
        </div>
      );
    }}
}

const mapStateToProps = (state, ownProps) => {
  const { subState, currentSub } = state;
  return { subState: subState, currentSub: currentSub, ownProps };
};

export default connect(
  mapStateToProps,
  { getSubjects, needSwitch }
)(Test);
