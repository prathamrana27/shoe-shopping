import React from 'react';

function Shoes({ shoe, addToCart }) {
  return (
    <div className="shoe-item">
      <img src={shoe.image} alt={shoe.name} />
      <h3>{shoe.name}</h3>
      <p>Price: ${shoe.price}</p>
      <button onClick={() => addToCart(shoe)}>Add to Cart</button>
    </div>
  );
}

export default Shoes;
