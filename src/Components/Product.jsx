import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../redux/Slice';
import { fetchProducts } from '../redux/productSlice';

const Product = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const cart = useSelector((state) => state.cart);
  // const products = useSelector((state) => state.products);

  
  // console.log(cart, products);

  const productSelector =useSelector((state)=>state.products.items
  )
  console.log(productSelector);

   const cartselector=useSelector((state)=>state.cart.items);
    console.log(cartselector.length)

  return (
    <div className='grid'>
 {productSelector.length > 0 &&
  productSelector.map(item => (
    <div key={item.id} className='card'>
      <img src={item.thumbnail} />
      <div className='content'>
        <div className='title'>{item.title}</div>
        <div className='brand'>{item.brand}</div>
        <div className='price'>{item.price}</div>
        <div className='rating'>{item.rating}</div>

        {
          cartselector.find(cartitem => cartitem.id === item.id)
            ? (
                <button 
                  onClick={() => dispatch(removeItem(item))}
                  className='btn-disable'
                >
                  Remove From Cart
                </button>
              )
            : (
                <button 
                  onClick={() => dispatch(addItem(item))}
                  className='btn'
                >
                  Add To Cart
                </button>
              )
        }

      </div>
    </div>
  ))
}

    </div>
  )
}

export default Product;
