import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import {UserRegistration} from './UserRegistration';
import { useNavigate } from "react-router-dom";

export function GoogleSignIn() {
    
    const [ profile, setProfile ] = useState(null);
    
    const clientId = '890549661282-mkp51pljhc04u5cmpk85hv67ho8upvaq.apps.googleusercontent.com';
    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        setProfile(res.profileObj);
    };

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const navigate = useNavigate();
    const logOut = () => {
        setProfile(null);
        navigate("/signin"); 
    };

    return (
        <div>
            {profile ? (
                <div>  
                    <UserRegistration givenName = {profile.givenName} familyName = {profile.familyName} email = {profile.email}/>
                    <GoogleLogout clientId={clientId} buttonText="Remove google profile import" onLogoutSuccess={logOut} />
       
                </div>
            ) : (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            )}
        </div>
    );
};

export default GoogleSignIn;
