import './App.css'
// import Landing from './views/Landing'
import Home from './views/Home/Home'
import { Route, Routes } from 'react-router-dom'
import React from 'react'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
