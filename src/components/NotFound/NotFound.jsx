import React from 'react'
import notFound from "../../assets/images/404-error.jpg"
import { Helmet } from 'react-helmet'
export default function NotFound() {

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
      </Helmet>
      <div className='h-screen flex justify-center items-center '>
        <div className='w-full lg:w-1/2 mx-auto '>
          <img src={notFound} className='w-full' alt="page not found" />
        </div>
      </div>
    </>
  )
}
