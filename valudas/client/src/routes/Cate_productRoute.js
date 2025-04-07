import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartProvider } from '../pages/cate_product/CartContext'
import Addedcart from '../pages/cate_product/Addedcart'
import ProductByCategory from '../pages/cate_product/ProductByCategory'
import ProductDetails from '../pages/cate_product/ProductDetails'
import Pricefilter from '../pages/cate_product/Pricefilter'
import Chakeout from '../pages/cate_product/Chakeout'



const Cate_productRoute = () => {
  return (
    <>
   <CartProvider>
   <Routes>
    <Route path="/productbycategory/:id" element={<ProductByCategory/>} />
    <Route path='/addedcart'element={<Addedcart/>}/>
    <Route path='/productdetails/:id'element={<ProductDetails/>}/>
    <Route path='/pricefilter'element={<Pricefilter/>}/>
    <Route path='/checkout' element={<Chakeout/>}/>
            </Routes>
   </CartProvider>


    </>
  )
}

export default Cate_productRoute