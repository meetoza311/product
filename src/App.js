import React, { useEffect, useState, createContext } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import './responsive.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Header from './components/header/header';
// import Footer from './components/footer/footer';
// import Home from './pages/Home/index';
// import About from './pages/About/index';
// import Listing from './pages/Listing';
// import NotFound from './pages/NotFound';
// import DetailsPage from './pages/Details';
// import Checkout from './pages/checkout';
// import axios from 'axios';
// import Cart from './pages/cart';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Loader from './assets/images/loading.gif';

// import data from './data';
// import menuDataJson from './menuData';
// import { CleaningServices, ConstructionOutlined } from '@mui/icons-material';
// import { useDispatch, useSelector } from 'react-redux';
// import { get_menuItem } from './Redux/Actions/main_action';
// import OrderPage from './pages/order';
// import OrderDetail from './pages/order/orderDetail';

const MyContext = createContext();

function App() {

//   const [productData, setProductData] = useState([]);
//   const [cartItems, setCartItems] = useState([]);
//   const [isLoading, setIsloading] = useState(true);
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   const [isopenNavigation, setIsopenNavigation] = useState(false);

//   const [isLogin, setIsLogin] = useState();
//   const [isOpenFilters, setIsopenFilters] = useState(false);

//   const [cartTotalAmount, setCartTotalAmount] = useState();
//   const dispatch = useDispatch();
//   const { error, allMenuItems } = useSelector((store) => store.reducer);
//   useEffect(() => {
//     // getData('http://localhost:5000/productData');
//     //  getCartData("http://localhost:5000/cartItems");

//     // const is_Login = localStorage.getItem('isLogin');
//     // setIsLogin(is_Login);

   
//       setTimeout(() => {
//         setProductData(data[1]);
//         setIsloading(false);
//       }, 3000);

//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (!allMenuItems || allMenuItems.length === 0) {
//       dispatch(get_menuItem());
//     }
//   }, [dispatch, allMenuItems]);

//   const getCartData = async (url) => {
//     try {
//         await axios.get(url).then((response) => {
//             setCartItems(response.data);
//         })

//     } catch (error) {
//         console.log(error.message);
//     }
// }

//   const addToCart = async (item) => {
//     item.quantity = 1;

//     try {
//       await axios.post("http://localhost:5000/cartItems", item).then((res) => {
//         if (res !== undefined) {
//           setCartItems([...cartItems, { ...item, quantity: 1 }])
//         }
//       })
//     } catch (error) {
//       console.log(error)
//     }

//   }




//   const removeItemsFromCart = async(id) => {
//     const response = await axios.delete(`http://localhost:5000/cartItems/${id}`);
//     if (response !== null) {
//         getCartData("http://localhost:5000/cartItems");
//     }
//   }

//   const emptyCart = () => {
//     setCartItems([])
//   }


//   const signIn = () => {
//     const is_Login = localStorage.getItem('isLogin');
//     setIsLogin(is_Login);
//   }


//   const signOut = () => {
//     localStorage.removeItem('isLogin');
//     setIsLogin(false);
//   }


//   const openFilters=()=>{
//     setIsopenFilters(!isOpenFilters)
//   }

//   const value = {
//     cartItems,
//     isLogin,
//     windowWidth,
//     isOpenFilters,
//     addToCart,
//     removeItemsFromCart,
//     emptyCart,
//     signOut,
//     signIn,
//     openFilters,
//     isopenNavigation,
//     setIsopenNavigation,
//     setCartTotalAmount,
//     cartTotalAmount,
//     setCartItems,
//     cartItems
//   }

  return (
    
    <div>hello</div>
    // data.productData.length !== 0 &&
    // <BrowserRouter basename='/product'>
    //   <MyContext.Provider value={value}>
    //     {
    //       isLoading===true && <div className='loader'><img src={Loader}/></div>
    //     }

    //     <Header/>
    //     <Routes>
    //       <Route exact={true} path="/product" element={<Home />} />
    //       <Route exact={true} path="/cat/:id" element={<Listing  single={true} />} />
    //       {/* <Route exact={true} path="/cat/:id/:id" element={<Listing data={data.productData} single={false} />} /> */}
    //       <Route exact={true} path="/product/:id" element={<DetailsPage  />} />
    //       <Route exact={true} path="/cart" element={<Cart />} />
    //       <Route exact={true} path="/order" element={<OrderPage />} />
    //       <Route exact={true} path="/order/:id" element={<OrderDetail />} />
    //       <Route exact={true} path="/signIn" element={<SignIn />} />
    //       <Route exact={true} path="/signUp" element={<SignUp />} />
    //       <Route exact={true} path="/checkout" element={<Checkout />} />
    //       <Route exact={true} path="*" element={<NotFound />} />
    //     </Routes>
    //    <Footer/>
    //   </MyContext.Provider>
    // </BrowserRouter>
  );
}

export default App;

export { MyContext }
