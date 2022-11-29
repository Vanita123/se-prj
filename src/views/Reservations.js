import { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export default function Reservations(){
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        //fetch reults from bookings table based on username 
 axios.post("http://localhost:3000/reservation", {
            
    }).then((response) => {
     if(response.data){
       console.log(response);
       setReservations(response.data);
     }
    });

   },[])

   function handleRatePet(details) {
        
    console.log('in handler');
    console.log(details);
    //get the current loggedin username, petid, price 
 navigate('/ratings',{state:{ giveRating: true}}); 
}

function handleRaiseComplaint(details) {
        
    console.log('in handler');
    console.log(details);
    //get the current loggedin username, petid, price 
    navigate('/complaints',{state:{ giveComplaint: true}});
}

function handleCancelOrder() {
        
    alert(`Order cancellation request was sent to Admin. You'll get an email with the next steps. Thankyou!`);
    //update backend to admin about the order cancellations
}



   const RenderResults = () => {
        const tbodyData = reservations;
        const theadData = Object.keys(tbodyData[0]);
        theadData.push('Actions');
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
                <tr key='actions'>
                    <td>
                    <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleRatePet()}>Rate the pet</button>
                    <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleRaiseComplaint()}>Raise complaint</button>
                    <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleCancelOrder()}>Cancel order</button>

                    </td>
                </tr>
                </tbody>
                </table>
           )
   }


    return (
        <div>
            <h2>Order history</h2>
            <p>Need data to implement</p>
            <RenderResults/>
        </div>
    )
}