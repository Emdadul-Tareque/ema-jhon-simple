import React from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, } from '../../utilities/databaseManager';
import { useState } from 'react';
import ReviewItem from "../ReviewItem/ReviewItem";
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';




const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced] = useState(false);
    const history = useHistory();

    const removeProduct = (productKey) =>{
      console.log(productKey + "clicked");
      const newCart = cart.filter(pd => pd.key !== productKey);
      
      removeFromDatabaseCart(productKey);
      setCart(newCart);

    }

    const handleProceedCheckout = () =>{
      history.push('/shipment')
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:4000/productsByKeys', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
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
              <button onClick={handleProceedCheckout} className="cart-btn">
                {" "}
                Proceed Checkout
              </button>
            </Cart>
          </div>
        </div>
      );
};

export default Review;