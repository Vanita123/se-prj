import React from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();
    return (
        <div>
        <pre>Landing page</pre>
        <pre>Button to login/signup</pre>
        <button onClick={()=>navigate("/login")}>Continue to login</button>
        <button onClick={()=>navigate("/signin")}>Continue to signup</button>
       </div>
    );
  }