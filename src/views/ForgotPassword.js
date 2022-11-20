import React, { useState } from "react";

export function ForgotPassword(){
    const [answers, setAnswers] = useState({
        'sq1':'',
        'sq2':''
    });
    const [answered, setAnswered] = useState(false);
    const [otp,setOtp] = useState();
    const [otpSent, setOtpSent] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    return (
        <div className='form-content'>
            <div className='form-element'>
            <label htmlFor="sq1" ><b>Security question 1     </b></label></div>
            <div className='form-element'>
            <input type='text' name='sq1'></input></div>
            <div className='form-element'>
            <label htmlFor="sq2" name='sq2'><b>Security question 2   </b></label></div>
            <div className='form-element'>
            <input type='text'></input></div>
            
            {answered ? <div className='form-element'>
                    <label>Enter the OTP sent to registered email  </label>
                    <input type='password' name='otp'></input>
                 </div>:null}

            {otpSent ?  <div className='form-element'>
                <label>Enter new password</label>
                <input type='password' name='newPassword'></input>
                <p>On click of the button, your password will be updated and page will be redirected to login page. Please log in using the updated credentials.</p>
                <button>Update Password</button>
                 </div> : null};     
        
        </div>
    )


};

export default ForgotPassword;