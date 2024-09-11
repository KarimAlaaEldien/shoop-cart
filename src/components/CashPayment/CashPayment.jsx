import React from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useContext } from 'react';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';


export default function CashPayment() {

    const [errorMessage, seteErrorMessage] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { cartId, editToClearUI } = useContext(cartContext)
    const [allCities, setAllCities] = useState([]);
    const [isclicked, setIsclicked] = useState(false);
    const [paymentType, setPaymentType] = useState(null);

    let navigate = useNavigate();
    let { state } = useLocation();

    useEffect(() => {
        axios.get('../../../src/jsonFile/allCityInEgypt.json')
            .then((res) => {
                setAllCities(res.data);
                console.log(res.data);

            })
            .catch((error) => {
                console.error('Error loading cities:', error);
            });
    }, []);

    useEffect(() => {
        setPaymentType(state.type);
    }, [])

    function detectAndCall(values) {
        if (paymentType == 'Online Payment') {
            handelOnlineOrder(values);
        }
        else {
            handelcashorder(values)
        }
    }

    function handelcashorder(values) {
        setIsclicked(true)
        let backendRequest = {
            shippingAddress: values,
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, backendRequest, {
            headers: {
                token: localStorage.getItem('userToken')
            }
        }).then((res) => {
            toast.success('Your order has been created successfully and customer service will contact you within 24 hours', {
                duration: 1250,
                position: 'top-right',

            });
            console.log(res);
            setIsclicked(false)
            CashFormik.resetForm();
            editToClearUI();

            setTimeout(() => {
                setIsSuccess(true)
                seteErrorMessage(false)
            }, 1000);

            setTimeout(() => {
                navigate('/cart')
            }, 3000);

        })
            .catch((error) => {
                console.log(error);
                toast.error('A problem occurred while creating the request')
                setIsclicked(false)
                setTimeout(() => {
                    seteErrorMessage(true)
                    setIsSuccess(false)
                }, 1000);
            });
    }

    function handelOnlineOrder(values) {
        setIsclicked(true)
        let backendRequest = {
            shippingAddress: values,
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, backendRequest, {
            headers: {
                token: localStorage.getItem('userToken')
            },
            params: {
                url: 'http://localhost:5173'
            }

        }).then((res) => {
            toast.success('You will be taken to the online payment page', {
                duration: 1250,
                position: 'top-right',

            });
            setIsclicked(false)
            CashFormik.resetForm();

            setTimeout(() => {
                setIsSuccess(true)
                seteErrorMessage(false)
            }, 1000);

            setTimeout(() => {
                window.open(res.data.session.url, '_self');
            }, 3000);

        })
            .catch((error) => {
                console.log(error);
                toast.error('A problem occurred while creating the request')
                setIsclicked(false)
                setTimeout(() => {
                    seteErrorMessage(true)
                    setIsSuccess(false)
                }, 1000);
            });
    }

    function validationPhone(value) {
        let error = {}
        if (!value.phone) {
            error.phone = 'phone is required'
        }
        else if (!/^01[0125][0-9]{8}$/.test(value.phone)) {
            error.phone = 'The phone number must be an Egyptian number'
        }
        return error;
    }

    const CashFormik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        validate: validationPhone,
        onSubmit: detectAndCall,
    });


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{paymentType}</title>
                <meta name="description" content={paymentType} />
            </Helmet>
            <h1 className='text-2xl mx-auto font-bold text-blue-700 w-fit shadow-xl py-2 px-4 rounded-2xl mb-2 '>{paymentType}</h1>
            {errorMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                An error occurred while creating the request
            </div> : ''}

            {isSuccess ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                Congratulations
            </div> : ''}
            <div className='w-1/3 mx-auto mt-6'>
                <form onSubmit={CashFormik.handleSubmit}>

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={CashFormik.values.details} onChange={CashFormik.handleChange} onBlur={CashFormik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input value={CashFormik.values.phone} onChange={CashFormik.handleChange} onBlur={CashFormik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                        {CashFormik.errors.phone && CashFormik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {CashFormik.errors.phone}
                        </div> : null}
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                        <select id="city" name="city" value={CashFormik.values.city} onChange={CashFormik.handleChange} onBlur={CashFormik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required>
                            <option value="" label="Select city" />
                            {allCities?.map((city) => (
                                <option key={city.id} value={city.name}>{city.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {isclicked ? <Loader /> : "Pay Now"}
                    </button>
                </form>
            </div>
        </>
    )
}
