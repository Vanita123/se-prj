import React from 'react';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LayoutUser= ({ children }) => (

  <>
    <div className="header-nav-inner">
    <ul className={
        classNames(
        'list-reset text-xs',
        `header-nav-right`
        )}>
    <li style={{paddingTop: '8px',paddingLeft:'5px'}}>
        <Link to="/" className="button button-primary button-wide-mobile button-sm" 
    >Home 🐾</Link>
    </li>
    <li style={{paddingTop: '8px',paddingLeft:'5px'}}>
    <div class='dropdown'>
  <button class='dropbtn'>Action center &#9660;</button>
  <div class='dropdown-content'>
  <a href=''>Profile</a>
  <a href=''>Orders</a>
  <a href=''>Refund</a>
  <div style='width:100%;border-bottom: 1px #000 dotted;'>&nbsp;</div>
  <a href=''>Logout</a>
  </div>
</div>
    </li>
    </ul>
    </div>

    <main className="site-content">
      {children}
    </main>

    <Footer />
   </>

);

export default LayoutCustom;  