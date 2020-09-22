// frontend/src/components/authentication/PrivateRoute.js
import React from "react";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";
import * as actions from './actions/auth'
import {connect} from 'react-redux'
import {isLoggedin} from './actions/auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedin() ? (
        <Component {...props} />
        // console.log(props)
      ) : (
        // console.log(rest.isAuthenticated)
         <Redirect exact
           to={{ pathname: "/login", state: { from: props.location } }}
         />
      )
    }
  />
);


 export default connect(state => ({
   isAuthenticated: state.token!==null
 }))(PrivateRoute);

// export default connect(mapStateToProps, null)(PrivateRoute);