import { useEffect, useState } from "react";
import axios from "axios";
export default function Approval(){
    const [approvals, setApprovals] = useState([]);

    useEffect(()=>{
        axios.post("http://localhost:3000/approval", {
            
                }).then((response) => {
                 if(response.data){
                   console.log(response);
                   setApprovals(response.data);
                   console.log(approvals);
                 }
                });
    },[]);

    function handleRequest(details) {
      console.log(details.booking_id);
      // backend API call - set approval true
   
    }

    function RenderTable(){
        const tbodyData = approvals;
        const theadData = ['id','name','owner','pet','bredd','amount'];

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
                <td key='action'>
                    <div className="btn-group">
                    <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={() => handleRequest(row)}>Approve</button>
                    </div>
                    </td>
                </tr>;
                })}
              {/* Add approve button */}
                </tbody>
                </table>
           )
    }

    return (
        <div className="table-content">
            <h2>Approve the pets</h2>
            {approvals.length > 0  ? <RenderTable/> : null
}
        </div>
    )
}