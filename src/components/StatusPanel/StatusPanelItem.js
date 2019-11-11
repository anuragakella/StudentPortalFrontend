import React, { Component } from 'react'
import { switchSubjects } from '../../reducers/actions/switchSubjects'
import { needSwitch } from '../../reducers/actions/needSwitch'
import { connect } from 'react-redux';
import Spinner from '../App/Spinner';

export class StatusPanelItem extends Component {
    constructor(props) {
        super(props)
        this.state = {inc: null};
        this.handleClick = this.handleClick.bind(this);
        this.checkRef = React.createRef();
        this.uncheckRef = React.createRef();
        this.h3Ref = React.createRef();
    }

    handleClick() {
      if(!this.props.errors.available) {
        this.props.switchSubjects(this.props.sub);
        this.props.needSwitch(true);
      } else {
        console.log("cant switch");
      }
    }


    componentDidUpdate() {
      if(this.props.subState.subState[this.props.sub.subID-1].incomplete === 0){
        this.checkRef.current.classList.value = this.checkRef.current.classList.value.replace(" svg-invisible", "");
        this.uncheckRef.current.classList.value = this.uncheckRef.current.classList.value + " svg-invisible";
      } else {
        this.uncheckRef.current.classList.value = this.uncheckRef.current.classList.value.replace(" svg-invisible", "");
        this.checkRef.current.classList.value = this.checkRef.current.classList.value + " svg-invisible";
      }
      if(this.props.currentSub.current_sub !== undefined){
        if(this.props.currentSub.current_sub.subID === this.props.sub.subID){
          console.log(this.props.sub.subName);
          this.h3Ref.current.classList.value += " bold"
        } else {
          this.h3Ref.current.classList.value = this.h3Ref.current.classList.value.replace(" bold", "");
        }
      }
    }

    render() {
        if( this.props.subState !== undefined) {
        return this.props.sub.incomplete || this.props.sub.complete ? (
            <div>
                 <div className="checkitem">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="checked-svg svg-invisible"
                ref = {this.checkRef}
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="unchecked-svg"
                ref = {this.uncheckRef}
                >
                <path d="M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1zm-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-3h-2v-2h2v2z" />
                </svg>
                <h3 ref={this.h3Ref} className="item-unchecked" onClick = {this.handleClick}>{this.props.sub.subName}</h3>
            </div>
            </div>
        ) : <Spinner spinnerText="Calculating..."/>
        }
        else {
            return this.props.subState !== undefined ? (
                <div>
                     <div className="checkitem">
                     {this.props.sub.incomplete === 0 ? <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="checked-svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9.29 16.29L5.7 12.7c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10 14.17l6.88-6.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-7.59 7.59c-.38.39-1.02.39-1.41 0z" />
              </svg>:
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="unchecked-svg"
                >
                <path d="M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1zm-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-3h-2v-2h2v2z" />
                </svg>
              }
                    <h3 ref={this.h3Ref} className="item-unchecked" onClick = {this.handleClick}>{this.props.sub.subName}</h3>
                </div>
                </div>
            ) : <Spinner spinnerText="Waiting for Subjects..."/>
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const { subState, currentSub, errors } = state;
    return { subState, currentSub, ownProps, errors }
  }

export default connect(mapStateToProps, { switchSubjects, needSwitch })(StatusPanelItem)
