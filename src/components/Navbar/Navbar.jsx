import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/UserContext";
import { cartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { userLogin, setUserLogin } = useContext(userContext);
  const { numCartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/login');
  };

  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 static md:fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link className="font-customRegular text-lg md:text-xl" to="/">
            Shoop!
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse w-[70%] md:w-auto">
            <ul className="justify-between items-center font-medium hidden lg:flex md:space-x-2 md:me-5">
              {!userLogin && (
                <>
                  <li><i className="fa-brands fa-instagram" aria-label="Instagram"></i></li>
                  <li><i className="fa-brands fa-facebook" aria-label="Facebook"></i></li>
                  <li><i className="fa-brands fa-linkedin" aria-label="LinkedIn"></i></li>
                  <li><i className="fa-brands fa-youtube" aria-label="YouTube"></i></li>
                  <li><i className="fa-brands fa-twitter" aria-label="Twitter"></i></li>
                  <li><i className="fa-brands fa-tiktok" aria-label="TikTok"></i></li>
                </>
              )}
            </ul>
            <ul className="flex justify-between items-center w-full md:w-auto font-medium md:space-x-3 lg:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {userLogin ? (
                <>
                  <li><span className="cursor-pointer" onClick={handleLogout}>LogOut</span></li>
                  <li>Hi<b className="text-blue-700"> {userLogin.name}</b></li>
                  <li className="relative">
                    <Link to={'/cart'}>
                      <i className='fas fa-cart-shopping' aria-hidden="true"></i>
                      <span className='w-[20px] h-[20px] absolute bottom-3 left-3 bg-blue-700 rounded-full flex justify-center items-center text-white'>{numCartItems}</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to={'/login'}>Login</Link></li>
                  <li><Link to={'/register'}>Register</Link></li>
                </>
              )}
            </ul>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          {userLogin && (
            <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
              <ul className="flex flex-col text-center md:text-base p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-4 lg:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleLinkClick}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleLinkClick}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/categories"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleLinkClick}
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brands"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleLinkClick}
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleLinkClick}
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/AllOrders"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleLinkClick}
                  >
                    AllOrders
                  </NavLink>
                </li>
                <li>
                  <Link
                    to="/wishList"
                    onClick={handleLinkClick}
                     aria-label="Wishlist"
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-blue-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <i className="fa-solid fa-heart text-blue-700"  aria-hidden="true"></i>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};