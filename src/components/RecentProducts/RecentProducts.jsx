import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Product from '../Product/Product';
import useGetCategories from '../../CustomHooks/useGetCategories';
import Slider from 'react-slick';
import emptyimg from '../../assets/images/empty.png'
import { Helmet } from 'react-helmet';
import LoaderCart from '../LoaderCart/LoaderCart';

export default function RecentProduct() {
    const allcategory = useGetCategories();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const { data: allProducts, isLoading: allLoading, error: allError } = useQuery({
        queryKey: 'products',
        queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/products'),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const { data: categoryProducts, isLoading: categoryLoading, error: categoryError, refetch } = useQuery({
        queryKey: ['spacificProduct', selectedCategory],
        queryFn: () => {
            if (selectedCategory === 'all') return Promise.resolve({ data: { data: [] } });
            return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${selectedCategory}`);
        },
        enabled: selectedCategory !== 'all',
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    function handleCategoryChange(event) {
        const id = event.target.value;
        setSelectedCategory(id);
        if (id !== 'all') {
            refetch();
        }
    }

    if (allLoading || categoryLoading) {
        return <LoaderCart />;
    }

    if (allError || categoryError) {
        return (
            <div className="h-screen flex justify-center items-center bg-slate-50">
                <p className="text-red-500">An error occurred while fetching data. Please try again later.</p>
            </div>
        );
    }

    const sliderSettings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 3,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                }
            }
        ]
    };

    const displayedProducts = selectedCategory === 'all'
        ? allProducts.data.data
        : categoryProducts?.data.data || [];

    const selectedCategoryName = allcategory.data.data.data?.find(category => category._id === selectedCategory)?.name || '';

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Recent Products</title>
                <meta name="description" content="All commercial brands, all categories" />
            </Helmet>
            <section className='recentProduct p-2'>
                <h1 className='text-2xl mx-auto font-bold text-blue-700 w-fit shadow-xl py-2 px-4 rounded-2xl mb-8 '>All Products</h1>

                <div className="mb-8">
                    <div className="hidden md:block">
                        <Slider {...sliderSettings} className='w-[80%] mx-auto'>
                            {allcategory.data.data.data?.map((category) => (
                                <div key={category._id} className='p-1'>
                                    <div
                                        onClick={() => {
                                            setSelectedCategory(category._id);
                                            refetch();
                                        }}
                                        className='bg-blue-700 rounded-xl text-white p-2 text-center group cursor-pointer'
                                    >
                                        <p className='group-hover:underline'>
                                            {category.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className="md:hidden">
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={handleCategoryChange}
                            value={selectedCategory}
                        >
                            <option value="all">All Categories</option>
                            {allcategory.data.data.data?.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                            <Product key={product._id} product={product} />
                        ))
                    ) : (
                        <div className='col-span-full flex justify-center'>
                            <div className='text-center px-3 py-5 bg-slate-50 rounded-xl shadow-2xl mt-8'>
                                <div className='bg-slate-100-200 rounded-xl '>
                                    <img src={emptyimg} className="w-52 h-48 rounded-md mb-3 mx-auto" alt="No products available" />
                                    <p className='mb-2'>No products available in </p>
                                    <p className='underline'>"{selectedCategoryName}"</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};