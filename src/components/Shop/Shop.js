import React, { useState, useEffect } from 'react';
import './shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from "react-router-dom";

const Shop = () => {
    // const data = fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
      fetch("http://localhost:4000/products")
        .then((res) => res.json())
        .then((data) => setProducts(data));
    }, [])

    useEffect(() => {
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);

     fetch("http://localhost:4000/productsByKeys", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(productKeys),
     })
       .then((res) => res.json())
       .then((data) => setCart(data));
      
    }, [products]);

    const handleAddProduct = (product) =>{
      const toBeAdded = product.key;
      const sameProduct = cart.find((pd) => pd.key === toBeAdded);
      let count = 1;
      let newCart;
      if(sameProduct){
        count = product.quantity + 1;
        product.quantity = count;
        const others = cart.filter(pd => pd.key !== toBeAdded);
        newCart = [...others, sameProduct];
      }
      else{
        product.quantity = 1;
        newCart = [...cart, product];
      }
      setCart(newCart);
      addToDatabaseCart(product.key, count);
      
    }
    return (
      <div className="Twin-container">
        <div className="product-container">
          {products.map((product) => (
            <Product
              key={product.key}
              showAddToCart={true}
              handleAddProduct={handleAddProduct}
              product={product}
            ></Product>
          ))}
        </div>

        <div className="cart-container">
          <Cart cart={cart}>
            <Link to="/review">
              <button className="cart-btn"> View order</button>
            </Link>
          </Cart>
        </div>
      </div>
    );
};

export default Shop;