import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProducts = () => {
        fetch("http://localhost:4000/addProducts", {
            method:"POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(fakeData)
        });
    }
    return (
      <div>
        <form action="">
            <p><span>Name: </span><input type="text"/></p>
            <p><span>Price: </span><input type="text"/></p>
            <p><span>Quantity: </span><input type="text"/></p>
            <p><span>Product image: </span><input type="file"/></p>
          <button onClick={handleAddProducts}>Add Product</button>
        </form>
      </div>
    );
};

export default Inventory;