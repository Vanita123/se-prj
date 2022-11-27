import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import {useLocation} from 'react-router-dom';

export default function Rating(){
    const location = useLocation();
    const [ratings, setRatings] = useState([]);
    const [givenRating, setGivenRating] = useState(1);
    const {giveRating} = location.state ? location.state : {giveRating:false} ;
    const navigate = useNavigate();

    useEffect(()=>{
        //get reservations of the logged in user
        if(!giveRating){
            axios.post("http://localhost:3000/rating", {
            
        }).then((response) => {
         if(response.data){
            setRatings(response.data);//res
            console.log(ratings);
         }
        });
            
        }    
    },[]);

    function RenderTable(){
        const tbodyData = ratings;
        const theadData = Object.keys(tbodyData[0]);

                return (
            <table>
                <thead>
                <tr>
                {theadData.map(heading => {
                return <th key={heading}>{heading}</th>
                })}
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((row, index) => {
                return <tr key={index}>
                {theadData.map((key, index) => {
                return <td key={row[key]}>{row[key]}</td>
                })}
                </tr>;
                })}
              
                </tbody>
                </table>
           )
    }

    function handleRating(e){
        setGivenRating(e.target.value)
    }

    function handleReturn(){
        //update the pet rating here 
        

        console.log(givenRating);
        navigate('/reservations');
    }

    return (
        <div>
            {giveRating ? 
            <div>
                 <label for="rating">Pet rating: </label>
                  <input type="range" min="1" max="10" value="1" onInput={(e) => handleRating(e)} required></input>
                  <h5>Rating given - {givenRating}</h5>
                  <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleReturn()}>Submit</button>
            </div> : <div><h3>Pet ratings</h3>
            <RenderTable/></div>
            }
            
        </div>
    )
}