import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import '../styles/form.css';
import {useLocation} from 'react-router-dom';

export default function Payment(){
    const location = useLocation();
    console.log('location');
    console.log(location);
    const username = JSON.parse(localStorage.getItem('username'));
    const [hours,setHrs] = useState(1);
    const {price,petid} = location.state;
    const [paymentDetails,setPaymentDetails] = useState({
        date: '',
        amount:price*hours,//rate * number_of_hours
        petId:petid,//props
        username:username,//props
        orderId:petid+username,//petid+username from props or session
        cname:'',
        ccnum:'',
        expmonth:'',
        expyear:'',
        cvv:'',
        orderComplete:false
    });

    
    const handleChange = (event)=>{
        setPaymentDetails({ ...paymentDetails, [event.target.name]: event.target.value })
    }

    const handleOrder = ()=>{
        axios.post("http://localhost:3000/payment", {
            date: paymentDetails.date,
            hours:paymentDetails.hours,
            amount:paymentDetails.amount,
            petId:paymentDetails.petId,
            username:paymentDetails.username,//props
            orderId:paymentDetails.orderId,//petid+username from props or session
            cname:paymentDetails.ccname,
            ccnum:paymentDetails.ccnum,
            expmonth:paymentDetails.expmonth,
            expyear:paymentDetails.expyear,
            cvv:paymentDetails.cvv,
            orderComplete:paymentDetails.orderComplete
            
                }).then((response) => {
                  console.log(paymentDetails)
                 setPaymentDetails(response.data);
                });
        console.log(paymentDetails);
    }

    const handleAmountChange = (event)=>{
        setHrs(event.target.value);
        setPaymentDetails({...paymentDetails, amount: price * event.target.value })
    }

    return (
        <div>
        {
        paymentDetails && paymentDetails.orderComplete
        ? (<div><h4>Order successful! We, the team of Pawsome hope you'll have a great time with the pet!</h4></div>) 
        :
        <div>
        <h4>Select number of hours</h4>
<select name="hours" id="hours" onChange = {handleAmountChange}>
    <option value={1}>1 hr</option>
  <option value={2}>2 hrs</option>
  <option value={3}>3 hrs</option>
  <option value={3}>4 hrs</option>
  <option value={3}>5 hrs</option>
</select>
        <form>
        <h3>Order Summary</h3>
            <label for='payment_id'>Order ID - {paymentDetails.orderId}</label>
            <br/>
            <label for='amount'>Payment amount - {`$`+paymentDetails.amount}</label>
            <br/>
            <label for='date'>Date to reserve the pet - </label>
            <input type="date" id="date" name="date"
       min="2022-10-10" max="20223-10-10" onChange={handleChange}></input>
       <br/>
       <h3>Payment</h3>
            {/* <label for="fname">Accepted Cards</label>
            <div class="icon-container">
              <i className="fa fa-cc-visa" style={{color:'navy'}}></i>
              <i className="fa fa-cc-amex" style={{color:'blue'}}></i>
              <i className="fa fa-cc-mastercard" style={{color:'red'}}></i>
              <i className="fa fa-cc-discover" style={{color:'orange'}}></i>
            </div> */}
       <label for="cname">Name on Card</label>
            <input type="text" id="cname" name="cardname" placeholder="Name on your card" onChange={handleChange}/>
            <br/>
            <label for="ccnum">Credit card number</label>
            <input type="text" id="ccnum" name="cardnumber" placeholder="Card number" onChange={handleChange}/>
            <br/>
            <label for="expmonth">Expiry Month</label>
            <input type="text" id="expmonth" name="expmonth" placeholder="Month" onChange={handleChange}/>
            <br/>
            <label for="expyear">Expiry Year</label>
            <input type="text" id="expyear" name="expyear" placeholder="YYYY" onChange={handleChange}/>
            <br/>
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" name="cvv" placeholder="***" onChange={handleChange}></input>
        </form>
        <button type="submit" onClick={handleOrder} className="button button-primary button-wide-mobile button-sm">Confirm order</button>
        </div>
    }
    


</div>
)
}