//import React, { useState} from "react";
import React, { useState } from "react";
import axios from "axios";
//import axios from "axios";
import '../styles/form.css';
//import { useNavigate } from "react-router-dom";

export function PetRegistration(){
    //const navigate = useNavigate();
  
    const [ petDetails, setPetDetails ] = useState(
        {
            fname:JSON.parse(localStorage.getItem('username')),//username of the owner
            name:'',
            type:'',
            size:'',
            temperament:'',
            breed:'',
            color:'',
            age:'',
            no_shedding: false,
            no_biting: false,
            non_allergic: false,
            vaccinated : false,
            image:null,
            pet_price:''
        }
    );

    const [registrationDone, setRegistrationDone] = useState(false);
    

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = () => {
          reject('error');
        };
      });
    };
  
    const handleImage = async (e) => {
      const file = e.target.files[0];
      console.log('URL');
      console.log(URL.createObjectURL(file));
      setPetDetails({ ...petDetails, image:URL.createObjectURL(file)});
    };

    const handleChange = (event) => {
      console.log(event.target);
      setPetDetails({ ...petDetails, [event.target.name]: event.target.value });
      console.log(petDetails);
      };

    const handleSubmit = (event) => {
      axios.post("http://localhost:3000/petRegistration", {
        breed: petDetails.breed,
        fname:petDetails.fname,//username of the owner
        type:petDetails.type,
        size: petDetails.size,
        temperament: petDetails.temperament,
        no_shedding: petDetails.no_shedding,
        no_biting: petDetails.no_biting,
        non_allergic: petDetails.non_allergic,
        vaccinated : petDetails.vaccinated,
        name: petDetails.name,
        color :petDetails.color,
        age:petDetails.age,
        image : petDetails.image,
        pet_price: petDetails.pet_price
            }).then((response) => {
              console.log(response);
              if(response.data){
                setRegistrationDone(true);
              }
            
            });
              // prevents the submit button from refreshing the page
              event.preventDefault();
          
      //need to handle
      event.preventDefault();
      };

return (
  <div style={{padding:'8px'}}>
  {registrationDone ? <h3 > {petDetails.fname}, your pet registration was successful! We'll inform you whenever an order for your pet is made.</h3> :
    <div className='form-content'>
   <form action="/petRegistration" encType="multipart/formdata" method='POST' onSubmit = {handleSubmit}>
    <h3>Pet registration form</h3>
    <h4>Pet owner's username  </h4>
      <input type="text" value={petDetails.fname} required readOnly/>
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
{petDetails.type=='dog' ? <select name="breed" id="breed" onChange = {handleChange}>
<option value="">-- None --</option>
    <option value="Labrador Retriever">Labrador Retriever</option>
  <option value="French Bulldog">French Bulldog</option>
  <option value="Golden Retriever">Golden Retriever</option>
  <option value="German Shepherd Dog">German Shepherd Dog</option>
  <option value="Poodle">Poodle</option>
</select> : null}

{petDetails.type=='cat' ? <select name="breed" id="breed" onChange = {handleChange}>
<option value="">-- None --</option>
    <option value="Domestic Shorthair">Domestic Shorthair</option>
  <option value="American Shorthair">American Shorthair</option>
  <option value="Domestic Longhair">Domestic Longhair</option>
  <option value="Maine Coon">Maine Coon</option>
  <option value="Siamese">Siamese</option>
</select> : null}

<br/>
<h4>Pet color</h4>
<select name="color" id="color" onChange = {handleChange}>
<option value="">-- None --</option>
    <option value="White">White</option>
  <option value="Black">Black</option>
  <option value="Brown">Brown</option>
</select>
<br/>
<h4>Pet age</h4>
<select name="age" id="age" onChange = {handleChange}>
<option value="">-- None --</option>
    <option value="early age">Early age</option>
  <option value="middle age">Middle age</option>
  <option value="old age">Old age</option>
</select>
<br/>
<br/>
<input type="checkbox" name="no_shedding" checked={petDetails.no_shedding} onChange={(e)=>{setPetDetails({ ...petDetails, [e.target.name]: !petDetails.no_shedding });}} />
        <label htmlFor='white'>No shedding</label>
        <br></br>
        <input type="checkbox" name="no_biting" checked={petDetails.no_biting} onChange={(e)=>{setPetDetails({ ...petDetails, [e.target.name]: !petDetails.no_biting });}}/>
        <label htmlFor='black'>No biting</label>
        <br></br>
        <input type="checkbox" name="non_allergic" checked={petDetails.non_allergic} onChange={(e)=>{setPetDetails({ ...petDetails, [e.target.name]: !petDetails.non_allergic});}} />
        <label htmlFor='brown'>Non-allergic</label>
        <br></br>
        <input type="checkbox" name="vaccinated" checked={petDetails.vaccinated} onChange={(e)=>{setPetDetails({ ...petDetails, [e.target.name]: !petDetails.vaccinated });}}/>
        <label htmlFor='brown'>Vaccinated</label>
        <br></br>
        <br/>
        <h4>Pet picture (max size - 1MB)</h4>
        <input type="file" id="image" accept=".jpeg, .png, .jpg" name="pet_image" onChange={handleImage}></input>
        <br/>
        <h4>Pet price (USD per hour)</h4>
        <input type="text" id="pet_price" name="pet_price" placeholder="Enter USD per hour" onChange = {handleChange}></input>
        <br/>
    </form>


    <button type="submit" onClick={handleSubmit} className="button button-primary button-wide-mobile button-sm">Register pet</button>
</div>}
</div>
)
}

export default PetRegistration;




