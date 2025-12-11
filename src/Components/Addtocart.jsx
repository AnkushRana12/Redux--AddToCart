import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Addtocart = () => {
  const cartselector=useSelector((state)=>state.cart.items);
  console.log(cartselector.length)
  return (
    <div>
      <Link to='/cart' >
       <div className="cart">
    <span className="cart-icon">🛒</span>
    <span className="cart-count">{cartselector.length>0 ? cartselector.length :0}</span>
  </div></Link>
    </div>
  )
}

export default Addtocart
