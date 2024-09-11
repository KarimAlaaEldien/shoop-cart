import React from 'react'
import { ColorRing } from 'react-loader-spinner'

export default function Loader() {
    return (
        <>
        <div className='flex justify-center items-center'>
            <ColorRing
                visible={true}
                height="24"
                width="24"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
            />
            </div>
        </>
    )
}
