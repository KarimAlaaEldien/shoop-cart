import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { userContext } from '../../Context/UserContext';
import { cartContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/WishListContext';
import { jwtDecode } from 'jwt-decode';
import Loader from '../Loader/Loader';

export default function Login() {
  const { setUserLogin } = useContext(userContext);
  const { getUserCart } = useContext(cartContext);
  const { allProductFromWishList } = useContext(wishListContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isClecked, setIsClecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  async function loginUser(values) {
    setIsClecked(true);
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      localStorage.setItem("userToken", res.data.token);
      setUserLogin(jwtDecode(res.data.token));
      getUserCart();
      allProductFromWishList();
      setErrorMessage(false);
      setIsSuccess(true);
      setIsClecked(false);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An unexpected error occurred");
      setIsClecked(false);
      setIsSuccess(false);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{8,15}$/,'The password is incorrect').required('Password is required'),
  });

  let registerFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: loginUser,
  });

  return (
    <>
      <div className='mx-auto max-w-sm py-5 text-center'>
        <div className='bg-slate-50 rounded-md shadow-md p-10'>
          <h2 className='text-center text-3xl font-bold mb-5 pb-2 text-blue-700'>Login Now</h2>
          {errorMessage && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {errorMessage}
          </div>}

          {isSuccess && <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            Welcome Back
          </div>}

          <form onSubmit={registerFormik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group text-start">
              <input 
                value={registerFormik.values.email} 
                onChange={registerFormik.handleChange} 
                onBlur={registerFormik.handleBlur} 
                type="email" 
                name="email" 
                id="email" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required 
              />
              <label htmlFor="email" className="text-start peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              {registerFormik.errors.email && registerFormik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {registerFormik.errors.email}
              </div>}
            </div>

            <div className="relative z-0 w-full mb-5 group text-start">
              <input 
                value={registerFormik.values.password} 
                onChange={registerFormik.handleChange} 
                onBlur={registerFormik.handleBlur} 
                type={showPassword ? "text" : "password"}
                name="password" 
                id="password" 
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                placeholder=" " 
                required 
              />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
              {registerFormik.errors.password && registerFormik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {registerFormik.errors.password}
              </div>}
              
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  id="showPassword" 
                  checked={showPassword} 
                  onChange={() => setShowPassword(!showPassword)} 
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm text-gray-700">Show Password</label>
              </div>
            </div>

            <button type="submit" className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mx-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {!isClecked ? 'Login' : (
              <Loader/>
              )}
            </button>
          </form>
          <div className='text-center'>
            <p className='mb-2'>Forgot <Link className='text-blue-700 underline font-bold' to={"/fogotPassword"}>Password</Link></p>
            <p>Don't have an account? <Link className='text-blue-700 underline font-bold' to={"/register"}>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}