
import Landing from './views/Landing'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './views/Home/Home'
import React from 'react'
import NavBar from './components/NavBar'

function App() {
  const location = useLocation()
  return (
    <div>
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route  path = "/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
