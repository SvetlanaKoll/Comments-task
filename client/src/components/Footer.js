import React from 'react'
import { NavLink } from 'reactstrap'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__links'>
        <span className='link'>Svetlana Kollau</span>
        <NavLink className='link' href='#'>LinkedIn</NavLink>
        <NavLink className='link' href='#'>Facebook</NavLink>
        <span className='link-last'>2020</span>
      </div>
    </div>
  )
}
export default Footer
