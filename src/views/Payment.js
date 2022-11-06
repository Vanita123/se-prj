import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import '../styles/form.css';
import '../styles/form.css';

export function Payment(){
    const [paymentDetails,setPaymentDetails] = useState({
        date: '',
        hours:'',
        amount:'',//rate * number_of_hours
        petId:'',
        username:'',//props
        orderId:'',//petid+username from props or session
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
        console.log(paymentDetails);
    }

    return (
        {
        paymentDetails.orderComplete 
        ? (<div><h4>Order successful! We, the team of Pawsome hope you'll have a great time with the pet!</h4></div>) 
        :
        <div>
        <form className="nosubmit">
        <h3>Order Summary</h3>
            <label for='payment_id'>Order ID - {paymentDetails.orderId}</label>
            <br/>
            <label for='amount'>Payment amount - {paymentDetails.amount}</label>
            <br/>
            <label for='date'>Date to reserve the pet </label>
            <input type="date" id="date" name="date"
       min="2022-10-10" max="20223-10-10" onChange={handleChange}></input>
       <br/>
       <h3>Payment</h3>
            <label for="fname">Accepted Cards</label>
            <div class="icon-container">
              <i class="fa fa-cc-visa" style="color:navy;"></i>
              <i class="fa fa-cc-amex" style="color:blue;"></i>
              <i class="fa fa-cc-mastercard" style="color:red;"></i>
              <i class="fa fa-cc-discover" style="color:orange;"></i>
            </div>
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
    )
}