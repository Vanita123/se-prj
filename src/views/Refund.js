import { useEffect, useState } from "react";
import axios from "axios";

export default function Refund(){
    const [refund, setRefund] = useState([]);
    const roleid = localStorage.getItem('roleid');

    useEffect(()=>{
        //get refunds of the loggedin user
       

        axios.post("http://localhost:3000/refund-owner", {
        username:localStorage.getItem("username"),
        }).then((response) => {
         if(response.data){
            setRefund(response.data);
            console.log(refund);
         }
        });

    },[]);

    function handleAdminRequest(details) {
        console.log(details);
     
        //backend - route the refund to the owner 
    }

    function RenderTable(){
        const tbodyData = refund;
        const theadData = ['id','booking_id','refund_reason'];

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
                {roleid == 3 ?<td key='action'>
                    <div className="btn-group">
                    <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={() => handleAdminRequest(row)}>Approve refund</button>
                    </div>
                    </td> : null }
                </tr>;
                })}
              
                </tbody>
                </table>
           )
    }

    return (
        <div className="table-content">
            <h3>Refunds page</h3>
            {refund.length > 0 ? <RenderTable/> : null}
        </div>
    )
}