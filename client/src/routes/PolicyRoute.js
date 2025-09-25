import React from 'react'
import { Route, Routes } from 'react-router-dom'
import policy from '../pages/policy '

const PolicyRoute = () => {
  return (
    <>
    <Routes>
        <Route path='/privacypolicy'element={<policy/>}/>
    </Routes>

    </>
  )
}

export default PolicyRoute
