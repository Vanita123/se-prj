import { useEffect, useState } from "react";
import axios from "axios";

export default function Refund(){
    const [refund, setRefund] = useState();

    useEffect(()=>{
        //get refunds of the loggedin user
        setRefund();
        console.log(refund);

        axios.post("http://localhost:3000/refund", {
            
        }).then((response) => {
         if(response.data){
           console.log(response);
         }
        });

    })
    return (
        <div>
            <h2>Refund page</h2>
        </div>
    )
}