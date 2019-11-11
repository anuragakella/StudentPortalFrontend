import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';

const PrivateRoute = ({children, token, ...rest}) => (
    <Route 
        {...rest}
        render= { ({location}) => 
            token.isAuth ? children : (<Redirect to={{pathname: "/login", state: {from: location}}}/>)
        }
    />
);

const mapStateToProps = state => ({
    token: state.token
})

export default connect(mapStateToProps)(PrivateRoute);