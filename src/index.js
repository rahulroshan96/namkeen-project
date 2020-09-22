import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer/auth'
import {BrowserRouter as Router} from "react-router-dom";
import {compose, combineReducers } from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { composeWithDevTools } from "redux-devtools-extension";
import 'react-toastify/dist/ReactToastify.css';

// store => 1. state, 2. increment() 3. decrement()

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhances(applyMiddleware(thunk))
)

// const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(thunk)
//   // window.__REDUX_DEVTOOLS_EXTENSION__ && 
//   // window.__REDUX_DEVTOOLS_EXTENSION__()
// )
ReactDOM.render(
  <Provider store = {store}>
    <Router>
      <App/>
      </Router>
  </Provider>, document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
