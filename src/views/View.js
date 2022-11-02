import React from "react";
import { Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';

export function View(){
    const location = useLocation();
    const {view, name} = location.state;
    const username = location.state.username ? location.state.username : '';
    //view - 1 assuming to be Renter
    
    return (
        <>
        <h2>Welcome {name} to Pawsome!</h2>
        {username == '' ? null : <h4> Please use this username - '{username}' and password given to login to Pawsome next time! </h4> }
        {view ==1 ? <Link to='/search'><button type="submit" className="button button-primary button-wide-mobile button-sm">Search for pets</button></Link> 
        : (<>
        <Link to='/search'><button type="submit" className="button button-primary button-wide-mobile button-sm">Search for pets</button></Link> 
        <Link to='/petRegistration'><button type="submit" className="button button-primary button-wide-mobile button-sm">Register your pet</button></Link>
        </>)}
        </>
    )
};

export default View;