import { useEffect, useState } from "react";
import axios from "axios";

export default function Refund(){
    const [refund, setRefund] = useState([]);

    useEffect(()=>{
        //get refunds of the loggedin user
       

        axios.post("http://localhost:3000/refund", {
            
        }).then((response) => {
         if(response.data){
            setRefund(response.data);
            console.log(refund);
         }
        });

    },[]);

    function RenderTable(){
        const tbodyData = refund;
        const theadData = Object.keys(tbodyData[0]);

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
                </tr>;
                })}
              
                </tbody>
                </table>
           )
    }

    return (
        <div>
            <h3>Refunds page</h3>
            <RenderTable/>
        </div>
    )
}