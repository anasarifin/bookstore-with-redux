import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import './assets/css/bootstrap.min.css'
 import { Provider } from 'react-redux'
import Login from './components/Login'
import Home from './components/Home'
import History from './components/History'

import store from './Redux/Store'

class App extends Component {
  render () {
    return (
        <Provider store={store}>
          <Router>
            <Route path = {'/history'} exact component = {History} />
            <Route path = {'/home'} exact component = {Home} />
            <Route path = {'/'} exact component = {Login} />
          </Router>
        </Provider>
    )
  }
}

export default App;
