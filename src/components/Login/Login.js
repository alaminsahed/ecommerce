import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handelSignIn = () =>{
        auth.signInWithGoogle()
        .then (res => {
            window.location.pathname = "/review";
        })
    }

    const handelSignOut = () =>{
        auth.signOut()
        .then(res=>{
            window.location.pathname= "/"
        })
    }
   
    return (
        <div>
            <h1>Join the party</h1>
            {
                auth.user? <button onClick={handelSignOut }>signout</button>:
                <button onClick={handelSignIn}>signin with google</button>
            }
            
        </div>
        
    );
};

export default Login;