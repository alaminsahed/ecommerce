import React from 'react';
import { useAuth } from '../Login/useAuth';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total,prd)=> total+prd.price,0);
    // const user = useContext(UserContext);
   const auth= useAuth();
    let total=0;
    for(let i=0;i<cart.length;i++)
    {
        const product = cart[i];
        total = product.price * product.quantity+ total ;
        
    }

    let shipping = 0;
    const itemOrder = cart.length;
    // console.log(itemOrder);
    if (itemOrder>=1 && itemOrder<=3)
    {
        shipping = 25;
    }
    else if (itemOrder>=4) {
        shipping = 50;
    }
    else{
        shipping = 0;
    }

    let tax = total/5;

    let grandTotal = Math.round(total+shipping+tax);

    const formatNumber = num =>{
        const round = Math.round(num);
        return round;
    } 
    // console.log(cart);
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Item Ordered:{cart.length} </p>
            <p><small>Total Price:{grandTotal}</small></p>
            <p><small>Shipping:{shipping}</small></p>
            <p><small>Tax(5%):{formatNumber(tax)}</small></p>
            <br/>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;