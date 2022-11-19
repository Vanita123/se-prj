import { useEffect, useState } from "react";

export default function Approval(){
    const [approvals, setApprovals] = useState();

    useEffect(()=>{
        //get reservations of the logged in user
        setApprovals();
        console.log(approvals);
    })
    return (
        <div>
            <h2>Approvals page</h2>
        </div>
    )
}