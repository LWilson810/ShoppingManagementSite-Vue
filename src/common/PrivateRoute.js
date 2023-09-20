import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({component: Component, auth, ...rest}) => (
  <Route {...rest} 
    render = { props => 
      auth.isAuthenticated === true ? (
        jwt_decode(localStorage.jwtToken).locked ? (
          <Redirect to = '/LockScreen' />
        ) : (
          <Component {...props} />
        ) 
      ) : (
        <Redirect to = '/Login' />
      )
    }
  />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);