import React, { useState } from 'react';
import Shoes from './Shoes';
import Cart from './Cart';
import Profile from './Profile';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // For toggling profile view

  // User registration details
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Sample shoes data
  const shoes = [
    { id: 1, name: 'Ant-Man Themed Shoes', price: 100, image: 'Shoes1.jpg' },
    { id: 2, name: 'Naruto Inspired Shoes', price: 120, image: 'Shoes2.jpg' },
    { id: 3, name: 'Spidey Shoes', price: 190, image: 'Shoes3.jpg' },
    { id: 4, name: 'Black Panther Themed Shoes', price: 170, image: 'Shoes5.jpg' },
    { id: 5, name: "Captain's Own Shoes", price: 140, image: 'Shoes7.jpg' }
  ];

  // Handle input changes for new user
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  // Handle input changes for login credentials
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  // Register user
  const createAccount = () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      setErrorMessage('All fields are required to create an account');
      return;
    }

    localStorage.setItem('user', JSON.stringify(newUser));
    setIsAccountCreated(true);
    setErrorMessage('');
    alert('Account created successfully! Please login to continue.');
  };

  // Login user
  const login = () => {
    if (!userCredentials.email || !userCredentials.password) {
      setErrorMessage('Email and password are required to login');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === userCredentials.email && storedUser.password === userCredentials.password) {
      setCurrentUser(storedUser);
      setIsLoggedIn(true);
      setErrorMessage('');
      alert('Login successful!');
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  // Add shoe to cart
  const addToCart = (shoe) => {
    setCart((prevCart) => [...prevCart, shoe]);
  };

  // Place order
  const placeOrder = () => {
    if (cart.length > 0) {
      setCart([]);
      setOrderSuccess(true);
      setTimeout(() => setOrderSuccess(false), 3000); // Reset message after 3 seconds
    } else {
      setErrorMessage('Your cart is empty.');
    }
  };

  // Toggle profile view
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Welcome to ShoeShop</h1>
        <div className="header-icons">
          <div className="cart-icon">
            <span className="cart-count">{cart.length}</span>
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="profile-icon" onClick={toggleProfile}>
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>

      {/* Account Creation or Login Flow */}
      {!isLoggedIn ? (
        !isAccountCreated ? (
          <div className="account-creation">
            <h2>Create Account</h2>
            <input type="text" name="username" value={newUser.username} onChange={handleUserChange} placeholder="Enter your username" />
            <input type="email" name="email" value={newUser.email} onChange={handleUserChange} placeholder="Enter your email" />
            <input type="password" name="password" value={newUser.password} onChange={handleUserChange} placeholder="Enter your password" />
            <button onClick={createAccount}>Create Account</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        ) : (
          <div className="login">
            <h2>Login</h2>
            <input type="email" name="email" value={userCredentials.email} onChange={handleLoginChange} placeholder="Enter your email" />
            <input type="password" name="password" value={userCredentials.password} onChange={handleLoginChange} placeholder="Enter your password" />
            <button onClick={login}>Login</button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </div>
        )
      ) : (
        <>
          <div className="shoe-section">
            <h2>Available Shoes</h2>
            <div className="shoe-container">
              {shoes.map((shoe) => (
                <Shoes key={shoe.id} shoe={shoe} addToCart={addToCart} />
              ))}
            </div>
          </div>

          <div className="cart-section">
            <Cart cart={cart} placeOrder={placeOrder} />
          </div>

          {/* Display Order Success Message */}
          {orderSuccess && <div className="order-success">Order placed successfully!</div>}
        </>
      )}

      {/* Profile Section */}
      {showProfile && <Profile currentUser={currentUser} />}
    </div>
  );
}

export default App;
