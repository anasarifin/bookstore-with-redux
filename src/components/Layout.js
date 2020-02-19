import React, { Component } from 'react'

import Body from './Body'
import Navbars from './Navbars'

class Layout extends Component{
  render () {
    return (
      <>
      <Navbars />
      <Body />
      </>
    )
  }
}

export default Layout
