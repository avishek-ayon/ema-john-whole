import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart,setCart]=useState([]);
    const[orderPlaced,setOrderPlaced]=useState(false);
    const auth=useAuth();

    const handlePlaceOrder=()=>{
         setCart([]);
         setOrderPlaced(true);
         processOrder();

        //console.log("order placed");
    }
    

//websitr theke remove kora
    const removeProduct=(productKey)=>
    {
        console.log("clicked",productKey);
        const newCart=cart.filter(pd=>pd.key!==productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        //const count=productKeys.map(keys=>savedCart[keys])
        const cartProducts=productKeys.map(keys=>{
            const product=fakeData.find(pd=> pd.key === keys);
            product.quantity=savedCart[keys];
            return product;
        });
        setCart(cartProducts);
    },[]);
    let thankyou;
    if(orderPlaced)
    {
        thankyou=<img src={happyImage} alt=""/>
  
    }
    return (
        <div className="twin-component">
            <div className="product-container">
            
            {
                cart.map(pd=><ReviewItem
                key={pd.key}
                removeProduct={removeProduct}
                 product={pd}></ReviewItem>)
            }
            {thankyou}
            {!cart.length && <h1>You have not added yet.<a href='/shop'>Keep Shoping</a></h1>}


            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='shipment'>
                        {
                            auth.user?
                            <button className="main-button">Proceed Checkout</button>
                            : <button className="main-button">Login to Proceed</button>
                        }
                    </Link>
                 </Cart>
            </div>
        </div>
    
    );
};

export default Review;