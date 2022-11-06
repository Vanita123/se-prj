import React from "react";
import { Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';

export function View(){
    const location = useLocation();
    const {view, name} = location.state;
    const username = location.state.username ? location.state.username : '';
    //view - 1 assuming to be Renter
    //view - 2 assuming to be Owner
    //view - 3 assuming to be Public
    sessionStorage.setItem('role','user'); //save required user information
    
    return (
        <>
        <h2>Welcome {name} to Pawsome!</h2>
        {username == '' ? null : <h4> Please use this username - '{username}' and password given to login to Pawsome next time! </h4> }
        {view == 1 ? 
        (<div>
            <Link to='/search'><button type="submit" className="button button-primary button-wide-mobile button-sm">Search for pets</button></Link> 
            <br/>
        <Link to='/reservations'><button type="submit" className="button button-primary button-wide-mobile button-sm">Your reservations</button></Link>
        <br/>
        </div>
        )

        : null}
        {view == 2 ?(<>
        <Link to='/search'><button type="submit" className="button button-primary button-wide-mobile button-sm">Search for pets</button></Link> 
        <br/>
        <Link to='/petRegistration'><button type="submit" className="button button-primary button-wide-mobile button-sm">Register your pet</button></Link>
        <br/>
        <Link to='/reservations'><button type="submit" className="button button-primary button-wide-mobile button-sm">Your pet reservations</button></Link>
        </>) 
        :null}
        
        {
            view == 3 ?( <div>
                <h4>Admin you've got things to check upon!</h4> 
                <br/>
                <Link to='/approvals'><button type="submit" className="button button-primary button-wide-mobile button-sm">Approvals</button></Link> 
                <br/>
                <Link to='/complaints'><button type="submit" className="button button-primary button-wide-mobile button-sm">Complaints</button></Link>
                <br/>
                <Link to='/complaints'><button type="submit" className="button button-primary button-wide-mobile button-sm">All reservations</button></Link>
                

            </div> ): null
        }
        </>
    )
};

export default View;