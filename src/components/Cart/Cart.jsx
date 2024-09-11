import React, { useContext, useState } from 'react'
import { cartContext } from './../../Context/CartContext';
import toast from 'react-hot-toast';
import cartShop from '../../assets/images/cart2.png'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoaderCart from '../LoaderCart/LoaderCart';
import Loader from '../Loader/Loader';


export default function Cart() {
  const { cartProducts, totalCartPrice, numCartItems, updateCountItem, deleteItem, deleteAllItems, isLoading } = useContext(cartContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);



  async function handelUpdateCount(productId, newCount) {
    const resFlag = await updateCountItem(productId, newCount)
    if (resFlag) {
      toast.success('A new item has been successfully added to the product', {
        position: 'top-right',
        duration: 3000,
      })
    }
    else {
      toast.error('A problem occurred while adding the product')
    }
  }



  async function handelDeleteItem(productId) {
    const resFlag = await deleteItem(productId)
    if (resFlag) {
      toast.success('The product has been successfully deleted', {
        position: 'top-right',
        duration: 3000,
      })
    }
    else {
      toast.error('An error occurred while deleting the region')
    }
  }

  async function handelDeleteAllItems() {
    setIsDeletingAll(true);

    const resFlag = await deleteAllItems();
    setIsDeletingAll(false);
    if (resFlag) {
      toast.success('The product has been The shopping cart has been completely cleaned deleted', {
        position: 'top-right',
        duration: 3000,
      })
    }
    else {
      toast.error('An error occurred while cleaning the shopping cart')
    }
  }

  return (

    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>shopping cart</title>
        <meta name="keywords" content="Shop through the shopping cart" />
      </Helmet>
      <h1 className='text-2xl mx-auto font-bold text-blue-700 w-fit shadow-xl py-2 px-4 rounded-2xl mb-2'>Welcome to shopping</h1>
      {isLoading ? <LoaderCart /> : cartProducts?.length > 0 ?
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-4 pt-4 pb-0 ">
          <div className='flex flex-col md:flex-row md:justify-between items-center mb-3'>
            <div className='w-full md:w-auto text-center md:text-left mb-4 md:mb-0'>
              <h2 className='text-xl font-bold text-blue-700'>
                Total Price: <span className='text-lg font-semibold text-black'>{totalCartPrice} EGP</span>
              </h2>
              <p className='text-xl font-semibold text-black'>
                Your cart includes <span>{numCartItems} different items.</span>
              </p>
            </div>
            <button onClick={handelDeleteAllItems} className='p-2 md:p-3 bg-blue-700 text-white rounded-xl hover:bg-red-600 duration-500'>
              {isDeletingAll ? <Loader /> : "Remove all"}
            </button>
          </div>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 hidden md:table">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map(product => (
                <tr key={product._id} className="bg-white border-b ">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => handelUpdateCount(product.product._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>

                      <div className='h-8 w-8 rounded-full bg-blue-700 flex justify-center items-center'>
                        <span className='text-white'>{product.count}</span>
                      </div>

                      <button onClick={() => handelUpdateCount(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => handelDeleteItem(product.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='flex flex-col items-center md:hidden'>
            {cartProducts.map(product => (
              <div key={product._id} className=' p-4 mb-2 w-full '>
                <div className='flex flex-col items-center border rounded-lg bg-neutral-50 p-4'>
                  <img src={product.product.imageCover} className="w-32 h-32 mb-4" alt={product.product.title} />
                  <h3 className='text-lg font-semibold mb-2 text-center'>{product.product.title}</h3>
                  <div className='flex items-center mb-2'>
                    <button onClick={() => handelUpdateCount(product.product._id, product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Decrease Quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>
                    <div className='h-8 w-8 rounded-full bg-blue-700 flex justify-center items-center'>
                      <span className='text-white'>{product.count}</span>
                    </div>
                    <button onClick={() => handelUpdateCount(product.product._id, product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                      <span className="sr-only">Increase Quantity</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                  <p className='text-lg font-semibold mb-2'>{product.price}</p>
                  <button onClick={() => handelDeleteItem(product.product._id)} className="text-red-600 hover:underline">Remove</button>
                </div>
              </div>
            ))}
          </div>


          <div className="relative w-full flex flex-col items-center my-4 md:items-end lg:items-end px-4 ">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-white bg-blue-700 p-4 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Check out
              <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute bottom-full mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-gray-700">
                <ul className="py-2 text-sm text-black font-bold dark:text-gray-200">
                  <li>
                    <Link
                      to={'/payment'}
                      state={{ type: "Online Payment" }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Online
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={'/payment'}
                      state={{ type: "Cash on Delivery" }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Cash
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>


        </div>
        :
        <div className='flex justify-center items-center '>
          <div className='text-center p-3 bg-slate-50 rounded-xl shadow-md my-4'>
            <div className='bg-slate-100 rounded-xl '>
              <img src={cartShop} className='w-52 h-48 rounded-md mb-3' alt="Products shopping cart" />
              <p className='mb-3'>Click here to go to shopping</p>
              <Link to={"/"} className='p-2 md:p-3 block bg-blue-700 text-white ms-2 rounded-xl'>Go</Link>
            </div>
          </div>
        </div>
      }
    </>
  )
}
