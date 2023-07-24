import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './views/Landing/Landing'
import Home from './views/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Detail from './views/Detail/Detail'

function App() {
  const location = useLocation()
  return (
    <div>
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route exact path = "/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
      </Routes>
    </div>
  )
}

export default App
