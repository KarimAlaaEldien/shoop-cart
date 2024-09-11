import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import LoaderCart from '../LoaderCart/LoaderCart';

export default function Brands() {

  const { data: allBrand, isLoading: allLoading, error: allError } = useQuery({
    queryKey: 'allBrands',
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/brands'),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  if (allLoading) {
    return <LoaderCart />;
  }

  if (allError) {
    return (
      <div className="h-screen flex justify-center items-center bg-slate-50">
        <p className="text-red-500">An error occurred while fetching data. Please try again later.</p>
      </div>
    );
  }

  return (<>
    <Helmet>
      <meta charSet="utf-8" />
      <title>All Brands</title>
      <meta name="description" content="All commercial brands" />
    </Helmet>
    <h1 className="text-2xl mx-auto font-bold text-blue-700 w-fit shadow-xl py-2 px-4 rounded-2xl mb-6">
      All Brands
    </h1>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center">
      {allBrand?.data.data.map((brand) => (
        <div className="brands py-4 px-2 bg-white" key={brand._id}>
          <Link to={`/brandProduct/${brand._id}/${brand.name}`} >
            <div className="p-2 shadow-md rounded-xl bg-neutral-50">
              <img src={brand.image} className="w-full" alt={brand.name} />
              <h2 className="text-blue-600 font-semibold">{brand.name}</h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </>
  )
};