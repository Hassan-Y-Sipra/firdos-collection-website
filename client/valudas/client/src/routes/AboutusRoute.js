import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Aboutus from "../pages/aboutus"

const AboutusRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/about-us' element={<Aboutus/>}/>
    </Routes>

    </>
  )
}

export default AboutusRoute