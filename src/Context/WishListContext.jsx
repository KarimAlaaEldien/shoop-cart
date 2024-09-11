import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react';


export const wishListContext = createContext();

export default function WishListContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [allProFavourite, setAllProFavourite] = useState([]);
    const headers = {
        token: localStorage.getItem('userToken'),
    }
    const baseUrl = "https://ecommerce.routemisr.com"


    async function addWishList(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            "productId": productId,
        },
            { headers, })
            .then((res) => {
                allProductFromWishList()
                return true
            })
            .catch((error) => {
                console.log(error);
                return false
            })
    };

    async function removeProductFromWishList(productId) {
        return axios.delete(`${baseUrl}/api/v1/wishlist/${productId}`, { headers, })
            .then((res) => {
                setAllProFavourite((prev) => prev.filter((product) => product._id !== productId));
                console.log(res);
                return true
            })
            .catch((error) => {
                console.log(error);
                return false
            })
    };



    async function allProductFromWishList() {
        setIsLoading(true)

        return axios.get(`${baseUrl}/api/v1/wishlist`, { headers, })
            .then((res) => {
                    setAllProFavourite(res.data.data)
                    setIsLoading(false);
                return true
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
                return false
            })
    };


    useEffect(() => {
        allProductFromWishList()

    }, [])

    return (<wishListContext.Provider value={{
        addWishList,
        removeProductFromWishList,
        allProductFromWishList,
        allProFavourite,
        isLoading,
    }}>
        {children}
    </wishListContext.Provider>
    )
};