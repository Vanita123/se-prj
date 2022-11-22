import { useEffect, useState } from "react";
import axios from "axios";
export default function Approval(){
    const [approvals, setApprovals] = useState();

    useEffect(()=>{
        axios.post("http://localhost:3000/approval", {
            
                }).then((response) => {
                 if(response.data){
                   console.log(response);
                 }
                });
        
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