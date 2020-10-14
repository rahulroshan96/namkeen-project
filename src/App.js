import React,{Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import Home from './Home'
import Login from './Login'
import Signup from './Signup'
import Logout from './Logout'
import {Route, Switch} from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import LandingPage from './components/common/LandingPage'
import NewNavbar from './components/common/NewNavbar'
import Checkout from './Checkout'
import ResetPassword from './components/authentication/ResetPassword';
import ResetPasswordConfirm from './components/authentication/ResetPasswordConfirm';


class App extends Component {
  render() {
    return (
      <>
      <NewNavbar/>
      <Switch>
        {/* <PrivateRoute exact path="/" component={Home}/> */}
        {/* <PrivateRoute exact path="/test" component={Test}/> */}
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/logout" component={Logout}/>
        <Route exact path='/reset_password' component={ResetPassword} />
        <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
        <PrivateRoute exact path="/checkout" component={Checkout}/>
        {/* <Route exact path="/checkout" component={Checkout}/> */}
      </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
     isAuthenticated: state.token!==null
  };
};

export default connect(mapStateToProps,null)(App);
// export default App;
