import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import FormLabel from '../components/elements/FormLabel';

const ResetPassword = (props) => {
    let mail='';
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("");
    const handleChange = (event) => {
        setOtp({ ...otp, [event.target.name]: event.target.value });
      };

      
    const handleSubmit = (event) => {
        axios.post("http://localhost:3000/reset", {
           
          otp: otp.otp,
        }).then((response) => {
          console.log('reset response');
          console.log(response);
          if(response.data.message){
          setLoginStatus('error');
          console.log("login status",loginStatus);
        } else {
          setLoginStatus('');
          localStorage.setItem("otp", JSON.stringify(otp));
          localStorage.setItem("mail", JSON.stringify(mail));
          let newObject = window.localStorage.getItem("mail");
          console.log("THIS IS OTP 1",JSON.parse(newObject));
           navigate('/newpassword');
        }
        mail=response.data.user;
        console.log(response.data.user);
      });
      event.preventDefault();
    localStorage.setItem("otp", JSON.stringify(otp));
    localStorage.setItem("mail", JSON.stringify(mail));
    let newObject = window.localStorage.getItem("mail");
    console.log("THIS IS OTP",JSON.parse(newObject));
    console.log(mail);
    //  navigate('/password',{state:{ email: mail}});
    };


    const submitHandler = (e) => {
        e.preventDefault();
    
  
    }

      return (
        <div className='form-content'>
        <FormLabel children = {<h4></h4>}
  labelHidden = {true}
  id = {'reset'}/>
  {loginStatus == 'error' ? (<div className='form-element'>
      <h4 htmlFor="error"><b>Invalid OTP. Please enter a valid OTP. </b></h4>
      </div>) : null}
      <form  action="/reset" method="POST" encType="multipart/form-date"  onSubmit={handleSubmit}>


        <div className='form-content'>
         <input type="text"  placeholder="Enter OTP" name="otp" value= {otp.otp} onChange = {handleChange} required/>
            <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleSubmit} >Submit</button>

            </div>

            </form>
        </div>
    )

};

export default ResetPassword;