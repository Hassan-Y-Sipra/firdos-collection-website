import React from 'react'
import "../assets/css/Header.css"

const Header = () => {
  return (
    <>
    <div className='valudas-dashboard-header'>
        <div className='valudas-logo'>
        <img src='/image.png' alt='logo'/>
        </div>
        <div>
            <input type='text' placeholder='search'/>

        </div>
        <div>
            <span><i class="fa-solid fa-cart-shopping"></i>
            </span>
            <span><i class="fa-solid fa-heart"></i>
            </span>

            <h4>user</h4>

        </div>

    </div>
        
    </>
  )
}

export default Header