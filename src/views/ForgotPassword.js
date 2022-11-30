import React, { useState } from "react";
import axios from "axios";
import Form from "../components/elements/Form";
import Row from "../components/elements/rows";
import Input from "../components/elements/Input";
import Button from "../components/elements/Button";
import {  useNavigate } from "react-router-dom";

import FormLabel from '../components/elements/FormLabel';


export function ForgotPassword(){
    const navigate = useNavigate();
    const [answers, setAnswers] = useState('');
    const [answered, setAnswered] = useState(false);
    const [otp,setOtp] = useState();
    const [otpSent, setOtpSent] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [loginStatus, setLoginStatus] = useState("");
    const handleChange = (event) => {
        setAnswers({ ...answers, [event.target.name]: event.target.value });
      };

      const handleSubmit = (event) => {
        console.log("Here in forgot")
        axios.post("http://localhost:3000/passwordreset", {
          email: answers.email,
          sq1:answers.sq1,
          sq2:answers.sq2,
        }).then((response) => {
          console.log('response');
          console.log(response);
          if(response.data.message){
          setLoginStatus('error');
        } else {
          setLoginStatus('');

          localStorage.setItem("email", JSON.stringify(email));
          navigate('/reset',{state:{ email: response.data.user}});
        }
      });
      console.log("THIS IS EVENT",event);
      event.preventDefault();
    };


    let body;
    if (emailSent) {
        body = (
            <span>An email with reset instructions is on its way</span>
        );
    } else {
        // body = (
        //     // <Form onSubmit={handleSubmit}>
                 
        //     //     <Row>
        //     //         <Input
        //     //             name="email"
        //     //             placeholder="email"
        //     //             type="text"
        //     //             value={email}
        //     //             onChange={e => setEmail(e.target.value)}
        //     //         />
        //     //     </Row>

        //     //     <Row>
        //     //         <Button>Get reset link</Button>
        //     //     </Row>
        //     // </Form>
        // );
    }

    return (
        <div className='form-content'>
        <FormLabel children = {<h4>User login form</h4>}
  labelHidden = {true}
  id = {'forgotpassword'}/>
  {loginStatus == 'error' ? (<div className='form-element'>
      <h4 htmlFor="error"><b>Invalid data. </b></h4>
      </div>) : null}
        <form  action="/forgotpassword" method="POST" encType="multipart/form-date"  onSubmit={handleSubmit}>

        <div className='form-content'>
         <input type="text"  placeholder="Enter email" name="email" value= {answers.email} onChange = {handleChange} required/>
         <input type="text"  placeholder="What would you name your pet?" name="sq1" value= {answers.sq1} onChange = {handleChange} required/>
         <input type="text"  placeholder="What would you name your pet home?" name="sq2" value= {answers.sq2} onChange = {handleChange} required/>

            <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleSubmit} >Submit</button>
  
        
        </div>
        </form>
    </div>
    )


};

export default ForgotPassword;