import Landing from './views/Landing'
import { Route, Routes, useLocation } from 'react-router-dom'
import React from 'react'
import NavBar from './components/NavBar'
import Home from './views/Home'

function App() {
  const location = useLocation()
  return (
    <div>
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route exact path = "/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
