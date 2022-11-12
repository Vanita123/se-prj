import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import '../styles/form.css';
import {useLocation} from 'react-router-dom';

export default function Payment(){
    const location = useLocation();
    console.log('location');
    console.log(location);
    const [paymentDetails,setPaymentDetails] = useState({
        date: '',
        hours:1,//dropdown 1 - 5 hrs
        amount:location.state.price,//rate * number_of_hours
        petId:location.state.petid,//props
        username:location.state.username,//props
        orderId:location.state.petid+location.state.username,//petid+username from props or session
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
        //post
        console.log(paymentDetails);
    }

    return (
        <div>
        {
        paymentDetails && paymentDetails.orderComplete
        ? (<div><h4>Order successful! We, the team of Pawsome hope you'll have a great time with the pet!</h4></div>) 
        :
        <div>
        <h4>Select number of hours</h4>
<select name="hours" id="hours" onChange = {handleChange}>
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
            <label for='date'>Date to reserve the pet </label>
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