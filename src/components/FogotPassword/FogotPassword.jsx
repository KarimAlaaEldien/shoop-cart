import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";

export default function FogotPassword() {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isClecked, setIsClecked] = useState(false);

    function handelForgotPassword(values) {
        setIsClecked(true);
        axios
            .post(
                "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                values
            )
            .then((res) => {
                console.log(res);
                setErrorMessage(false);
                setIsSuccess(true);
                setIsClecked(false);
                setTimeout(() => {
                    navigate("/resetCode");
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(error.response.data.message);
                setIsClecked(false);
                setIsSuccess(false);
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            });
    }

    let validationSchema = yup.object().shape({
        email: yup.string().email("Email is invalid").required("Email required"),
    });

    let forgotPassFormik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit: handelForgotPassword,
    });

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Forgot Password</title>
            </Helmet>
            <div className="mx-auto max-w-xl py-5">
                <h1 className="text-3xl font-bold mb-5 pb-2 text-blue-700 ">
                    Forgot Password
                </h1>
                {errorMessage ? (
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        {errorMessage}
                    </div>
                ) : (
                    ""
                )}

                {isSuccess ? (
                    <div
                        className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                        role="alert"
                    >
                        The code has been sent to your email...!
                    </div>
                ) : (
                    ""
                )}

                <form onSubmit={forgotPassFormik.handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={forgotPassFormik.values.email}
                            onChange={forgotPassFormik.handleChange}
                            onBlur={forgotPassFormik.handleBlur}
                            type="email"
                            name="email"
                            id="email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                        {forgotPassFormik.errors.email && forgotPassFormik.touched.email ? (
                            <div
                                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                role="alert"
                            >
                                {forgotPassFormik.errors.email}
                            </div>
                        ) : null}
                    </div>

                    <button
                        disabled={!(forgotPassFormik.isValid && forgotPassFormik.dirty)}
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {!isClecked ? (
                            "Submit"
                        ) : (
                            <Loader/>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
