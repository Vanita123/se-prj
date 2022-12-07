import React, { useState, useEffect} from "react";
import { Link} from "react-router-dom";
import axios from "axios";
import '../styles/form.css';
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Talk from 'talkjs';

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
      roleid: ''
  };
  const clientId = '890549661282-mkp51pljhc04u5cmpk85hv67ho8upvaq.apps.googleusercontent.com';
  useEffect(() => {
      const initClient = () => {
          gapi.client.init({
              clientId: clientId,
              scope: ''
          });
      };
      gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res) => {
    setProfile(res.profileObj);
};

const onFailure = (err) => {
    console.log('failed', err);
};

const logOut = () => {
    setProfile(null);
    navigate("/signin"); 
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
       const user ={
        id:profile.username,
        name: profile.fname+' '+profile.lname,
        email: profile.email,
        photoUrl: '/test.jpg',
        welcomeMessage: 'Hello,'+' '+profile.fname+' here!',
        role: profile.role,
      };
      const userJSON = JSON.stringify({
        "name": profile.fname+' '+profile.lname,
"email": [profile.email],
"welcomeMessage": "Hello,"+" "+profile.fname+" here!",
"photoUrl": "/test.jpeg",
"role":profile.role
      })
      const url =   "https://api.talkjs.com/v1/tWWjpWJv/users/"+profile.username;
      fetch(url, 
         {
            
            method: 'PUT',
            headers : {
              'Content-Type': 'application/json',
              'Authorization': `Bearer sk_test_k8p8zNNQmwjqINnzBNE2MEC47YRm7vQN`
            },
            body:userJSON
      }).then((response) => response.json()).then((json) => {console.log(json)});

      const admin = new Talk.User({
        id: 'Admin123',
        name: 'Pawsome Admin',
        email: 'pawsome@gmail.com',
        photoUrl: '/test.jpg',
        welcomeMessage: 'Hey, admin here!',
        role: 'admin',
      });

      const session = new Talk.Session({
        appId: 'tWWjpWJv',
        me: user,
      });

      const conversationId = Talk.oneOnOneId(user, admin);
      const conversation = session.getOrCreateConversation(conversationId);
      conversation.setParticipant(user);
      conversation.setParticipant(admin);

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
   <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
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