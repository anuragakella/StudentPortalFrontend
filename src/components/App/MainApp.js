import React, { Component } from "react";
import ProfileCard from "../Profile/ProfileCard";
import Form from "../Form/Form";
import StatusPanel from "../StatusPanel/StatusPanel";
import { changeAuth } from "../../reducers/actions/changeAuth";
import { getUser } from "../../reducers/actions/getUser";
import { sendError } from "../../reducers/actions/sendError";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import Spinner from "./Spinner";
export class MainApp extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount(){
    console.log(Object.keys(this.props.state.user).length);
  }

  render() {
    return (this.props.state.token.token !== "" && Object.keys(this.props.state.token).length > 0 ?
        Object.keys(this.props.state.user).length > 0 ?  this.props.state.user.isStaff ? (<Redirect to="/analytics" />): 
        (<div>
        <div className="app-main">
          <div className="container">
            <div className="profilecard">
              <ProfileCard {...this.props}/>
                          </div>
            <div className="form">
              <Form />
            </div>
            <div className="statuspanel">
              <StatusPanel {...this.props}/>
            </div>
          </div>
        </div>
      </div>) : <Spinner spinnerText="Checking Permissions"/> : ( <Redirect to="/login"/> )
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { state, ownProps };
};

export default connect(
  mapStateToProps,
  { changeAuth, getUser, sendError }
)(MainApp);