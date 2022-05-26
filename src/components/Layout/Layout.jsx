import React from 'react'

import {Outlet} from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import Navbar from '../Nabar';
import Sidebar from '../Sidebar';
import './Layout.css';


const Layout = () => {
  return (
    <div className="container">
       <Header />

       <Navbar />

      <div className="main-content">
        <Outlet />
      </div>
       

        <Sidebar />
        <Footer />

    </div>
      
  )
}

export default Layout