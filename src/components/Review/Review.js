import React from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from "../../fakeData";
import { useState } from 'react';
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'




const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const removeProduct = (productKey) =>{
      console.log(productKey + "clicked");
      const newCart = cart.filter(pd => pd.key !== productKey);
      
      removeFromDatabaseCart(productKey);
      setCart(newCart);

    }

    const handlePlaceOrder = () =>{

      setCart([]);
      setOrderPlaced(true);
      processOrder();
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const cartProduct = fakeData.find(pd => pd.key === key); 
            cartProduct.quantity = savedCart[key];
            return cartProduct;
        } ); 
        setCart(cartProducts);
    }, []);

    let thankYou;
    if (orderPlaced){
      thankYou = <img src={happyImage} alt=""/>
    }
      return (
        <div className="Twin-container">
          <div className="product-container">
            {cart.map((pd) => (
              <ReviewItem
                removeProduct={removeProduct}
                key={pd.key}
                product={pd}
              ></ReviewItem>
            ))}
            {thankYou}
          </div>

          <div className="cart-container">
            <Cart cart={cart}>
              <button onClick={handlePlaceOrder} className="cart-btn">
                {" "}
                Place order
              </button>
            </Cart>
          </div>
        </div>
      );
};

export default Review;