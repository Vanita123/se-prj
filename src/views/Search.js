import React, { useState } from "react";
import axios from "axios";
import '../styles/form.css';

export function Search(){
    const [filters,setFilters] = useState({
        pet : [],
        size : [],
        temp : '',
        breed:[],
        color : [],
        age:[],
        other:[],
        searchQuery : ''
    });



    const handleChange = (event) => {
        console.log(filters);
        const { name, value} = event.target;

        const arr_filters = ['pet', 'size','breed','age','other','color']

        if(arr_filters[name]!=-1){
            const {checked} = event.target;
            if(checked){
                setFilters({ ...filters, [name]: [...filters[name], value] });
            }
            else{
                setFilters({ ...filters, [name]: [name].filter((e)=> e!== value ) });
            }
        }
        else
            setFilters({ ...filters, [name]:value });

        
      };

      const handleSubmit = (event) => {
            console.log(filters);
            axios.post("/search", {
              pet: filters.pet,
              size : filters.size,
              temp: filters.temp,
              breed: filters.breed,
              color: filters.color,
              age: filters.age,
              searchQuery: filters.searchQuery,
              other: filters.other,
            }).then((response) => {
             console.log(response);
            });
              // prevents the submit button from refreshing the page
              event.preventDefault();

            };
      
        //Check the filters output in the console to get the data


return(
    <div>
        <form class="nosubmit">
  <input className="nosubmit" name="searchQuery" type="search" placeholder="Search..." onChange = {handleChange}/>
  <button type="submit" onClick={handleSubmit} className="button button-primary button-wide-mobile button-sm">Search</button>
</form>
<div className='search-area'>
    <div className='filters'>
        <h3>Filters</h3>
        <h4>Pet</h4>
        <input type="checkbox" name="pet" value="dog" onChange = {handleChange}/> 
        <label >Dogs</label>
        <br/>
        <input type="checkbox" name="pet" value="cat" onChange = {handleChange}/>
        <label >Cats</label>
        <br/>
        <input type="checkbox" name="pet" value="bird" onChange = {handleChange}/>
        <label >Birds</label>
        <h4>Size</h4>
        <input type="checkbox" name="size" value="small" onChange = {handleChange}/> 
        <label >Small</label>
        <br/>
        <input type="checkbox" name="size" value="medium" onChange = {handleChange}/>
        <label >Medium</label>
        <br/>
        <input type="checkbox" name="size" value="large" onChange = {handleChange}/>
        <label >Large</label>
        <br/>
        <h4>Temperament</h4>
            <input type="radio" name="temp" value="active" onChange = {handleChange}/>
            <label htmlFor="html">Active</label><br/>
            <input type="radio" name="temp" value="passive" onChange = {handleChange}/>
            <label htmlFor="css">Passive</label><br/>

        <h4>Breed</h4>
        <input type="checkbox" name="breed" value="Labrador Retriever" onChange = {handleChange}/> 
        <label>Labrador Retriever</label>
        <br/>
        <input type="checkbox" name="breed" value="French Bulldog" onChange = {handleChange}/>
        <label>French Bulldog</label>
        <br/>
        <input type="checkbox" name="breed" value="Golden Retriever" onChange = {handleChange}/>
        <label>Golden Retriever</label>
        <br/>
        <input type="checkbox" name="breed" value="German Shepherd Dog" onChange = {handleChange}/>
        <label>German Shepherd Dog</label>
        <br/>
        <input type="checkbox" name="breed" value="Poodle" onChange = {handleChange}/>
        <label>Poodle</label>
        <br></br>
        <hr></hr>
        <br></br>
        <input type="checkbox" name="breed" value="Domestic Shorthair" onChange = {handleChange}/>
        <label htmlFor='Domestic Shorthair'>Domestic Shorthair</label>
        <br/>
        <input type="checkbox" name="breed" value="American Shorthair" onChange = {handleChange}/>
        <label htmlFor='American Shorthair'>American Shorthair</label>
        <br/>
        <input type="checkbox" name="breed" value="Domestic Longhair" onChange = {handleChange}/>
        <label htmlFor='Domestic Longhair'>Domestic Longhair</label>
        <br/>
        <input type="checkbox" name="breed" value="Maine Coon" onChange = {handleChange}/>
        <label htmlFor='Maine Coon'>Maine Coon</label>
        <br/>
        <input type="checkbox" name="breed" value="Siamese" onChange = {handleChange}/>
        <label htmlFor='Siamese'>Siamese</label>
        <br/>
        <h4>Color</h4>
        <input type="checkbox" name="color" value="white" onChange = {handleChange}/>
        <label htmlFor='white'>White</label>
        <br></br>
        <input type="checkbox" name="color"  value="black" onChange = {handleChange}/>
        <label htmlFor='black'>Black</label>
        <br></br>
        <input type="checkbox" name="color" value="brown" onChange = {handleChange}/>
        <label htmlFor='brown'>Brown</label>
        <br></br>
        <h4>Age</h4>
        <input type="radio" name="age" value="early age" onChange = {handleChange}/>
  <label htmlFor="early">Early age</label>
<br/>
  <input type="radio"  name="age" value="middle age" onChange = {handleChange}/>
  <label htmlFor="middle">Middle age</label><br/>
<input type="radio" name="age" value="old age" onChange = {handleChange}/>
  <label htmlFor="old">Old age</label><br/>
        <h4>Other</h4>
        <input type="checkbox" name="other" value="no_shedding" onChange = {handleChange}/>
        <label htmlFor='white'>No shedding</label>
        <br></br>
        <input type="checkbox" name="other" value="no_biting" onChange = {handleChange}/>
        <label htmlFor='black'>No biting</label>
        <br></br>
        <input type="checkbox" name="other" value="non-allergic" onChange = {handleChange}/>
        <label htmlFor='brown'>Non-allergic</label>
        <br></br>
        <input type="checkbox" name="other" value="vaccinated" onChange = {handleChange}/>
        <label htmlFor='brown'>Vaccinated</label>
        <br></br>
    </div>
    <div className='results'> <h3>Results section</h3></div>
</div>
    </div>
)
};

export default Search;