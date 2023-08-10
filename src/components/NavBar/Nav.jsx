import React from 'react'
import NavBar from './NavBar';
import NavAdmin from './NavAdmin';

export default function Nav() {
      
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin')); // Convertir a booleano
    const isVendedor = JSON.parse(localStorage.getItem('isVendedor')); // Convertir a booleano
    const isToken = localStorage.getItem('accessToken');
      console.log("isAdmin",isAdmin);
    if(isToken && isAdmin){
        //console.log("admin");
        return <NavAdmin/>
    }else if(isToken && isVendedor){
        //console.log("user");
        return <NavAdmin/>
    }else{
        //console.log("user");
        return <NavBar/>
    }

}
