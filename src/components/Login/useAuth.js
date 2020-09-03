import React, { useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config'
import { useState } from "react";
import { createContext } from "react";
import { useContext } from 'react';
import {Route,Redirect  } from "react-router-dom";


firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth =() =>{
    return useContext(AuthContext);
} 

export const  PrivateRoute =({ children, ...rest }) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}



const getUser = (user) => {
    const {displayName,email,photoURL} =user;
    return{name:displayName,email,photo:photoURL};
}
const Auth = () =>{
    const [user,setUser] = useState(null); // user login failed or no user login
    

    const signInWithGoogle =() =>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then (res=> {
            const signedInUser = getUser(res.user)
            setUser(signedInUser);
            return res.user;
        })
        .catch(err=>{
            console.log(err);
            setUser(null); //no one login
            return err.message;
        })
    }
    const signOut =  () =>{
        firebase.auth().signOut()
        .then(res =>{
               setUser(null);
               return true;
        })
        .catch(error =>{
               console.log(error);
             //  return error.message;
               return  false;
        })
   
     }


        useEffect(()=>{
            firebase.auth().onAuthStateChanged(function(usr) {
                if (usr) {
                const currUser = getUser(usr);
                setUser(currUser);
                } else {
                  // No user is signed in.
                }
              });
        },[])
    
    return{
        user,
        signInWithGoogle,
        signOut
    }
}

export default Auth;