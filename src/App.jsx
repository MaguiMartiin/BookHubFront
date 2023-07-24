import './App.css'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './views/Landing/Landing'
import Home from './views/Home/Home'
import NavBar from './components/NavBar/NavBar'
import Detail from './views/Detail/Detail'
//import Landing from './views/Landing'
import Form from "./views/Form/FormCreate"
// user
import Login from './views/User/Login'
import EditDetail from './views/Detail/EditDetail'

function App() {
   const location = useLocation()
  return (
    <div>
      {location.pathname !== "/" && <NavBar/>}
      <Routes>
        <Route exact path = "/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/home/:id" element={<Detail/>}/>
        <Route path="/editar/:id" element={<EditDetail/>}></Route>
        <Route path="/form" element={<Form/>}/>
        <Route path='/login' element={<Login/>} ></Route>
      </Routes>
    </div>
  )
}

export default App;
