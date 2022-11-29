import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import {useLocation} from 'react-router-dom';

export default function Rating(){
    const location = useLocation();
    const [ratings, setRatings] = useState([]);
    const [giveRating, setGiveRating]=useState(false);
    const [givenRating, setGivenRating] = useState(1);
   const {giveFlow} = location.state ? location.state : {giveFlow:false} ;
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [bookingId, setBookingId] = useState();

    useEffect(()=>{
        //get reservations of the logged in user
        if(!giveFlow){
            axios.post("http://localhost:3000/ratings", {
            
        }).then((response) => {
         if(response.data){
            setRatings(response.data);//res
            console.log(ratings);
         }
        });
            
        } 
        else{
            axios.post("http://localhost:3000/reservation", {
            
        }).then((response) => {
         if(response.data){
           console.log(response);
           setReservations(response.data);
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
    function handleRequest(details) {
        setGiveRating(true);
        setBookingId(details.booking_id);  
    }
    const RenderResults = () => {
        const tbodyData = reservations;
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
                return <td key={index}>{row[key]}</td>
                })}
                <td key='action'>
                    <div className="btn-group">
                    <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={() => handleRequest(row)}>Give rating</button>
                    </div>
                    </td>
                </tr>;
                })}
                </tbody>
                </table>
           )
   }

    function handleReturn(){
        console.log(givenRating);
        console.log(bookingId);
        setGiveRating(false);
        
        //backend post call
        

        alert('Rating submitted.We will put in best efforts to improve the experience. Thank you!');
    }

    return (
        <div>
            {giveFlow && giveRating? 
            <div>
                 <h3>Pet rating </h3>
                    <br/>
                  <input type="range" min="1" max="10" value={givenRating} onInput={(e) => setGivenRating(e.target.value)} required></input>
                  <br/>
                  <h5>Rating given - {givenRating}</h5>
                  <br/>
                  <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={handleReturn}>Submit</button>
            </div> : <div><h3>Pet ratings</h3>
            {ratings.length > 0 && !giveFlow ? <RenderTable/> : null}
            {reservations.length > 0 && giveFlow && !giveRating ? <RenderResults/> : null}
            
            </div>
            }
            
        </div>
    )
}