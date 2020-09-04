import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced,setOrderPlaced]= useState(false);

    const auth = useAuth();
    
    const handelPlaceOrder = () => {
        setCart([]);
        processOrder();
    }

    const removeProduct = (productKey)=>{
        console.log('remove clicked',productKey);
        const newCart = cart.filter(pd=> pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key=> {
        const product = fakeData.find(pd=>pd.key === key);
        product.quantity = savedCart[key];
        return product;
           });
         setCart(cartProducts);
    },[])
    return (
        <div className="shop-container">
            <div className="product-container">
            <h1>Cart Item:{cart.length}</h1>
            {
                cart.map(pd=> <ReviewItem
                 key= {pd.key}
                 removeProduct={removeProduct}
                 product={pd}></ReviewItem>)
            }
            
            {
                !cart.length && <h1>Your cart is empty. <a href="/shop">Keep Shopping</a></h1>
            }
            </div>

            <div className="cart-container">
            <Cart cart={cart}>
                <Link to="/ship">
                {
                    auth.user?
                    <button className="main-button"> Order</button>
                    : <button className="main-button"> Order to log in</button>
                }
                </Link>
               
            </Cart>
            </div>
           
        </div>
    );
};

export default Review;