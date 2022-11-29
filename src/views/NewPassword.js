import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";


const NewPassword = () => {

    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("");
    const handleChange = (event) => {
        setPassword({ ...password, [event.target.name]: event.target.value });
      };

    const handleSubmit = (event) => {
        console.log("Here in new : ",password );
        axios.post("http://localhost:3000/password", {
          email: 'svasire@iu.edu',
          password: password.password,
        }).then((response) => {
          console.log('response');
          console.log(response);
          if(response.data.message){
          setLoginStatus('error');
        } else {
          setLoginStatus('');
          localStorage.setItem("password", JSON.stringify(password));
           navigate('/login');
        }
      });
      event.preventDefault();
     
       navigate('/login');
    };


    const submitHandler = (e) => {
        e.preventDefault();
        const body = {
            password,
            
        };
        axios({
            url: "http://localhost:3000/password",
            data: body,
            method: "patch"
        }).then(() => {
            // props.history.push("/login");
        })
    }

      return (
        <div className='form-content'>
         <input type="text"  placeholder="Enter new password" name="password" value= {password.password} onChange = {handleChange} required/>
            <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleSubmit} >Submit</button>

{           
         }
        
        </div>
    )

};

export default NewPassword;