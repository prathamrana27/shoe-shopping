import React from 'react';

function Cart({ cart, placeOrder }) {
  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
              </div>
            ))}
          </div>
          <button onClick={placeOrder} id="buy-button">Buy Now</button>
        </>
      )}
    </div>
  );
}

export default Cart;
