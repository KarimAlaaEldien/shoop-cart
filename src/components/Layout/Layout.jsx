import React from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Footer/Footer';

export default function Layout() {

  return (<>
    <div className='mainSection'>
      <Navbar />
      <div className='container mx-auto  mb-5'>
        <Outlet />
      </div>
      <Footer />
    </div>
  </>
  )
}
