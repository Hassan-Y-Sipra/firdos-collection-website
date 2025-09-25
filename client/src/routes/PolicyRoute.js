import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivacyPolicy from '../pages/policy/PrivacyPolicy '

const PolicyRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/privacypolicy'element={<PrivacyPolicy/>}/>
    </Routes>

    </>
  )
}

export default PolicyRoute