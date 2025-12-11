import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllItems, removeItem } from '../redux/Slice';
import { useNavigate } from 'react-router-dom';

const Cartlist = () => {
    const cartselector=useSelector((state)=>state.cart.items)

const[cartitems,setcartitems]=useState(cartselector);


useEffect(()=>{
setcartitems(cartselector)
},[cartselector])


const dispatch=useDispatch()
const navigate=useNavigate()

    const manageQuantity=(id,q)=>{
let quantity=parseInt (q)>1 ? parseInt(q):1

const cartTempItems=cartselector.map((item)=>{
return item.id ==id?
{...item,quantity}:item
})
setcartitems(cartTempItems)
    }

    const handlePlaceOrder=()=>{
localStorage.clear();
dispatch(clearAllItems());
alert("Order Placed")
navigate('/')
    }


  return (
    <div className='cart-container'>
        <div className='cart-header'>
            <h2>Your Cart Items1</h2>
            <span>{cartitems.length}Items</span>
        </div>
        {
            cartitems.length>0 ? cartitems.map((item)=>(
                <div key={item.id} className='cart-item'>
                    <div className='item-info'>
<img src={item.thumbnail}/>
<div className='item-details'>
    <h4>{item.title}</h4>
    <p>{item.brand}</p>
</div>
                    </div>
                    <div className='item-actions'>
                      <div style={{display:'flex'}}>
                        <input onChange={(e)=>{
                            manageQuantity(item.id,e.target.value)
                        }} value={item.quantity?item.quantity:1} style={{margin:'15px'}} type="number" placeholder='Enter the Quantity' />
                        <div>
                              <span className='price'>$
                            {(item.quantity?item.price*item.quantity:item.price).toFixed(2)}
                        </span>
                        <button onClick={()=>{
                            dispatch(removeItem(item))
                        }}className='btn'>Remove</button>
                        </div>
                      </div>
                    </div>
                </div>
            )
            )
            :null
        }
        <div className='cart-footer'>
     
  Total: ${
    cartitems.reduce(
      (sum, item) => sum + Number(item.price) * (Number(item.quantity) || 1),
      0
    ).toFixed(2)
  }
</div>
     <button className='btn' onClick={()=>{
        handlePlaceOrder()
     }}>Place ouder</button>
    </div>
  )
}

export default Cartlist
