import React from "react";
import { Link} from "react-router-dom";
import {useLocation} from 'react-router-dom';

export function View(){
    const location = useLocation();
    const {view, name} = location.state;
    const username = location.state.username ? location.state.username : '';
    //view - 1 - Renter
    //view - 2 - Owner
    //view - 3 - Admin
    sessionStorage.setItem('role','user'); //save required user information
    
    return (
        <div style={{padding:'32px'}}>
        
        {username == '' ? null :<> <p> Please use this username - <b>'{username}'</b> and password given to login to Pawsome next time! </p> </>}
        {view == 1 ? 
        (<div className="view-buttongroup">
            <h2>Welcome {name} to Pawsome!</h2>
            <br/>
            <Link to='/search'><button type="submit" className="button button-primary button-wide-mobile button-sm">Search for pets</button></Link> 
            <br/>
        <Link to='/reservations'><button type="submit" className="button button-primary button-wide-mobile button-sm">Order history</button></Link>
        <br/>
        <Link to='/chat'><button type="submit" className="button button-primary button-wide-mobile button-sm">Chat section</button></Link>
        <br/>
        </div>
        )

        : null}
        {view == 2 ?(<div className="view-buttongroup">
        <h2>Welcome {name} to Pawsome!</h2>
        <br/>
        <Link to='/petRegistration'><button type="submit" className="button button-primary button-wide-mobile button-sm">Register your pet</button></Link>
        <br/>
        <Link to='/reservations'><button type="submit" className="button button-primary button-wide-mobile button-sm">Pet bookings</button></Link>
        <br/>
        <Link to='/ratings'><button type="submit" className="button button-primary button-wide-mobile button-sm">Pet ratings</button></Link>
        <br/>
        <Link to='/complaints'><button type="submit" className="button button-primary button-wide-mobile button-sm">Complaints</button></Link>
        <br/>
        <Link to='/complaints'><button type="submit" className="button button-primary button-wide-mobile button-sm">Refunds</button></Link>
        <br/>
        <Link to='/chat'><button type="submit" className="button button-primary button-wide-mobile button-sm">Chat section</button></Link>
        </div>
        ) 
        :null}
        
        {
            view == 3 ?( <div className="view-buttongroup">
                <h4>Welcome Admin, you've got many things to check upon!</h4> 
                <br/>
                <Link to='/approvals'><button type="submit" className="button button-primary button-wide-mobile button-sm">To do - Approvals</button></Link> 
                <br/>
                <Link to='/complaints'><button type="submit" className="button button-primary button-wide-mobile button-sm">Customer complaints</button></Link>
                <br/>
                <Link to='/refunds'><button type="submit" className="button button-primary button-wide-mobile button-sm">Refund requests</button></Link>
                <br/>
                <Link to='/chat'><button type="submit" className="button button-primary button-wide-mobile button-sm">Chat section</button></Link>

            </div> ): null
        }
        </div>
    )
};

export default View;