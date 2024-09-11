
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { cartContext } from './../../Context/CartContext';
import toast from 'react-hot-toast';
import Slider from 'react-slick';
import RelatedProduct from '../RelatedProduct/RelatedProduct';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';
import LoaderCart from '../LoaderCart/LoaderCart';


export default function ProductsDetails() {

    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const { id } = useParams();
    const { addProductToCart } = useContext(cartContext);
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    async function handelAddProductToCart(id) {
        setIsLoadingButton(true);
        const resFlag = await addProductToCart(id)

        if (resFlag) {
            setIsLoadingButton(false);
            toast.success('Product Added Successfully', {
                position: 'top-right',
                duration: 3000
            });
        }
        else {
            setIsLoadingButton(false);
            toast.error('An error occurred while adding the product', {
                position: 'top-right',
                duration: 3000
            });
        }
    }


    function getProuductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    const { data, isLoading } = useQuery({
        queryKey: ['productDetails', id],
        queryFn: getProuductDetails
    })

    if (isLoading) {
        return (<>
            <LoaderCart/>
        </>)
    }
    const res = data.data.data;

    return (
        <>


            <section className='mb-8 w-[90%] mx-auto md:w-auto  '>
                <div className='flex justify-between items-center flex-wrap gap-y-7 md:gap-y-0 mb-10 pb-10'>
                    <div className='w-full md:w-1/4'>
                        <Slider {...settings} arrows={false}>
                            {res.images.map((img, index) =>
                                <img key={index} src={img} alt={res.title} />
                            )}
                        </Slider>
                    </div>
                    <div className='w-full md:w-[70%]'>
                        <h1 className='font-bold text-xl text-blue-700'>{res.title}</h1>
                        <p className='font-semibold'>Description: <span className='font-normal text-black'>{res.description}</span></p>
                        <h2 className='font-semibold'>category : <span className='font-normal text-black'>{res.category.name}</span></h2>
                        <h3 className='font-semibold mb-3'>price: <span className='font-normal text-black'>{res.price} EGP</span></h3>
                        <button onClick={() => handelAddProductToCart(res._id)} className='py-2 px-4 rounded-xl w-full bg-blue-700 text-white'>
                            {isLoadingButton ? (<Loader />) : (<>Add product to cart <i className="fa-solid fa-cart-plus"></i></>)}
                        </button>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>{res.category.name}</title>
                            <meta name="description" content={res.description} />
                        </Helmet>
                    </div>
                </div>
                <RelatedProduct />
            </section>
        </>
    )
};
