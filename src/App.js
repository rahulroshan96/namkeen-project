// frontend/src/components/App.js
import React from "react";
import {Route, Switch} from "react-router-dom";

import PageNotFound from "./PageNotFound";
import Header from "./components/common/Header";
import ProfilePage from "./components/core/ProfilePage";
import PrivateRoute from "./components/authentication/PrivateRoute";
import LoginPage from "./components/authentication/LoginPage";
import SignUpPage from "./components/authentication/SignUpPage";
import Test from './components/common/Test'
import NewNavbar from "./components/common/NewNavbar";


function App() {
  return (
    <>
    <div style={{"background-color":"#fcefef"}}>
      <NewNavbar/>
      <Switch>
        <PrivateRoute exact path="/" component={ProfilePage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/sign-up" component={SignUpPage}/>
        <Route path="/test" component={Test}/>
        <Route component={PageNotFound}/>
      </Switch>
    </div>
    </>
  );
}

export default App;