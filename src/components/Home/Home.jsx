import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import HomeSlider from '../HomeSlider/HomeSlider';
import sideImage1 from "../../assets/images/sideimg2.jpg"
import sideImage2 from "../../assets/images/sideimg1.jpg"
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { useQuery } from 'react-query';
import Product from '../Product/Product';
import useGetCategories from '../../CustomHooks/useGetCategories';
import LoaderCart from '../LoaderCart/LoaderCart';
import { Helmet } from 'react-helmet';


export default function Home() {
    const allcategory = useGetCategories();

    function getAllProuducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }
    const { data, isLoading, error } = useQuery({
        queryKey: 'products',
        queryFn: getAllProuducts,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });


    if (isLoading) {
        return <LoaderCart />
    }
    if (error) {
        return (
            <div className="h-screen flex justify-center items-center bg-slate-50">
                <p className="text-red-500">An error occurred while fetching data. Please try again later.</p>
            </div>
        );
    }

    return (<>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Home</title>
            <meta name="description" content="All commercial brands, all categories" />
        </Helmet>
        <section className='home p-2'>
            <div className='slider flex justify-center mb-8'>
                <div className=' rounded-md md:rounded-none overflow-hidden w-full MoveSlider md:w-[80%]'><HomeSlider /></div>
                <div className=' hidden md:block fixedimg w-[20%]'>
                    <div><img src={sideImage1} className='w-full h-36' alt=" Fruit shopping" /></div>
                    <div><img src={sideImage2} className='w-full h-36' alt="clothes shopping" /></div>
                </div>
            </div>
            <div className='categoriesSlider mb-9'>
                <h1 className='font-bold mb-3'>Shop popular categories</h1>
                <CategoriesSlider />
            </div>

            <h2 className='font-bold mb-5'>Recent Product</h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 ">
                {data.data.data.map((product) =>
                    <Product key={product._id} product={product} />
                )}
            </div>
        </section>

    </>
    )
};
