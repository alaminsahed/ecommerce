import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    console.log(auth.user);
   
    return (
        <div>
            <h1>Join the party</h1>
            {
                auth.user? <button onClick={auth.signOut}>signout</button>:
                <button onClick={auth.signInWithGoogle}>signin with google</button>
            }
            
        </div>
        
    );
};

export default Login;