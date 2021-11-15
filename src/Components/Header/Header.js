import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'

const Header = () => {
 return (
  <div className="header">
   <img src={logo} alt=""></img>
   <nav className="nav">
    <a href="/shop">Shop</a>
    <a href="/order">Order</a>
    <a href="/review">Review</a>
    {/* <a href="manage/">Manage</a> */}
    <a href="/inventory">Inventory</a>
    <a href="/login">Login</a>
   </nav>

  </div>
 );
};

export default Header;