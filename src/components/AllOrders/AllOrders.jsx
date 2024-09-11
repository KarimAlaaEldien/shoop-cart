import React from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import AllOrdersSlider from '../AllOrdersSlider/AllOrdersSlider';
import cartShop from '../../assets/images/cart2.png';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import {Helmet} from "react-helmet";
import LoaderCart from '../LoaderCart/LoaderCart';

export default function AllOrders() {
    const { id } = jwtDecode(localStorage.getItem('userToken'));

    function getAllOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
    }

    const { data, isLoading } = useQuery({
        queryKey: "allOrders",
        queryFn: getAllOrders,
    });

    if (isLoading) {
        return <LoaderCart />;
    }

    return (
        <section className='allOrders p-2'>
            <Helmet>
                <meta charSet="utf-8" />
                <title>All Orders Purchased</title>
                <meta name="description" content="Purchased products" />
            </Helmet>
            <h1 className='text-2xl mx-auto font-bold text-blue-700 w-fit shadow-xl py-2 px-4 rounded-2xl mb-3'>
                All Orders Purchased
            </h1>
            <div className='flex flex-wrap items-center justify-center'>
                {data?.data?.length > 0 ? (
                    data.data.map((order) => (
                        <div key={order._id} className='w-full px-8 sm:p-0 sm:w-1/2 md:w-1/3 xl:w-1/4'>
                            <div className='mx-auto p-4'>
                                <div className='p-5 mb-3 bg-neutral-100 shadow-md rounded-xl'>
                                    <div className='mb-2 bg-neutral-100'>
                                        <AllOrdersSlider order={order} />
                                    </div>
                                    <div className='bg-white p-3 rounded-lg'>
                                        <div className='border-b-2 border-slate-200'>
                                            <h2 className='text-blue-700 font-bold w-fit p-2 mx-auto mb-2 rounded-xl shadow-md bg-slate-200'>
                                                Order Details
                                            </h2>
                                        </div>
                                        <div className='p-2'>
                                            <h3 className='text-blue-700 font-semibold'>
                                                Payment By: <span className='font-normal text-black'>{order.paymentMethodType === "cash" ? "Cash" : "Visa Card"}</span>
                                            </h3>
                                            <h3 className='text-blue-700 font-semibold'>
                                                Purchase Date: <span className='font-normal text-black'>{new Date(order.updatedAt).toLocaleDateString()}</span>
                                            </h3>
                                            <h3 className='text-blue-700 font-semibold'>
                                                Time: <span className='font-normal text-black'>
                                                    {(() => {
                                                        const date = new Date(order.updatedAt);
                                                        date.setHours(date.getHours()); 
                                                        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                                    })()}
                                                </span>
                                            </h3>
                                            <h3 className='text-blue-700 font-semibold'>
                                                Total: <span className='font-normal text-black'>{order.totalOrderPrice} EGP</span>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='flex justify-center items-center'>
                        <div className='text-center p-3 bg-slate-50 rounded-xl shadow-2xl mt-8'>
                            <div className='bg-slate-100-200 rounded-xl'>
                                <img src={cartShop} className='w-52 h-48 rounded-md mb-3' alt="A shopping cart filled with products" loading="lazy" />
                                <p>No orders purchased yet...</p>
                                <p className='mb-3'>Click here to go shopping</p>
                                <Link to={"/products"} className='p-2 md:p-3 block bg-blue-700 text-white rounded-xl'>
                                    Go
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
