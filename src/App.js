import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import {Login} from './login';
import {Signin} from './signin';
import {Home} from './home';
import {GoogleSignIn} from './gsignin';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/gsignin" element={<GoogleSignIn />} />
      </Routes>
    </div>
    
  );
}



export default App;
