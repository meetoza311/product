import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import QuantityBox from '../../components/quantityBox';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { MyContext } from '../../App';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/Actions/main_action';
import VisibilityIcon from '@mui/icons-material/Visibility';

const OrderDetails = () => {
    // const [cartItems, setCartItems] = useState([])
    const context = useContext(MyContext);
    const history = useNavigate();
    const { cartItems, detailOrders } = useSelector((store) => store.reducer)
    const dispatch = useDispatch()

    useEffect(() => {
        //    if(context.isLogin!=="true"){
        //     history("/signIn");
        //    }else{
        // setCartItems(context.cartItems);
        //    }


        window.scrollTo(0, 0);

    }, [detailOrders])

    console.log(detailOrders)
    const updateCart = (items) => {
        console.log(items)
        // setCartItems(items)
    }


    const removeCart = (Id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== Id);
        console.log(updatedCartItems)
        dispatch(addToCart(updatedCartItems));
    }



    return (
        <>
            {
                context.windowWidth > 992 && <div className="breadcrumbWrapper mb-4">
                    <div className="container-fluid">
                        <ul className="breadcrumb breadcrumb2 mb-0">
                            <li>
                                <Link to={'/'}>Home</Link>
                            </li>
                            <li>
                                Shop
                            </li>
                            <li>
                                Cart
                            </li>
                        </ul>
                    </div>
                </div>

            }

            <section className='cartSection mb-3'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='d-flex align-items-center w-100'>
                                <div className='left'>
                                    <h1 className='hd mb-0'>Order Details</h1>
                                    <p>There are <span className='text-g'>{detailOrders.length}</span> orders</p>
                                </div>

                            </div>



                            <div className='cartWrapper mt-4'>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Order</th>
                                                <th>UserName</th>
                                                <th>Date</th>
                                                <th className='text-center'>Quantity</th>
                                                <th>Status</th>
                                                <th>UserPhone</th>
                                                <th className='text-right'>Action</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                detailOrders.length !== 0 &&
                                                detailOrders.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td>
                                                                <span className='d-flex align-items-center'>
                                                                    {index + 1}
                                                                    {/* <div className='img'>
                                                                        <Link to={`/product/${item.id}`}>
                                                                            <img src={item.Image + '?im=Resize=(100,100)'} className='w-100' />
                                                                        </Link>
                                                                    </div>


                                                                    <div className='info pl-4'>
                                                                        <Link to={`/product/${item.id}`}><h4>{item.productName}</h4></Link>
                                                                        <Rating name="half-rating-read"
                                                                            value={parseFloat(item.rating)} precision={0.5} readOnly /> <span className='text-light'>({parseFloat(item.rating)})</span>
                                                                    </div> */}

                                                                </span>
                                                            </td>
                                                            <td width={"20%"}>
                                                                <span className='text-g'>{item?.name}</span>
                                                            </td>

                                                            <td width="20%"><span>{item.date}</span></td>

                                                            <td className='text-center'>
                                                                <span>{
                                                                    item?.orederList.length !== 0 &&
                                                                    item.orederList.map(newItem => parseInt(newItem.quantity)).reduce((total, value) => total + value, 0)
                                                                }</span>
                                                            </td>

                                                            <td>
                                                                <span className='text-g'>{item?.status}</span>
                                                            </td>


                                                            <td>
                                                                <span>{item?.phoneNumber}</span>
                                                            </td>
                                                            <td className='text-right'>
                                                                <span><VisibilityIcon  style={{fontSize:'40px',cursor:'pointer'}} onClick={()=>history(`/order/${index+1}`)}/></span>
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            }


                                        </tbody>

                                    </table>
                                </div>
                            </div>

                            <br />

                        </div>

        

                    </div>
                </div>
            </section>


        </>
    )
}

export default OrderDetails;
