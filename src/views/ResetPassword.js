import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";


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
          console.log('response');
          console.log(response);
          if(response.data.message){
          setLoginStatus('error');
        } else {
          setLoginStatus('');
          localStorage.setItem("otp", JSON.stringify(otp));
          localStorage.setItem("mail", JSON.stringify(mail));
          let newObject = window.localStorage.getItem("mail");
          console.log("THIS IS OTP",JSON.parse(newObject));
           navigate('/password',{state:{ email: response.data.user}});
        }
        mail=response.data.user;
        console.log(response.data.user);
      });
      event.preventDefault();
    //   console.log("jdfhsadkjfhsdkjfe",event);
    localStorage.setItem("otp", JSON.stringify(otp));
    localStorage.setItem("mail", JSON.stringify(mail));
    let newObject = window.localStorage.getItem("mail");
    console.log("THIS IS OTP",JSON.parse(newObject));
    console.log(mail);
      navigate('/password',{state:{ email: mail}});
    };


    const submitHandler = (e) => {
        e.preventDefault();
        const body = {
            otp,
            
        };
        axios({
            url: "http://localhost:3000/reset",
            data: body,
            method: "patch"
        }).then(() => {
            props.history.push("/login");
        })
    }

      return (
        <div className='form-content'>
         <input type="text"  placeholder="Enter OTP" name="otp" value= {otp.otp} onChange = {handleChange} required/>
            <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleSubmit} >Submit</button>

{/*             
            {answered ? <div className='form-element'>
                    <label>Enter the OTP sent to registered email  </label>
                    <input type='password' name='otp'></input>
                 </div>:null}

            {otpSent ?  <div className='form-element'>
                <label>Enter new password</label>
                <input type='password' name='newPassword'></input>
                <p>On click of the button, your password will be updated and page will be redirected to login page. Please log in using the updated credentials.</p>
                <button>Update Password</button>
                 </div> : null};      */}
        
        </div>
    )

};

export default ResetPassword;