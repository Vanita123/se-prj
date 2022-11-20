import { useEffect, useState } from "react";

export default function Approval(){
    const [approvals, setApprovals] = useState();

    useEffect(()=>{
        //get all pet reservations that have approved feild as False - give an Approve button to admin - onclick set Approved field to True
        //Have 2 sections - to Approve & approved 
        setApprovals();
        console.log(approvals);
    })
    return (
        <div>
            <h2>Approvals page</h2>
        </div>
    )
}