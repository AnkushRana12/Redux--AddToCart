import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Addtocart = () => {
  const cartselector = useSelector((state) => state.cart?.items || []);

  return (
    <Link to="/cart">
      <div className="cart">
        <span className="cart-icon">🛒</span>
        <span className="cart-count">{cartselector.length}</span>
      </div>
    </Link>
  );
};

export default Addtocart;

