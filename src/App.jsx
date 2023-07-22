import './App.css'
// import Landing from './views/Landing'
import Home from './views/Home/Home'
import Landing from './views/Landing'
import { Route, Routes, useLocation } from 'react-router-dom'
import React from 'react'
import Form from "./views/Form/FormCreate"

function App() {
  const location = useLocation()
  return (
    <div>
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route exact path = "/" element={<Landing/>}/>
        <Route path="/form" element={<Form/>}/>
      </Routes>
    </div>
  )
}

export default App;
