import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useContext, useState } from "react";
import { wishListContext } from "../../Context/WishListContext";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function Product({ product }) {

    const [loading, setLoading] = useState(false);
    const [curentId, setCurentId] = useState(null);
    const { addProductToCart } = useContext(cartContext);
    const { addWishList, allProFavourite, removeProductFromWishList } = useContext(wishListContext);

    async function handelAddProductToCart(id) {
        setLoading(true);
        const resFlag = await addProductToCart(id)

        if (resFlag) {
            toast.success('Product Added Successfully', {
                position: 'top-right',
                duration: 3000,
            });
            setLoading(false);

        }
        else {
            toast.error('An error occurred while adding the product', {
                position: 'top-right',
                duration: 3000
            });
            setLoading(false);
        }
    }

    function handleScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    }

    async function addOrRemoveWishList(e, id) {
        const isInWishList = allProFavourite.some(product => product._id === id);
        console.log(allProFavourite);

        if (isInWishList) {
            const success = await removeProductFromWishList(id);
            if (success) {
                e.target.classList.replace("fa-solid", "fa-regular");
                e.target.classList.remove("text-red-600");
                toast.success("The product has been removed from the favorites list", {
                    position: 'top-right',
                    duration: 3000,
                })
            }
        } else {
            const success = await addWishList(id);
            if (success) {
                e.target.classList.replace("fa-regular", "fa-solid");
                e.target.classList.add("text-red-600");
                toast.success('The product has been added to your favorite list', {
                    position: 'top-right',
                    duration: 3000,
                })
            }
        }
    }

    return (<>

        <div className='relative group overflow-hidden card' >
            <div onClick={() => handelAddProductToCart(product._id)} className='lg:flex justify-center items-center absolute top-6 start-4 cursor-pointer w-9 h-9 bg-blue-700 p-3 rounded-3xl translate-x-[-200%] group-hover:translate-x-0 transition-all hidden '>
                <i className="fa-solid fa-plus text-white"></i>
            </div>

            <div className="product py-4 px-2">
                <div className='px-3 pb-3 pt-4 shadow-md rounded-md bg-neutral-50'>
                    
                    <Link to={`/productsDetails/${product._id}/${product.category.name}`} onClick={handleScrollToTop}>
                        <img src={product.imageCover} className='w-full rounded-md' alt={product.title} />
                        </Link>
                        <div className="flex justify-between items-center">
                            <h2 className='text-blue-700 font-semibold'>{product.category.name}</h2>
                            <i onClick={(e) => addOrRemoveWishList(e, product._id)}
                                className={` cursor-pointer ${allProFavourite.some(p => p._id === product._id) ? ' text-red-600 fa-solid fa-heart ' : 'fa-regular fa-heart'}`}
                            ></i>
                        </div>
                        <h3 className="line-clamp-1">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                        <div className="flex justify-between items-center mb-2">

                            <p>
                                <span className={product.priceAfterDiscount ? 'me-2 line-through text-red-600' : ''}>{product.price}</span>
                                <span >{product.priceAfterDiscount} EGP</span>
                            </p>
                            <p className=' w-fit block ms-auto '><i className='fa-solid fa-star text-yellow-300'></i> {product.ratingsAverage}</p>
                        </div>

                    <button onClick={() => { handelAddProductToCart(product._id); setCurentId(product._id) }} className='btn w-full rounded-2xl flex items-center justify-center text-white p-2'>{loading && product._id == curentId ? <Loader /> : "Add To Cart"}</button>
                </div>
            </div>
        </div>
    </>
    )
};
