import React, { useState } from "react";
import axios from "axios";
import FormLabel from '../components/elements/FormLabel';
import '../styles/form.css';
import {  useNavigate } from "react-router-dom";

export function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = (event) => {
    console.log("Here in login")
    axios.post("http://localhost:3000/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log('response');
      console.log(response);
      if(response.data.message){
      setLoginStatus('error');
      console.log("login status",loginStatus);
    } else {

      setLoginStatus('');
      const { fname, roleid} = response.data[0];
      localStorage.setItem("username", JSON.stringify(username));
       localStorage.setItem("roleid", JSON.stringify(roleid));
      navigate('/view',{state:{ name: fname, view: roleid}});
    }
  });
  event.preventDefault();
  // navigate('/search');
};

// useEffect(() => {
//   axios.get("http://localhost:3000/login").then((response) => {
//    console.log(response);
//   });
// }, []);

// const forgotPassword = ()=>{
//     alert('Forgot password - yet to implement')
//   }

return (
    <div className='form-content'>
        <FormLabel children = {<h4>User login form</h4>}
  labelHidden = {false}
  id = {'login'}/>
  {loginStatus == 'error' ? (<div className='form-element'>
      <h4 htmlFor="error"><b>Invalid credentials. Please re-check the details or click on Forgot Password link below!  </b></h4>
      </div>) : null}
        <form  action="/login" method="POST" encType="multipart/form-date"  onSubmit={handleSubmit}>
      <div className='form-element'>
      <label htmlFor="uname" ><b>Username   </b></label>
      </div>
      <div className='form-element'>
      <input className="form-input" type="text" onChange={(e) => {setUsername(e.target.value);}}placeholder="Enter username" name="username" required/>
 
      </div>

      <div className='form-element'>
      <label htmlFor="psw" ><b>Password   </b></label>
      </div>
      <div className='form-element'>
      <input className="form-input" type="password" onChange={(e) => {setPassword(e.target.value);}}placeholder="Enter password" name="password" required/>
      </div>
     
      <div className='form-element'>
      <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleSubmit}>Login</button>
      <a href="/forgotpassword" target="_blank">Forgot password?</a>
      </div>

     </form>
    </div>

)
};

export default Login;