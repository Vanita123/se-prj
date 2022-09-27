import React from "react";
import { Link} from "react-router-dom";

const handleLogin = () => {
//button handler
}
export function Login(){
return (
    <div>
        <nav>
        <Link to="/">Home</Link>
        </nav>
        <pre>Login page</pre>
        
        <form class="modal-content animate" action="" method="post">
      <label htmlFor="uname"><b>Username    </b></label>
      <input type="text" placeholder="Enter Username" name="uname" required/>
      <br></br>

      <label htmlFor="psw"><b>Password  </b></label>
      <input type="password" placeholder="Enter Password" name="psw" required/>
        <br></br>
      <button type="submit" onClick={handleLogin}>Login</button>
     </form>
    </div>
)
}