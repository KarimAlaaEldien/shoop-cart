import { useContext } from 'react';
import { wishListContext } from '../../Context/WishListContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import emptyimg from '../../assets/images/empty.png';
import { Helmet } from 'react-helmet';
import LoaderCart from '../LoaderCart/LoaderCart';

export default function WishList() {
  const { removeProductFromWishList, isLoading, allProFavourite } = useContext(wishListContext);


  async function handelRemoveFav(id) {
    let resFlag = await removeProductFromWishList(id);
    if (resFlag) {
      toast.success("The product has been removed from your favorites list")
    }
    else {
      toast.error("An error occurred while deleting the product from your favorites list")
    }
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Favorite Products</title>
        <meta name="keywords" content="Customer preferences" />
      </Helmet>
      <h1 className="text-2xl mx-auto font-bold text-blue-700 w-fit shadow-xl py-2 px-4 rounded-2xl mb-5">
        Favorite Products
      </h1>

      {isLoading ? (
        <LoaderCart />
      ) : (
        <>
          {allProFavourite.length > 0 ? <div className="flex items-center justify-center flex-wrap w-[75%] mx-auto ">
            {allProFavourite.map((pro) => (
              <div key={pro._id} className="product py-4 px-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <div className='px-3 pb-3 pt-4 shadow-md rounded-md bg-neutral-50'>
                  <Link to={`/productsDetails/${pro._id}`}>
                    <img src={pro.imageCover} className='w-full h-52  rounded-md' alt={pro.title} />
                    <h3 className='text-blue-700 font-semibold'>{pro.title.split(' ').slice(0, 2).join(' ')}</h3>
                    <p className=''>Price: <span className=" font-semibold text-gray-900 dark:text-white">
                      {pro.priceAfterDiscount ? pro.priceAfterDiscount : pro.price}
                    </span> EGP
                    </p>
                    <div className='flex items-center justify-between mb-2'>
                      <p>{pro.category.name}</p>
                      <p><span className='w-fit  block ms-auto '><i className='fa-solid fa-star text-yellow-300'></i> {pro.ratingsAverage}</span></p>
                    </div>
                  </Link>
                  <div className='flex justify-between items-center '>
                    <button className="p-2 text-white bg-blue-700 rounded-md " aria-label={`Add ${pro.title} to cart`}>
                      Add To Cart
                    </button>
                    <button onClick={() => handelRemoveFav(pro._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline" aria-label={`Remove ${pro.title}`}>
                      <i className="fa-solid fa-trash-can text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> :

            <div className="w-[70%] mx-auto  md:w-[20%]">
              <div className="text-center px-3 py-5 bg-neutral-50 rounded-xl shadow-md my-4">
                <div className="bg-slate-100 rounded-xl py-2">
                  <img src={emptyimg} className="w-52 h-48 rounded-md mb-3 mx-auto" alt="No products available" />
                  <p className="mb-2">Your favorite products list is empty.</p>
                  <Link to={"/"} className='p-2 md:p-3 block bg-blue-700 text-white ms-2 rounded-xl'>Go</Link>
                </div>
              </div>
            </div>
          }
        </>
      )}
    </>
  )
}








