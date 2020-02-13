import React, { Component } from 'react'

import {
  
  Container,
  
  NavLink
} from 'reactstrap'

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
         
         <div className="footer__links">
         <span className="link">Svetlana Kollau</span>
         <NavLink className="link" href="#">LinkedIn</NavLink>
         <NavLink  className="link" href="#">Facebook</NavLink>
         <span className="link-last">2020</span>
         </div>
         
      </div>
    )
  }
}
