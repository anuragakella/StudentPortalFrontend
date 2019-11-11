import React, { Component } from "react";
import { connect } from 'react-redux'
import CardItems from "./CardItems";

export class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {thisSub: null, loadMulti: false};
  }


  render() {
    return (
      <div>
      <div className="anl-score-cards">
      <CardItems tname="Dr. Hari Krishna" sname="Data Structures" score="90%"/>
      <CardItems tname="Prof. Math" sname="Data Structures" score="100%"/>
      <CardItems tname="Prof. X" sname="Sub X" score="40%"/>
      <CardItems tname="Dr. Hari Krishna" sname="Data Structures" score="90%"/>
      <CardItems tname="Prof. Math" sname="Data Structures" score="100%"/>
      <CardItems tname="Prof. X" sname="Sub X" score="40%"/>
      </div>
      </div>
    ) 
  }
}

const mapStateToProps = (state, ownProps) => {
  const { formData, subState, currentSub } = state;
  return { data: formData.data.data, currentSub, ownProps, subState } 
}

export default connect(mapStateToProps)(ProfileCard);
