import React from 'react';
import Footer from '../components/layout/Footer';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

export function LayoutUser({ children }){
  const navigate = useNavigate();
  const roleid = localStorage.getItem('roleid');

  const handleChange = event => {
    console.log('Label ', event.target);
    console.log(event.target.value);
    navigate(event.target.value);
  };

  return (
  <>
    <div className="header-nav-inner">
    <ul className={
        classNames(
        'list-reset text-xs',
        `header-nav-left`
        )}
        style={{display:'flex',justifyContent:'flex-end',padding:'8px'}}>
    <li style={{paddingTop: '8px',paddingRight:'5px',width:'180px' }}>

    <select name="options" id="options" onChange={handleChange} style={{width:'175px',padding:'5px'}}>
      {roleid == 1? <><option id='action' value="">Action center ⎈</option>
    <option id='profile' value="/profile">My profile ✯</option>
    <option id='rent' value="/search">Rent a pet ♞</option>
    <option id='order' value="/reservations">Order history ♾</option>
    <option id='rating' value="/ratings">Pet ratings 🀐</option>
    <option id='complaint' value="/complaints">Complaints ⚉</option>
    <option id='order' value="/refunds">Refunds ♾</option>
    <option id='chat' value="/chat">Chat section ⍩</option>
  <option id='logout' value="/">Logout ☹︎</option></> : null}

  {roleid == 2? <><option id='action' value="">Action center ⎈</option>
    <option id='profile' value="/profile">My profile ✯</option>
    <option id='register' value="/petRegistration">Register a pet ♞</option>
    <option id='order' value="/reservations">Order history ♾</option>
    <option id='rating' value="/ratings">Pet ratings 🀐</option>
    <option id='complaint' value="/complaints">Complaints ⚉</option>
    <option id='order' value="/refunds">Refunds ♾</option>
    <option id='chat' value="/chat">Chat section ⍩</option>
  <option id='logout' value="/">Logout ☹︎</option></> : null}

  {roleid == 3? <><option id='profile' value="">Action center ⎈</option>
    <option id='profile' value="/profile">Admin profile ✯</option>
    <option id='approval' value="/approvals">Approvals ♾</option>
    <option id='rent' value="/complaints">Customer complaints ♞</option>
    <option id='order' value="/refunds">Refunds ♾</option>
    <option id='chat' value="/chat">Chat section ⍩</option>
  <option id='logout' value="/">Logout ☹︎</option></> : null}
    
</select>
    </li>
    </ul>
    </div>

    <main className="site-content">
      {children}
    </main>

    <Footer />
   </>

)};

export default LayoutUser;  