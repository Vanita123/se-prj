import React, { useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";

export function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
     console.log(response)
    });
  };

return (
    <div>
        <nav>
        <Link to="/">Home</Link>
        </nav>
        <pre>Login page</pre>
        
        <form class="modal-content animate" action="" method="post">
      <label htmlFor="uname"><b>Username    </b></label>
      <input type="text"  onChange={(e) => {setUsername(e.target.value);}}placeholder="Enter Username" name="uname" required/>
      <br></br>

      <label htmlFor="psw"><b>Password  </b></label>
      <input type="password" onChange={(e) => {setPassword(e.target.value);}}placeholder="Enter Password" name="psw" required/>
        <br></br>
      <button type="submit" onClick={login}>Login</button>
     </form>
    </div>
)
}