import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from '../Product/Product';
import emptyimg from '../../assets/images/empty.png';
import { Helmet } from 'react-helmet';
import LoaderCart from '../LoaderCart/LoaderCart';

export default function BrandProduct() {
  const { selectedBrand, brandName } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['specificBrand', selectedBrand],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${selectedBrand}`),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: Boolean(selectedBrand),
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
  console.log(selectedBrand);



  return (<>

    <Helmet>
      <meta charSet="utf-8" />
      <title>{brandName}</title>
      <meta name="description" content={`Description of brand ${brandName}`} />
    </Helmet>

    <h1 className='text-2xl mx-auto font-bold text-blue-700 w-fit shadow-xl py-2 px-4 rounded-2xl mb-6 '>Brand Section</h1>
    <div className="flex justify-center items-center flex-wrap">
      {data.data.data.length > 0 ? (
        data.data.data.map((product) => (
          <div key={product._id} className='w-[90%] mx-auto md:mx-0 md:w-1/3 lg:w-1/5'>

            <Product product={product} />
          </div>
        ))
      ) : (
        <div className="w-[70%] mx-auto md:mx-0 md:w-[20%]">
          <div className="text-center px-3 py-5 bg-neutral-50 rounded-xl shadow-md my-4">
            <div className="bg-slate-100 rounded-xl py-2">
              <img src={emptyimg} className="w-52 h-48 rounded-md mb-3 mx-auto" alt="No products available" />
              <p className="mb-2">No products available in</p>
              <p className="underline">"{brandName}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </>
  );
}