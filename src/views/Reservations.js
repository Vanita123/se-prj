import { useEffect, useState,useCallback } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

export function Reservations(){
    const [reservations, setReservations] = useState([]);
    const [refundRequested,setRefundRequested] = useState(false);
    const [reason, setReason] = useState('');
    const [bookingId, setBookingId] = useState();
    const roleid = localStorage.getItem('roleid');

    const getReservations =  () => {
        axios.post("http://localhost:3000/reservation", {
            
        }).then((response) => {
         if(response.data){
           console.log(response);
           setReservations(response.data);
         }
        });
    }

    useEffect(()=>{
        getReservations();
    },[]);


function handleRequest(details) {
    setRefundRequested(true);
    setBookingId(details.booking_id);  
}



   const RenderResults = () => {
        const tbodyData = reservations;
        const theadData = ['booking_id','owner','payment_amount','pet_id'];
       
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
                {roleid == 1?<td key='action'>
                    <div className="btn-group">
                    <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={() => handleRequest(row)}>Request refund</button>
                    </div>
                    </td> : null }
                </tr>;
                })}
                </tbody>
                </table>
           )
   }
   const handleRefundRequest = () =>{
    console.log(reason);
    console.log(bookingId);
    setRefundRequested(false);
    
    //backend post call
    axios.post("http://localhost:3000/refund-renter", {
            reason : reason,
            
        }).then((response) => {
         if(response.data){
           console.log(response.data);
           setReason(response.data);
        console.log(reason);
         }
        });


    alert('Refund request submitted.We will get back to you soon. Thank you!');
   }

    return (
        <div className="table-content">
            <h2>Order history</h2>
            {/* {reservations.length == 0 ? <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={getReservations}>Get orders</button> : null} */}
            {reservations.length>0 && !refundRequested ? <RenderResults/> : null}
            {refundRequested ? <div>
                <label for='refund'>Enter refund reason</label>
           
                <textarea name='reason' rows="8" cols="50" onChange={(e)=>setReason(e.target.value)} value={reason}/>
                <br/>
                <br/>
                <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleRefundRequest}>Request refund</button>

            </div> : null}
        </div>
    )
};

export default Reservations;

