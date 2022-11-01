import React, { useState} from "react";

//import axios from "axios";
import '../styles/form.css';
//import { useNavigate } from "react-router-dom";

export function PetRegistration(){
    //const navigate = useNavigate();
    
    const [ petDetails, setPetDetails ] = useState(
        {
            breed:'',
            fname:'',//username of the owner
            type:'',
            size:'',
            temperament:'',
            no_shedding:false,
            no_biting:false,
            non_allergic:false,
            vaccinated : false,
            name:''
        }
    );
    const handleChange = (event) => {
    
      setPetDetails({ ...petDetails, [event.target.name]: event.target.value });
      console.log(petDetails);
      };

    const handleSubmit = (event) => {
      //need to handle
      event.preventDefault();
      };

return (
    <div className='form-content'>
   <form action="/petRegistration" method='POST' onSubmit = {handleSubmit}>
    <h3>Pet registration form</h3>
    <h4>Pet owner's username  </h4>
      <input type="text"  placeholder="Enter username" name="fname" onChange = {handleChange} required/>
      <br></br>
      <h4>Pet name</h4>
      <input type="text"  placeholder="Enter pet name" name="name" onChange = {handleChange} required/>
      <br></br>
<br/>
      <h4>Pet type</h4>
        <input type="radio" name="type" value="dog" onChange = {handleChange}/>
  <label htmlFor="dog">Dog</label>
<br/>

  <input type="radio"  name="type" value="cat" onChange = {handleChange}/>
  <label htmlFor="cat">Cat</label><br/>
<input type="radio" name="type" value="bird" onChange = {handleChange}/>
  <label htmlFor="bird">Bird</label><br/>
<br></br>
      <h4>Pet size</h4>
        <input type="radio" name="size" value="small" onChange = {handleChange}/>
  <label htmlFor="small">Small</label>
<br/>
  <input type="radio"  name="size" value="medium" onChange = {handleChange}/>
  <label htmlFor="medium">Medium</label><br/>
<input type="radio" name="size" value="large" onChange = {handleChange}/>
  <label htmlFor="large">Large</label><br/>
<h4>Pet temperament</h4>
        <input type="radio" name="temperament" value="active" onChange = {handleChange}/>
  <label htmlFor="active">Active</label>
<br/>
  <input type="radio"  name="temperament" value="passive" onChange = {handleChange}/>
  <label htmlFor="passive">Passive</label><br/>
<h4>Pet breed</h4>
<h6>Please select the pet type to load the breed options.</h6>
{petDetails.type=='dog' ? <select name="breed" id="breed">
    <option value="Labrador Retriever">Labrador Retriever</option>
  <option value="French Bulldog">French Bulldog</option>
  <option value="Golden Retriever">Golden Retriever</option>
  <option value="German Shepherd Dog">German Shepherd Dog</option>
  <option value="Poodle">Poodle</option>
</select> : null}

{petDetails.type=='cat' ? <select name="breed" id="breed">
    <option value="Domestic Shorthair">Domestic Shorthair</option>
  <option value="American Shorthair">American Shorthair</option>
  <option value="Domestic Longhair">Domestic Longhair</option>
  <option value="Maine Coon">Maine Coon</option>
  <option value="Siamese">Siamese</option>
</select> : null}

<br/>
<h4>Pet color</h4>
<select name="color" id="color">
    <option value="White">White</option>
  <option value="Black">Black</option>
  <option value="Brown">Brown</option>
</select>
<br/>
<h4>Pet age</h4>
<select name="age" id="age">
    <option value="early age">Early age</option>
  <option value="middle age">Middle age</option>
  <option value="old age">Old age</option>
</select>
<br/>
<br/>
<input type="checkbox" name="no_shedding" value={(e)=>{return e.checked}} onChange = {handleChange}/>
        <label htmlFor='white'>No shedding</label>
        <br></br>
        <input type="checkbox" name="no_biting" value={(e)=>{return e.checked}} onChange = {handleChange}/>
        <label htmlFor='black'>No biting</label>
        <br></br>
        <input type="checkbox" name="non_allergic" value={(e)=>{return e.checked}} onChange = {handleChange}/>
        <label htmlFor='brown'>Non-allergic</label>
        <br></br>
        <input type="checkbox" name="vaccinated" value={(e)=>{return e.checked}} onChange = {handleChange}/>
        <label htmlFor='brown'>Vaccinated</label>
        <br></br>
        <br/>
        <h4>Pet picture</h4>
        <input type="file" id="pet_image" name="pet_image"></input>
        <br/>
        <br/>
    </form>


    <button type="submit" onClick={handleSubmit} className="button button-primary button-wide-mobile button-sm">Register pet</button>
</div>
)
}

export default PetRegistration;




