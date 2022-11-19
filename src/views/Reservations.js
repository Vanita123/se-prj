import { useEffect, useState } from "react";

export default function Reservations(){
    const [reservations, setReservations] = useState();

    useEffect(()=>{
        //get reservations of the logged in user
        setReservations();
        console.log(reservations);
    })
    return (
        <div>
            <h2>Reservation page</h2>
        </div>
    )
}