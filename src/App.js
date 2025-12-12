import React from 'react';
import './App.css';
import Allrouter from './Allrouter';
import {BrowserRouter as Router} from 'react-router-dom'
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer"
// import Signup from './Signup'
// import Login from './Login'


function App() {
  return (
    <>
    <Router>
      {/* <Routes>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes> */}
      {/* <Navbar /> */}
      <Allrouter/> 
      {/* <Footer/>  */}
    </Router>
    </>
  );
}

export default App;
