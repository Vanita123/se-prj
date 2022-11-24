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
        
        setApprovals();
        console.log(approvals);
    })
    return (
        <div>
            <h2>Approvals page - Admin view</h2>
        </div>
    )
}