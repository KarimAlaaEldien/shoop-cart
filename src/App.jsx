import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
// import Register from './components/Register/Register';
// import Login from './components/Login/Login';
// import NotFound from './components/NotFound/NotFound';
import UserContextProvider from './Context/UserContext';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishListContextProvider from './Context/WishListContext';
// import PasswordChangeCode from './components/PasswordChangeCode/PasswordChangeCode';
// import ResetPassword from './components/ResetPassword/ResetPassword';
// import ForgotPassword from './components/FogotPassword/FogotPassword';
import { Offline } from "react-detect-offline";
import { lazy, Suspense } from 'react';
import LoaderCart from './components/LoaderCart/LoaderCart';
const Home = lazy(() => import("./components/Home/Home"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Categories = lazy(() => import("./components/Categories/Categories"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const ProductsDetails = lazy(() => import("./components/ProductsDetails/ProductsDetails"));
const CashPayment = lazy(() => import("./components/CashPayment/CashPayment"));
const AllOrders = lazy(() => import("./components/AllOrders/AllOrders"));
const WishList = lazy(() => import("./components/WishList/WishList"));
const RecentProduct = lazy(() => import("./components/RecentProducts/RecentProducts"));
const BrandProduct = lazy(() => import("./components/BrandProduct/BrandProduct"));
const CategoryProduct = lazy(() => import("./components/CateogryProduct/CateogryProduct"));
const ForgotPassword = lazy(() => import("./components/FogotPassword/FogotPassword"));
const ResetPassword = lazy(() => import("./components/ResetPassword/ResetPassword"));
const PasswordChangeCode = lazy(() => import("./components/PasswordChangeCode/PasswordChangeCode"));
const Login = lazy(() => import("./components/Login/Login"));
const Register = lazy(() => import("./components/Register/Register"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));


let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><Home /></Suspense></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><Cart /></Suspense></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><Brands /></Suspense></ProtectedRoute> },
      { path: 'brandProduct/:selectedBrand/:brandName', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><BrandProduct /></Suspense></ProtectedRoute> },
      { path: 'categoryProduct/:selectedCategory/:categoryName', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><CategoryProduct /></Suspense></ProtectedRoute> },
      { path: 'productsDetails/:id/:category', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><ProductsDetails /></Suspense></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><Categories /></Suspense></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><RecentProduct /></Suspense></ProtectedRoute> },
      { path: 'Payment', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><CashPayment /></Suspense></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><AllOrders /></Suspense></ProtectedRoute> },
      { path: 'wishList', element: <ProtectedRoute><Suspense fallback={<LoaderCart/>}><WishList /></Suspense></ProtectedRoute> },
      { path: 'login', element: <Suspense fallback={<LoaderCart/>}><Login /></Suspense> },
      { path: 'register', element: <Suspense fallback={<LoaderCart/>}><Register /></Suspense> },
      { path: 'fogotPassword', element: <Suspense fallback={<LoaderCart/>}><ForgotPassword /></Suspense> },
      { path: 'resetCode', element: <Suspense fallback={<LoaderCart/>}><PasswordChangeCode /></Suspense> },
      { path: 'resetPassword', element: <Suspense fallback={<LoaderCart/>}><ResetPassword /></Suspense> },
      { path: '*', element: <Suspense fallback={<LoaderCart/>}><NotFound /></Suspense> },
    ]
  },
]);

const reactQueryConfig = new QueryClient()
function App() {
  return (
    <>

<Offline>
  <div className='fixed bottom-4 left-4 p-4 rounded-md bg-red-500 z-50 text-white'>
  You are currently offline
  </div>

</Offline>

      <UserContextProvider>
        <QueryClientProvider client={reactQueryConfig}>
          <CartContextProvider>
            <WishListContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <Toaster />
            </WishListContextProvider>
          </CartContextProvider>
        </QueryClientProvider>
      </UserContextProvider>
    </>
  )
}

export default App
