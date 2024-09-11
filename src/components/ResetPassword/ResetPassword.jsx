import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { ColorRing } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import Loader from '../Loader/Loader';

export default function ResetPassword() {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    function handleChangePassword(values) {
        setIsClicked(true);
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            .then(function (res) {
                setErrorMessage(null);
                setIsSuccess(true);
                setIsClicked(false);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.message);
                setIsClicked(false);
                setIsSuccess(false);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 2000);
            });
    }

    let validationSchema = yup.object().shape({
        email: yup.string().email('Email is invalid').required('Email required'),
        newPassword: yup.string().matches(/^[A-Z][a-z0-9]{7,14}$/, 'Password must start with a capital letter and be no less than 8 characters and no more than 15').required('Password is required'),
    });

    let resetPasswordFormik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema,
        onSubmit: handleChangePassword,
    });

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Reset Password</title>
            <meta name="keywords" content="reset password" />
        </Helmet>
        <div className='mx-auto max-w-xl py-5'>
            <h1 className='text-3xl font-bold mb-5 pb-2 text-blue-700'>Change Password</h1>
            {errorMessage && (
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {errorMessage}
                </div>
            )}

            {isSuccess && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    The password has been changed successfully
                </div>
            )}

            <form onSubmit={resetPasswordFormik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        value={resetPasswordFormik.values.email}
                        onChange={resetPasswordFormik.handleChange}
                        onBlur={resetPasswordFormik.handleBlur}
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    {resetPasswordFormik.errors.email && resetPasswordFormik.touched.email && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {resetPasswordFormik.errors.email}
                        </div>
                    )}
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        value={resetPasswordFormik.values.newPassword.trim()}
                        onChange={resetPasswordFormik.handleChange}
                        onBlur={resetPasswordFormik.handleBlur}
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                    {resetPasswordFormik.errors.newPassword && resetPasswordFormik.touched.newPassword && (
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {resetPasswordFormik.errors.newPassword}
                        </div>
                    )}
                </div>

                <button
                    disabled={!(resetPasswordFormik.isValid && resetPasswordFormik.dirty)}
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {!isClicked ? 'Submit' : <Loader/>}
                </button>
            </form>
        </div>
    </>
    );
}