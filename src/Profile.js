import React from 'react';

function Profile({ currentUser }) {
  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      <div className="profile-detail">
        <span>Username:</span> {currentUser?.username}
      </div>
      <div className="profile-detail">
        <span>Email:</span> {currentUser?.email}
      </div>
      <div className="profile-detail">
        <span>Order History:</span>
        <div className="order-history">
          <ul>
            {/* Mock order history */}
            <li>Order #1: Ant-Man Themed Shoes</li>
            <li>Order #2: Spidey Shoes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
