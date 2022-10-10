import React, { useState } from "react";
import axios from "axios";
import FormLabel from '../components/elements/FormLabel';
import '../styles/form.css';
import { useNavigate } from "react-router-dom";

export function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const login = () => {
    axios.post("http://localhost:3000/login", {
      username: username,
      password: password,
    }).then((response) => {
     console.log(response)
    });

    
    navigate("/search");
  };

  const forgotPassword = ()=>{
    alert('Forgot password - yet to implement')
  }

return (
    <div className='form-content'>
        <FormLabel children = {<h4>User login form</h4>}
  labelHidden = {false}
  id = {'login'}/>
        <form action="" method="post" >
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
      <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={login}>Login</button>
      <a href="/forgotpassword" target="_blank">Forgot password?</a>
      </div>

     </form>
    </div>
)
}

export default Login;