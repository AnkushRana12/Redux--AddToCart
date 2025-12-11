import React from 'react'
import Header from './Components/Header'
import Product from './Components/Product'
import { useDispatch } from 'react-redux'
import { clearAllItems} from './redux/Slice'
import { useSelector } from 'react-redux'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Cartlist from './Components/Cartlist'

const App = () => {
    const cartselector=useSelector((state)=>state.cart.items);
  const dispatch=useDispatch();

  return (
    <div>
<HashRouter>
    <Header/>   
    
      <Routes>
<Route path='/' element={<Product/>}></Route>
<Route path='/cart' element={<Cartlist/>}></Route>
      </Routes>
</HashRouter>
    </div>
  )
}

export default App
