import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'



export const cartContext = createContext();

export default function CartContextProvider({ children }) {

    const [cartProducts, setCartProducts] = useState(null)
    const [numCartItems, setNumCartItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartId, setCartId] = useState(null)
    const [isLoading, setIsLoadin] = useState(false);
    const [ownerId, setOwnerId] = useState(null);

    let headers = {
        token: localStorage.getItem('userToken'),
    }

    function editToClearUI() {
        setCartProducts(null)
        setNumCartItems(0)
        setTotalCartPrice(0)
        setCartId(null)

    }

    async function addProductToCart(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            "productId": productId,
        },
            { headers, })
            .then((res) => {
                console.log(res);
                getUserCart();
                return true
            })
            .catch((error) => {
                console.log(error);
                return false
            })
    };

    function getUserCart() {
        setIsLoadin(true);
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers, })
            .then((res) => {
                setIsLoadin(false);
                setCartProducts(res.data.data.products);
                setNumCartItems(res.data.numOfCartItems);
                setTotalCartPrice(res.data.data.totalCartPrice);
                setCartId(res.data.data._id);
                setOwnerId(res.data.data.cartOwner)
                
            })
            .catch((error) => {
                setIsLoadin(false);
                return (<>
                    <div className=" h-screen flex justify-center items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        please login again
                    </div>
                </>)

            })
    }

    useEffect(() => {
        getUserCart();

    }, [])

    async function updateCountItem(productId, newCount) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            "count": newCount,
        }, {
            headers,
        })
            .then((res) => {
                setCartProducts(res.data.data.products);
                setNumCartItems(res.data.numOfCartItems);
                setTotalCartPrice(res.data.data.totalCartPrice);
                setOwnerId(res.data.data.cartOnwer)
                return true;
            })
            .catch((error) => {
                // <div className=" h-screen flex justify-center items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                //     An error occurred...
                // </div>
                return false;


            })
    }

    async function deleteItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            {
                headers,
            })
            .then((res) => {
                setCartProducts(res.data.data.products);
                setNumCartItems(res.data.numOfCartItems);
                setTotalCartPrice(res.data.data.totalCartPrice);
                return true;
            })
            .catch((error) => {
                // <div className=" h-screen flex justify-center items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                //     An error occurred...
                // </div>
                return false;


            })
    }

    async function deleteAllItems() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`,
            {
                headers,
            })
            .then((res) => {
                setCartProducts([]);
                setNumCartItems(0);
                setTotalCartPrice(0);
                return true;
            })
            .catch((error) => {
                // <div className=" h-screen flex justify-center items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                //     An error occurred...
                // </div>
                return false;


            })
    }


    return (<cartContext.Provider value={{
        addProductToCart,
        getUserCart,
        updateCountItem,
        deleteItem,
        deleteAllItems,
        editToClearUI,
        isLoading,
        cartProducts,
        numCartItems,
        totalCartPrice,
        cartId,
        ownerId,

    }}>
        {children}
    </cartContext.Provider>
    )
}
