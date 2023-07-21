<<<<<<<<< Temporary merge branch 1
import './App.css'
// import Landing from './views/Landing'
import Home from './views/Home/Home'
import { Route, Routes } from 'react-router-dom'
=========
import Landing from './views/Landing'
import { Route, Routes, useLocation } from 'react-router-dom'
>>>>>>>>> Temporary merge branch 2
import React from 'react'
import NavBar from './components/NavBar'
import Home from './views/Home'

function App() {
  const location = useLocation()
  return (
    <div>
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
<<<<<<<<< Temporary merge branch 1
        <Route path='/home' element={<Home/>}/>
=========
        <Route exact path = "/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
>>>>>>>>> Temporary merge branch 2
      </Routes>
    </div>
  )
}

export default App;
