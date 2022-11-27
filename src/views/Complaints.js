import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import {  useNavigate } from "react-router-dom";
import axios from "axios";

export default function Complaints(){
    const [complaints, setComplaints] = useState([]);
    const location = useLocation();
    const {giveComplaint} = location.state ? location.state : {giveComplaint : false} ;
    const [givenComplaint, setGivenComplaint] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        //get reservations of the logged in user
        if(!giveComplaint){
            axios.post("http://localhost:3000/complaints", {
            
                }).then((response) => {
                 if(response.data){
                   console.log(response.data);
                   setComplaints(response.data);
                console.log(complaints);
                 }
                });
                
        }
        
        
        //get all pet reservations that have approved feild as False - give an Approve button to admin - onclick set Approved field to True
        //Have 2 sections - to Approve & approved 
        
    },[]);

    function RenderTable(){
        const tbodyData = complaints;
        const theadData = Object.keys(tbodyData[0]);

                return (
            <table>
                <thead>
                <tr>
                {theadData.map(heading => {
                return <th key={heading}>{heading}</th>
                })}
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((row, index) => {
                return <tr key={index}>
                {theadData.map((key, index) => {
                return <td key={row[key]}>{row[key]}</td>
                })}
                </tr>;
                })}
              
                </tbody>
                </table>
           )
    }

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
                </div> :  <div> 
                    <h2>Renter complaints</h2> 
                   { complaints.length > 0 ? <RenderTable/> : <h4>No complaints to show</h4>}
                </div>}
          
        </div>
    )
}