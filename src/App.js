import React,{Component} from 'react';
import './App.css';
import { connect } from 'react-redux'
import Login from './Login'
import Signup from './Signup'
import Logout from './Logout'
import {Route, Switch} from "react-router-dom";
import PrivateRoute from './PrivateRoute'
import LandingPage from './components/common/LandingPage'
import NewNavbar from './components/common/NewNavbar'
import Checkout from './Checkout'
import Address from './Address'
import Payment from './Payment'
import RedirectPayment from './RedirectPayment'
import ResetPassword from './components/authentication/ResetPassword';
import ResetPasswordConfirm from './components/authentication/ResetPasswordConfirm';
import FooterNamkeen from './components/common/FooterNamkeen'
import AboutUs from './components/common/AboutUs.js'
import ContactUs from './components/common/ContactUs.js'

class App extends Component {
  render() {
    return (
      <>
      <NewNavbar/>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/aboutus" component={AboutUs}/>
        <Route exact path="/contactus" component={ContactUs}/>
        <Route exact path="/logout" component={Logout}/>
        <Route exact path='/reset_password' component={ResetPassword} />
        <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
        <PrivateRoute exact path="/checkout" component={Checkout}/>
        <PrivateRoute exact path="/address" component={Address}/>
        <PrivateRoute exact path="/payment" component={Payment}/>
        <PrivateRoute exact path="/redirect_payment" component={RedirectPayment}/>
      </Switch>
      <FooterNamkeen/>
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
