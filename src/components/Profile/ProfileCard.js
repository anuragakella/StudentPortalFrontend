import React, { Component } from "react";
import { connect } from 'react-redux'

export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {thisSub: null, loadMulti: false};
    this.multiSubList = []
  }


  getMultiSubjects() {
    this.multiSubList = [];
    var i =0;
    this.props.subState.subState.forEach(sub => {
      if (sub.subOwner === this.props.data[0].form_child.subject_owner.user.username){
          this.multiSubList.push(<p key= {i} className="sname"> {sub.subName}</p>)
      }
      i++;
    });
    console.log(this.multiSubList);
    return this.multiSubList;
  }
 
  render() {
    return this.props.data !== undefined ? (
      <div>
       <div className="qnumc">
            <h1 className="qnum"> </h1>
          </div>
        {/* <h1>Profile Card</h1> */}
        <div className="profile-card">
          <img
            className="profile-img"
         src={require("../../assets/img/no-profile-img.png")}
            alt="profile"
          />
         <h2 className="tname">{this.props.data[0].form_child.subject_owner.user.first_name}</h2>
        {this.getMultiSubjects()}
        </div>
      </div>
    ) : <div></div>
  }
}

const mapStateToProps = (state, ownProps) => {
  const { formData, subState, currentSub } = state;
  return { data: formData.data.data, currentSub, ownProps, subState } 
}

export default connect(mapStateToProps)(ProfileCard);
