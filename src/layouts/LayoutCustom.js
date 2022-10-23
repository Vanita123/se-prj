import React from 'react';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LayoutCustom = ({ children }) => (

  <>
    <div className="header-nav-inner">
    <ul className={
        classNames(
        'list-reset text-xs',
        `header-nav-left`
        )}>
    <li style={{paddingTop: '8px',paddingLeft:'5px'}}>
        <Link to="/" className="button button-primary button-wide-mobile button-sm" 
    >Home 🐾</Link>
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