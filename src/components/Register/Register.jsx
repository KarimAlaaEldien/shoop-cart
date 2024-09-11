import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { userContext } from '../../Context/UserContext';
import { jwtDecode } from 'jwt-decode';
import { Helmet } from 'react-helmet';
import Loader from '../Loader/Loader';


export default function Register() {
  let { userLogin, setUserLogin } = useContext(userContext)
  let navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false)
  const [isClecked, setIsClecked] = useState(false)


  function handelRegister(values) {
    setIsClecked(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then(function (res) {
        localStorage.setItem("userToken", res.data.token)

        setUserLogin(jwtDecode(res.data.token))
        setErrorMessage(false)
        setIsSuccess(true)
        setIsClecked(false)
        setTimeout(() => {
          navigate("/login")
        }, 2000)
      })
      .catch(function (error) {
        setErrorMessage(error.response.data.message);
        setIsClecked(false)
        setIsSuccess(false)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)

      });
  }

  let validationSchema = yup.object().shape({
    name: yup.string().matches(/^[A-Z][a-zA-Z]{2,14}$/, 'The name must begin with a capital letter and must be no less than 3 letters and no more than 15').required('Name required'),
    email: yup.string().email('Email is invalid').required('Email required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{8,12}$/, 'Password must start with a capital letter and be no less than 8 characters and no more than 15').required('Password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'The password and Re-password must be the same').required('Re-password is required'),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'The phone number must be an Egyptian number').required('Phone is required'),
  })

  let registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handelRegister,
  });


  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <meta name="keywords" content="Register an account" />
      </Helmet>
      <div className='mx-auto max-w-sm py-5 text-center'>
        <div className='bg-slate-50 rounded-md shadow-md  p-10'>
          <h2 className='text-3xl font-bold mb-5 pb-2 text-blue-700 '>Register Now</h2>
          {errorMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errorMessage}
          </div> : ''}

          {isSuccess ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            Congratulations
          </div> : ''}

          <form onSubmit={registerFormik.handleSubmit}>

            <div className="relative z-0 w-full mb-5 group text-left">
              <input value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
              {registerFormik.errors.name && registerFormik.touched.name ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {registerFormik.errors.name}
              </div> : null}
            </div>


            <div className="relative z-0 w-full mb-5 group text-left">
              <input value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              {registerFormik.errors.email && registerFormik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {registerFormik.errors.email}
              </div> : null}
            </div>


            <div className="relative z-0 w-full mb-5 group text-left">
              <input value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="Password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="Password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              {registerFormik.errors.password && registerFormik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {registerFormik.errors.password}
              </div> : null}
            </div>


            <div className="relative z-0 w-full mb-5 group text-left">
              <input value={registerFormik.values.rePassword} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="password" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-password</label>
              {registerFormik.errors.rePassword && registerFormik.touched.rePassword ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {registerFormik.errors.rePassword}
              </div> : null}
            </div>

            <div className="relative z-0 w-full mb-5 group text-left ">
              <input value={registerFormik.values.phone} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
              {registerFormik.errors.phone && registerFormik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {registerFormik.errors.phone}
              </div> : null}
            </div>


            <button type="submit" className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {!isClecked ? 'Submit' :<Loader/>}
            </button>

          </form>
          <p>Already have an account?<Link className='text-blue-700 underline font-bold' to={"/login"}>Sign in</Link></p>
        </div>
      </div>

    </>
  )

};