import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import {  useNavigate } from "react-router-dom";

export default function Complaints(){
    const [complaints, setComplaints] = useState();
    const location = useLocation();
    const {giveComplaint} = location.state ? location.state : {giveComplaint : false} ;
    const [givenComplaint, setGivenComplaint] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        //get reservations of the logged in user
        if(!giveComplaint){
            setComplaints();//res
            console.log(complaints);
        }
    })

    function handleReturn(){
        //update the complaint here
        console.log(givenComplaint);
        navigate('/reservations');
    }

    return (
        <div>
            {giveComplaint ? <div>
                <label for='complaint'>Please describe the issue</label>
                <input type='textarea' name='complaint' onChange={(e)=>{setGivenComplaint(e.target.value)}} value={givenComplaint} required></input>
                <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleReturn()}>Submit</button>
                </div> :   <h2>Show complaints here - Owner view</h2>}
          
        </div>
    )
}