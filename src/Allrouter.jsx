import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import HomePage from "./pages/HomePage";
import DestinationDetail from "./pages/Destinationdetail";
import AboutUs from './pages/AboutUS';
import BookPackages from './pages/BookPackages';
import MyBookings from './pages/Mybooking';



function Allrouter() {
  return (
    <>
    
    <Routes>   
      <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/destinations" element={<HomePage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/bookpackage" element={<BookPackages />} />
        <Route path="/destinations/:slug" element={<DestinationDetail />} />
        <Route path="/my-bookings" element={<MyBookings />} />

    </Routes>
    </>
  )
}

export default Allrouter
