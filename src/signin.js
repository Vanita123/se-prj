import React, { useState} from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin(props){
    const navigate = useNavigate();
    // const [fname, setFname] = useState("");
    // const [lname, setLname] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhoneNo] = useState("");
    // const [sq2 , setSq2] = useState("");
    // const [sq1 , setSq1] = useState("");
    // const [password , setPassword] = useState("");
    
    const [ profile, setProfile ] = useState(
        {
            fname : props.givenName || '',
            lname : props.familyName || '',
            email : props.email || '',
            phno : '',
            role : '',
            sq1 : '',
            sq2 : ''

        }
    );
    const handleChange = (event) => {
        setProfile({ ...profile, [event.target.name]: event.target.value });
      };

    const handleSubmit = (event) => {
      axios.post("/signin", {
        fname: profile.fname,
        lname : profile.lname,
        email: profile.email,
        phone: profile.phone,
        role: profile.role,
        sq1: profile.sq1,
        sq2: profile.sq2,
        password: '',

        
      }).then((response) => {
       console.log(response)
      });
        // prevents the submit button from refreshing the page
        event.preventDefault();
        console.log(profile); //all the form details are here
      };

return (
    <div>
         <nav>
        <Link to="/">Home</Link>
        </nav>
    <pre>Sign in page</pre>
    <br></br>
   {props ? <button type="submit" onClick={()=>navigate("/gsignin")}>Import profile from Google</button> : null}
   <form action="/signin" method='POST' onSubmit = {handleSubmit}>
    <label htmlFor="fname"><b>First name    </b></label>
      <input type="text"  placeholder="Enter first name" name="fname" value= {profile.fname} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="lname"><b>Last name    </b></label>
      <input type="text"  placeholder="Enter last name" name="lname" value= {profile.lname} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="email"><b>Email ID    </b></label>
      <input type="email"  placeholder="Enter email ID" name="email" value= {profile.email} onChange = {handleChange}  required/>
      <br></br>
      <label htmlFor="phno"><b>Phone number    </b></label>
      <input type="number"  maxLength={10} placeholder="Enter phone number" name="phno" value= {profile.phno} onChange = {handleChange}  required/>
      <br></br>
      <label htmlFor="role"><b>Role   </b></label>
      <input type="radio" id="html" name="role" value="renter" checked = {profile.role === 'renter'} onChange = {handleChange} />
<label htmlFor="html">Renter</label>
<input type="radio" id="css" name="role" value="owner" checked = {profile.role === 'owner'} onChange = {handleChange}/>
<label htmlFor="css">Owner</label><br></br>
      <br></br>
      <label htmlFor="phno"><b>Security question 1 - What would you name your pet?    </b></label>
      <br></br>
      <input type="text"  maxLength={10} placeholder="Enter answer" name="sq1" value= {profile.sq1} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="phno"><b>Security question 2 - What would you name your pet home?    </b></label>
      <br></br>
      <input type="text"  maxLength={10} placeholder="Enter answer" name="sq2" value= {profile.sq2} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="phno"><b>Enter password    </b></label>
      
      <input type="password"  minLength={5} placeholder="Enter password" name="pswd" value= {profile.pswd} onChange = {handleChange} required/>
      <br></br>
      <button type="submit" onClick={handleSubmit}>Register user</button>
    </form>
</div>
)
}




