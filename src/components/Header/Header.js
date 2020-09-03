import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';
import { useRef } from 'react';


// const usePrevious = value => { // have to use "use" to create custom hook
//     const prev = useRef();      //useRef build in hook element,useRef.current collects previous value;
//     console.log("pc",prev.current);
//     useEffect(()=>{
//         console.log("v",value);
//        prev.current = value; //.current collects current value & it goes to no 11 line
//     },[value])  // Only re-run if value changes
//     return prev.current;  // Return previous value (happens before update in useEffect above)
// } 
const Header = () => {
    // const [count,setCount] = useState(0);
    // console.log("c",count);
    // const previous = usePrevious(count);
    const auth = useAuth();
    
    return (
        <div className="header">
           <img src={logo} alt="logo"></img>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/inventory">Manage Inventory</a>
                
                {
                    auth.user ? <span style={{color:'yellow'}}>Welcome {auth.user.name}</span>:
                    <a href="/login">Sign In</a>
                    
                }
            </nav>
        </div>
    );
};

export default Header;