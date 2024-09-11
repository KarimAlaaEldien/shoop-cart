import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import LoaderCart from '../LoaderCart/LoaderCart';


export default function RelatedProduct() {
    const { category } = useParams()

    function getRelatedProduct() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products');
    }

    const { data, isLoading } = useQuery({
        queryKey: 'relatedProduct',
        queryFn: getRelatedProduct,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const products = data?.data?.data || [];

    if (isLoading) {
        return <LoaderCart />
    }

    return (<>
        <section className='relatedProduct w-[90%] mx-auto md:w-auto '>
            <h4 className='text-blue-700 font-bold'>Related Product :</h4>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 ">
                {products?.filter(product => product.category.name == category).map((product) =>
                    <Product key={product._id} product={product} />
                )}
            </div>
        </section>
    </>
    )
}
