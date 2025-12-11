import React from 'react'
import Addtocart from './Addtocart'
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div>
      <header className="header">
  <div className="logo">MyShop</div>

  <nav className="nav">
   <Link to='/'>Home</Link>
  </nav>

 <Addtocart/>
</header>

    </div>
  )
}

export default Header
