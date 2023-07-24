import './App.css'
// import Landing from './views/Landing'
import Home from './views/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Landing from './views/Landing'
// import { Route, Routes, useLocation } from 'react-router-dom'
import React from 'react'
// import NavBar from './components/NavBar'
// import Home from './views/Home'
import Form from "./views/Form/FormCreate"
// user
import Login from './views/User/Login'
function App() {
  // const location = useLocation()
  return (
    <div>
      {/*location.pathname !== "/" && <NavBar/>*/}
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route exact path = "/" element={<Landing/>}/>
        <Route path="/form" element={<Form/>}/>
        <Route path='/login' element={<Login/>} ></Route>
      </Routes>
    </div>
  )
}

export default App;
