import React, { Component } from 'react'

import Graph from './Graph'
import Navbars from './Navbars'

class Home extends Component{
    componentDidMount(){
      let auth = localStorage.getItem('keyToken');
        if (auth == null) window.location.href = '/'
    }
  render () {
    return (
      <>
      <Navbars />
      <Graph />
      </>
    )
  }
}

export default Home
