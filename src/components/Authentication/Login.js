import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { changeAuth } from '../../reducers/actions/changeAuth'
import { sendError } from '../../reducers/actions/sendError'
import LoginForm from './LoginForm';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.localAuth = false;
    }
    
   componentDidMount(){
     console.log(this.props.token)
     this.props.sendError({ available: false, message: "" });
     if(localStorage.getItem("auth")!== null) {
      this.props.changeAuth({ isAuth: true, token: localStorage.getItem("auth"), isStaff: this.props.user.isStaff});
     }
   }

    render() { if(this.props.token.token !== "" && Object.keys(this.props.token).length > 0){
      if(this.props.user.isStaff === false) {
        return ( 
           <Redirect to="/"/>
        ) 
      } else {
        return ( 
          <Redirect to="/"/>
       )  
      }
    } 
    else if(this.props.user.isStaff === true) {
      return ( <Redirect to="/analytics" />)
    }
    else { return (
        <div>
         <LoginForm />
    </div>
    )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
    const {
      formData, user, token
    } = state;
    return {
      data: formData.data.data,
      user,
      token,
      ownProps
    };
  };
  
  export default connect(
    mapStateToProps, { changeAuth, sendError }
  )(Login);
  