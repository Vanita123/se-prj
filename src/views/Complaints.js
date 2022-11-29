import { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import {  useNavigate } from "react-router-dom";
import axios from "axios";

export default function Complaints(){
    const [complaints, setComplaints] = useState([]);
    const location = useLocation();
    const {giveFlow} = location.state ? location.state : {giveFlow : false} ;
    const [givenComplaint, setGivenComplaint] = useState('');
    const [giveComplaint,setGiveComplaint]= useState(false);
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [bookingId, setBookingId] = useState();

    useEffect(()=>{
        //get reservations of the logged in user
        if(!giveFlow){
            axios.post("http://localhost:3000/complaints", {
            
                }).then((response) => {
                 if(response.data){
                   console.log(response.data);
                   setComplaints(response.data);
                console.log(complaints);
                 }
                });
                
        }
        else{
            axios.post("http://localhost:3000/reservation", {
            
        }).then((response) => {
         if(response.data){
           console.log(response);
           setReservations(response.data);
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

    function handleRequest(details) {
        console.log(details);
        setGiveComplaint(true);
        setBookingId(details.booking_id);  
    }
    const RenderResults = () => {
        const tbodyData = reservations;
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
                return <td key={index}>{row[key]}</td>
                })}
                <td key='action'>
                    <div className="btn-group">
                    <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={() => handleRequest(row)}>Raise complaint</button>
                    </div>
                    </td>
                </tr>;
                })}
                </tbody>
                </table>
           )
   }


    function handleReturn(){        
        console.log(givenComplaint);
        console.log(bookingId);
        setGiveComplaint(false);

        //backend post call

        alert('Complaint is registered. We will put in best efforts to address your complaint. Thank you!');
        
    }

    return (
        <div>
            {giveFlow && giveComplaint? <div>
                <label for='complaint'>Please describe the issue</label>
                <br/>
                <br/>
                <textarea name='complaint' rows="8" cols="50" onChange={(e)=>{setGivenComplaint(e.target.value)}} value={givenComplaint} required/>
                <br/>
                <br/>
                <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleReturn}>Submit</button>
                </div> :  <div> 
                    <h2>Complaints</h2> 
                   { complaints.length > 0 && !giveFlow? <RenderTable/> : null}
                   {reservations.length > 0 && giveFlow && !giveComplaint? <RenderResults/> : null}
                </div>}
          
        </div>
    )
}