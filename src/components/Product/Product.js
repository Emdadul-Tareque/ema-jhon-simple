import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import './Product.css'

const Product = (props) => {
    const{name, img, price, seller, stock} = props.product;
    console.log(props.product);
    return (
      <div className="product">
        <div className="img">
          <img src={img} alt="" />
        </div>
        <div className="product-details">
          <h4 className="product-name"> {name} </h4>
          <p>by: {seller} </p>
          <h3>price: {price} </h3>
          <p>Only {stock} left in stock-order soon</p>
          <button 
            className="cart-btn" 
            onClick={() => props.handleAddProduct(props.product)}
            >
            <FontAwesomeIcon icon={faShoppingCart} />
            add to cart
          </button>
        </div>
      </div>
    );
};

export default Product;