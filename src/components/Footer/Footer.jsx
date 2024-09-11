import React from 'react'
import master from "../../assets/images/master.jpg"
import amazon from "../../assets/images/amazon.jpg"
import payPal from "../../assets/images/paypal.jpg"
import american from "../../assets/images/american.png"
import appStore from "../../assets/images/appStore.jpg"
import googlePlay from "../../assets/images/googlePlay.jpg"

export default function Footer() {

  return (

    <footer className="bg-gray-100 py-8 px-4">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">Get the Shoop app</h2>
        <p className="text-gray-600 mb-4">
          We will send you a link, open it on your phone to download the app.
        </p>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-2">
          <input
            type="email"
            placeholder="Email ..."
            className="border border-gray-300 p-2 rounded-md w-full sm:w-[75%] md:w-[80%] focus:outline-none"
          />
          <button className="bg-blue-600 text-white p-2 rounded-md  w-full sm:w-auto mt-4 sm:mt-0">
            Share App Link
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mt-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center ">
            <span className="text-gray-600">Payment Partners</span>
            <img
              src={amazon}
              alt="Amazon Pay"
              className="h-6 rounded-md"
            />
            <img
              src={american}
              alt="American Express"
              className="h-6 rounded-md"
            />
            <img
              src={master}
              alt="MasterCard"
              className="h-6 rounded-md"
            />
            <img
              src={payPal}
              alt="PayPal"
              className="h-6 rounded-md"
            />
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 items-center ">
            <span className="text-gray-600">Get deliveries with Shoop!</span>
            <img
              src={appStore}
              alt="App Store"
              className="h-8 rounded-md"
            />
            <img
              src={googlePlay}
              alt="Google Play"
              className="h-8 rounded-md"
            />
          </div>

        </div>
      </div>
    </footer>
  );
};
