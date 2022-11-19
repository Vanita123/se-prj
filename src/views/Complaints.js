import { useEffect, useState } from "react";

export default function Complaints(){
    const [complaints, setComplaints] = useState();

    useEffect(()=>{
        //get reservations of the logged in user
        setComplaints();
        console.log(complaints);
    })
    return (
        <div>
            <h2>Complaints page</h2>
        </div>
    )
}