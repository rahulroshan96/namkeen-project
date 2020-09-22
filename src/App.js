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
