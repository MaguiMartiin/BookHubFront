import './App.css'
import Landing from './views/Landing'
import { Route, Routes } from 'react-router-dom'
import React from 'react'
import NavBar from './components/NavBar'
import Home from './views/Home'

function App() {
  const location = useLocation()
  return (
    <div>
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
      </Routes>
    </div>
  )
}

export default App
