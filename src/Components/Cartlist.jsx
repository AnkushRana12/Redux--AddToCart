import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllItems, removeItem } from '../redux/Slice';
import { useNavigate } from 'react-router-dom';

const Cartlist = () => {
  const cartSelector = useSelector((state) => state.cart?.items || []);
  const [cartItems, setCartItems] = useState(cartSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sync local state with Redux
  useEffect(() => {
    setCartItems(cartSelector);
  }, [cartSelector]);

  // Update quantity safely
  const manageQuantity = (id, q) => {
    const quantity = parseInt(q, 10) > 0 ? parseInt(q, 10) : 1;
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  // Place order: clear localStorage and Redux
  const handlePlaceOrder = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn('Cannot access localStorage', e);
    }
    dispatch(clearAllItems());
    alert('Order Placed');
    navigate('/');
  };

  // Calculate total
  const totalPrice = cartItems
    .reduce(
      (sum, item) => sum + parseFloat(item.price) * (item.quantity || 1),
      0
    )
    .toFixed(2);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart Items</h2>
        <span>{cartItems.length} Items</span>
      </div>

      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <img src={item.thumbnail} alt={item.title} />
              <div className="item-details">
                <h4>{item.title}</h4>
                <p>{item.brand}</p>
              </div>
            </div>

            <div className="item-actions" style={{ display: 'flex' }}>
              <input
                type="number"
                min="1"
                value={item.quantity || 1}
                onChange={(e) => manageQuantity(item.id, e.target.value)}
                style={{ margin: '15px' }}
              />
              <div>
                <span className="price">
                  ${(parseFloat(item.price) * (item.quantity || 1)).toFixed(2)}
                </span>
                <button
                  className="btn"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="cart-footer">Total: ${totalPrice}</div>
      {cartItems.length > 0 && (
        <button className="btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      )}
    </div>
  );
};

export default Cartlist;
