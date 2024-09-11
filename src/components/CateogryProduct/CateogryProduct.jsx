import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Product from '../Product/Product';
import emptyimg from '../../assets/images/empty.png';
import { Helmet } from 'react-helmet';
import LoaderCart from '../LoaderCart/LoaderCart';

export default function CategoryProduct() {

    const { selectedCategory, categoryName } = useParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ['specificProductCategory', selectedCategory],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${selectedCategory}`),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled: Boolean(selectedCategory),
    });

    if (isLoading) {
        return <LoaderCart />;
    }


    if (error) {
        return (
            <div className="h-screen flex justify-center items-center bg-slate-50">
                <p className="text-red-500">An error occurred while fetching data. Please try again later.</p>
            </div>
        );
    }


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{categoryName}</title>
                <meta name="description" content={`Categories for ${categoryName}`} />
            </Helmet>
            <h1 className="text-2xl mx-auto font-bold text-blue-700 w-fit shadow-xl py-2 px-4 rounded-2xl mb-6">
                Category Section
            </h1>
            <div className="flex justify-center items-center flex-wrap">
                {data?.data?.data?.length > 0 ? (
                    data.data.data.map((product) => (
                        <div key={product._id} className="w-[90%] mx-auto md:mx-0 md:w-1/3 lg:w-1/4 xl:w-1/5">
                            <Product product={product} />
                        </div>
                    ))
                ) : (
                    <div className="w-[70%] mx-auto md:mx-0 md:w-[20%] ">
                        <div className="text-center px-3 py-5 bg-neutral-50 rounded-xl shadow-xl mt-4 overflow-hidden">
                            <div className="bg-slate-100-200 rounded-xl group">
                                <img
                                    src={emptyimg}
                                    className="w-52 h-48 rounded-md mb-3 mx-auto transition-transform duration-300 group-hover:scale-105"
                                    alt="No products available"
                                />
                                <p className="mb-2 text-gray-700">No products available in</p>
                                <p className="underline text-blue-700 font-semibold">"{categoryName}" Category</p>
                                <p className="mb-3 text-gray-600">Click here to go to the categories</p>
                                <Link
                                    to="/categories"
                                    className="p-2 md:p-3 block bg-blue-700 text-white rounded-xl hover:bg-blue-600 hover:border-blue-400 transition-colors duration-200"
                                >
                                    Go
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}