import React from 'react';


const Cart = (props) => {
    const cart = props.cart;
    console.log();
    let total = 0;
    cart.map((product) => (total = total + product.price * product.quantity || 1));
    let shipping = 0;
    if(total > 15 && total <= 30){
        shipping = 3.00;
    }
    else if( total > 30){
        shipping = 0;
    }
    else if( total > 0 && total <= 15){
        shipping = 5.00
    }

    const tax = Number((total * 0.01).toFixed(2));
    const grandTotal = (total + shipping + tax).toFixed(2);
    total = total.toFixed(2);


    return (
      <div>
        <h1>Order summary</h1>
        <h3>Items: {cart.length} </h3>
        <h3>Product Price: ${total} </h3>
        <h3>Shipping: ${shipping} </h3>
        <h3>Tax & Vat: ${tax} </h3>
        <h3>Total price: ${grandTotal} </h3>
        {
          props.children
        }
      </div>
    );
};

export default Cart;