import React from "react";
import { Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';

export function View(){
    const location = useLocation();
    const {view, name} = location.state;

    
    return (
        <>
        <h2>Welcome {name} to Pawsome!</h2>
        {view == 1 ? <Link to='/search'><button type="submit" className="button button-primary button-wide-mobile button-sm">Search for pets</button></Link> 
        : (<>
        <Link to='/search'><button type="submit" className="button button-primary button-wide-mobile button-sm">Search for pets</button></Link> 
        <Link to='/pet-registration'><button type="submit" className="button button-primary button-wide-mobile button-sm">Register your pet</button></Link>
        </>)}
        </>
    )
};

export default View;