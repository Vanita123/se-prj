import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import '../styles/form.css';
import {useLocation} from 'react-router-dom';
import Talk from 'talkjs';

export default function Payment(){
    const location = useLocation();
   
    const username = JSON.parse(localStorage.getItem('username'));
    const [hours,setHrs] = useState(1);
    const {price,petid,owner} = location.state;
    const [paymentDetails,setPaymentDetails] = useState({
        date: '',
        amount:JSON.stringify(price*hours),//rate * number_of_hours
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
        setPaymentDetails({ ...paymentDetails, [event.target.name]: event.target.value });
        console.log(paymentDetails);
    }

    const handleOrder = ()=>{
        axios.post("http://localhost:3000/payment", {
            date: paymentDetails.date,
            hours:hours,
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
                 if(response.data){
                    setPaymentDetails({...paymentDetails, orderComplete:true });

                    var user = localStorage.getItem('username');
                    var url = "https://api.talkjs.com/v1/tWWjpWJv/users/"+JSON.parse(user);
                    var currentUser;
                    var owner;

                    fetch(url, {
                        headers: {
                            Authorization: `Bearer sk_test_k8p8zNNQmwjqINnzBNE2MEC47YRm7vQN`
                      }}).then((response) => response.json()).then((json) => {
                      if(json){
                         console.log(json);
                      
                         currentUser = new Talk.User({
                          id:user,
                          name: json.name,
                          email: json.email,
                          photoUrl: json.photoUrl,
                          welcomeMessage: json.welcomeMessage,
                          role: json.role,
                        });
                    }
                 });
                 user = JSON.parse(owner);
                 url = "https://api.talkjs.com/v1/tWWjpWJv/users/"+JSON.parse(user);
                 fetch(url, {
                    headers: {
                        Authorization: `Bearer sk_test_k8p8zNNQmwjqINnzBNE2MEC47YRm7vQN`
                  }}).then((response) => response.json()).then((json) => {
                  if(json){
                     console.log(json);
                  
                     owner = new Talk.User({
                      id:user,
                      name: json.name,
                      email: json.email,
                      photoUrl: json.photoUrl,
                      welcomeMessage: json.welcomeMessage,
                      role: json.role,
                    });
                }
             });

             const session = new Talk.Session({
                appId: 'tWWjpWJv',
                me: currentUser,
              });
        
              const conversationId = Talk.oneOnOneId(currentUser, owner);
              const conversation = session.getOrCreateConversation(conversationId);
              conversation.setParticipant(currentUser);
              conversation.setParticipant(owner);
                 }
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
        ? (<div><h4>Order successful, confirmation email sent! You can use the chat section for communication with the admin or the pet owner!</h4></div>) 
        :
        <div className='form-content'>
        
        <form>
        <h3>Order Details</h3>
        <label for='no_hrs'>Select number of hours - </label>
<select name="hours" id="hours" onChange = {handleAmountChange}>
    <option value={1}>1 hr</option>
  <option value={2}>2 hrs</option>
  <option value={3}>3 hrs</option>
  <option value={3}>4 hrs</option>
  <option value={3}>5 hrs</option>
</select>
<br/>
<label for='amount'>Payment amount - {`$`+paymentDetails.amount}</label>
            <br/>
       
        <h3>Order Summary</h3>
            <label for='payment_id'>Order ID - {paymentDetails.orderId}</label>
            <br/>
            
            
            <label for='date'>Date to reserve the pet - </label>
            <input type="date" id="date" name="date"
       min="2022-10-10" max="20223-10-10" onChange={handleChange}></input>
       <br/>
       <h3>Payment</h3>
       <label for="cname">Name on Card</label>
            <input type="text" id="cname" name="cname" placeholder="Name on your card" onChange={handleChange}/>
            <br/>
            <label for="ccnum">Credit card number</label>
            <input type="text" id="ccnum" name="ccnum" placeholder="Card number" onChange={handleChange}/>
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