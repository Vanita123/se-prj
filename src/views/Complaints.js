import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import {  useNavigate } from "react-router-dom";
import axios from "axios";

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
            axios.post("http://localhost:3000/complaints", {
            
                }).then((response) => {
                 if(response.data){
                   console.log(response);
                 }
                });
                
        }
        
        
        //get all pet reservations that have approved feild as False - give an Approve button to admin - onclick set Approved field to True
        //Have 2 sections - to Approve & approved 
        setComplaints();
        console.log(complaints);
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