import { useEffect, useState } from "react";

export default function Refund(){
    const [refund, setRefund] = useState();

    useEffect(()=>{
        //get refunds of the loggedin user
        setRefund();
        console.log(refund);
    })
    return (
        <div>
            <h2>Refund page</h2>
        </div>
    )
}