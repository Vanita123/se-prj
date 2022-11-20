import { useEffect, useState } from "react";

export default function Rating(){
    const [ratings, setRatings] = useState();

    useEffect(()=>{
        //get reservations of the logged in user
        setRatings();
        console.log(ratings);
    })
    return (
        <div>
            <h2>Ratings page</h2>
        </div>
    )
}