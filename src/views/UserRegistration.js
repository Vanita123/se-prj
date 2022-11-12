import React, { useState} from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import '../styles/form.css';
import { useNavigate } from "react-router-dom";

export function UserRegistration(props){
    const navigate = useNavigate();
    const emptyState = {
      fname : props.givenName || '',
      lname : props.familyName || '',
      email : props.email || '',
      phno : '',
      role : '',
      sq1 : '',
      sq2 : '',
      zipcode:'',
      adress: '',
      country: '',
      state: '',
      county: '',
      pswd : '',
      pswd1 : '',
      username : '',
      roleid: profile.role == 'Renter' ? 1 : 2
  };
    
    const [ profile, setProfile ] = useState(emptyState);

    const [errorMsg, setErrorMessage] = useState('');

    const handleChange = (event) => {
        setProfile({ ...profile, [event.target.name]: event.target.value });
      };

    const handleSubmit = (event) => {
      console.log("Here in SignUp")
      axios.post("http://localhost:3000/signin", {
        fname: profile.fname,
        lname : profile.lname,
        email: profile.email,
        phone: profile.phno,
        role: profile.role,//role_id?
        sq1: profile.sq1,
        sq2: profile.sq2,
        zipcode: profile.zipcode,
        address: profile.adress,
        country: profile.country,
        city:profile.city,
        state: profile.state,
        password: profile.pswd,
        roleid: profile.role == 'Renter' ? 1 : 2
      }).then((response) => {
      console.log('response')
       console.log(response);
       console.log(response.data);
       profile.username = response.data.username;
       
       if(profile.username){
        localStorage.setItem("username", JSON.stringify(profile.username));
       localStorage.setItem("roleid", JSON.stringify(profile.roleid));
        navigate('/view',{state:{ name: profile.fname, view: profile.roleid, username: profile.username}});
       }
       else if (response.data.errno){
        var msg = 'Error ' + response.data.errno + ' - '+ response.data.sqlMessage;
        console.log(msg);
        alert(msg);
        setProfile(emptyState);
       }
       
      });
        // prevents the submit button from refreshing the page
        event.preventDefault();
        console.log(profile); //all the form details are here
        //navigate("/search");
      };

return (
    <div className='form-content'>
   {props ? <Link to='/gsignin'><button type="submit" className="button button-primary button-wide-mobile button-sm">Import profile from Google</button></Link> : null}
   <form action="/signin" method='POST' encType="multipart/form-date" onSubmit = {handleSubmit}>
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
      <label htmlFor="role_details"><b>Role   </b></label>
      <input type="radio" id="html" name="role" value='Renter' onChange = {handleChange} />
<label htmlFor="renter">Renter</label>
<input type="radio" id="css" name="role" value='Owner' onChange = {handleChange}/>
<label htmlFor="owner">Owner</label><br></br>
      <br></br>
      <label htmlFor="phno"><b>Security question 1 - What would you name your pet?    </b></label>
      <br></br>
      <input type="text"  maxLength={10} placeholder="Enter answer" name="sq1" value= {profile.sq1} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="phno"><b>Security question 2 - What would you name your pet home?    </b></label>
      <br></br>
      <input type="text"  maxLength={10} placeholder="Enter answer" name="sq2" value= {profile.sq2} onChange = {handleChange} required/>
      <br></br>
      
      <label htmlFor="address"><b>Address    </b></label>
      <input type="text"  placeholder="Enter address" name="adress" value= {profile.address} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="state"><b>City    </b></label>
      <input type="text"  placeholder="Enter city" name="city" value= {profile.city} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="state"><b>State    </b></label>
      <input type="text"  placeholder="Enter state" name="state" value= {profile.state} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="county"><b>Country   </b></label>
      <input type="text"  placeholder="Enter country" name="country" value= {profile.country} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="zipcode"><b>Zipcode    </b></label>
      <input type="text"  placeholder="Enter zipcode" name="zipcode" value= {profile.zipcode} onChange = {handleChange} required/>
      <br></br>
      
      
      <label htmlFor="phno"><b>Enter password    </b></label>
      
      <input type="password"  minLength={5} placeholder="Enter password" name="pswd" value= {profile.pswd} onChange = {handleChange} required/>
      <br></br>
      <label htmlFor="phno"><b>Re-enter password    </b></label>
      <input type="password"  minLength={5} placeholder="Enter password" name="pswd1" value= {profile.pswd1} onChange = {handleChange} required/>
      {profile.pswd == profile.pswd1 || profile.pswd1 == ''?  null : <label> Passwords don't match!</label> }
    </form>
    <button type="submit" onClick={handleSubmit} className="button button-primary button-wide-mobile button-sm">Register user</button>
</div>
)
}

export default UserRegistration;




