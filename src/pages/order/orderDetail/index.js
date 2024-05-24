import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import QuantityBox from '../../../components/quantityBox';
import { MyContext } from '../../../App';
import { addToCart } from '../../../Redux/Actions/main_action';

const Cart = () => {
    // const [cartItems, setCartItems] = useState([])
    const context = useContext(MyContext);
    const history = useNavigate();
    const { cartItems, detailOrders } = useSelector((store) => store.reducer)
    const dispatch = useDispatch()
    const [currentOrder, setCurrentOrder] = useState({})
    let { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


    useEffect(() => {
        window.scrollTo(0, 0)

        detailOrders.length !== 0 &&
            detailOrders.map((item, index) => {
                if (parseInt(index + 1) == parseInt(id)) {
                    setCurrentOrder(item);
                }
            })
    }, [id, detailOrders]);

    console.log(currentOrder, id, detailOrders, currentOrder?.orederList)
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

            <section className='cartSection mb-5'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='d-flex align-items-center w-100'>
                                <div className='left'>
                                    <h1 className='hd mb-0'>Order Detail</h1>
                                    {/* <p>There are <span className='text-g'>3</span> products in your cart</p> */}
                                </div>

                            </div>



                            <div className='cartWrapper mt-4'>
                                <div className='table-responsive'>
                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Unit Price</th>
                                                <th>Quantity</th>
                                                <th>Subtotal</th>
                                                {/* <th>Remove</th> */}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                currentOrder?.orederList && currentOrder?.orederList.length !== 0 &&
                                                currentOrder?.orederList.map((item, index) => {
                                                    return (
                                                        <tr>
                                                            <td width={"50%"}>
                                                                <div className='d-flex align-items-center'>

                                                                    <div className='img'>
                                                                        <Link to={`/product/${item.id}`}>
                                                                            <img src={item.Image + '?im=Resize=(100,100)'} className='w-100' />
                                                                        </Link>
                                                                    </div>


                                                                    <div className='info pl-4'>
                                                                        <Link to={`/product/${item.id}`}><h4>{item.productName}</h4></Link>
                                                                        <Rating name="half-rating-read"
                                                                            value={parseFloat(item.rating)} precision={0.5} readOnly /> <span className='text-light'>({parseFloat(item.rating)})</span>
                                                                    </div>

                                                                </div>
                                                            </td>

                                                            <td width="20%"><span>Rs:  {parseInt(item.price.split(",").join(""))}</span></td>

                                                            <td width="20%"><span>{item.quantity}</span>
                                                                {/* <QuantityBox item={item} cartItems={cartItems} index={index} updateCart={updateCart} /> */}
                                                            </td>

                                                            <td>
                                                                <span className='text-g'>Rs. {parseInt(item.price.split(",").join("")) * parseInt(item.quantity)}</span>
                                                            </td>

                                                            {/* <td align='center'>
                                                                <span className='cursor'
                                                                    onClick={() => removeCart(item.id)}
                                                                ><DeleteOutlineOutlinedIcon fontSize='large' style={{ color: 'ff0000b5' }} /></span>
                                                            </td> */}

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

                        <div className='col-md-4 cartRightBox'>
                            <div className='card p-4 '>
                                <h3 className='text-center font-weight-bold'>Payment Detail</h3>
                                {/* <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Subtotal</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'><span className='text-g'>
                                        {
                                            cartItems.length !== 0 &&
                                            cartItems.map(item => parseInt(item.price.split(",").join("")) * item.quantity).reduce((total, value) => total + value, 0)
                                        }
                                    </span></h3>
                                </div> */}

                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>User Name</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'><span className='text-g'>
                                        {
                                            currentOrder?.name
                                        }
                                    </span></h3>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Phone Number</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'><span>
                                        {
                                            currentOrder?.phoneNumber
                                        }
                                    </span></h3>
                                </div>

                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Quantity</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'>
                                        {
                                            currentOrder?.orederList && currentOrder?.orederList.length !== 0 &&
                                            currentOrder?.orederList.map(item => parseInt(item.quantity)).reduce((total, value) => total + value, 0)
                                        }
                                    </h3>
                                </div>


                                {/* <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Estimate for</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'>United Kingdom</h3>
                                </div> */}


                                <div className='d-flex align-items-center mb-4'>
                                    <h5 className='mb-0 text-light'>Total</h5>
                                    <h3 className='ml-auto mb-0 font-weight-bold'><span className='text-g'>
                                        {
                                            currentOrder?.orederList && currentOrder?.orederList.length !== 0 &&
                                            currentOrder?.orederList.map(item => parseInt(item.price.split(",").join("")) * item.quantity).reduce((total, value) => total + value, 0)
                                        }
                                    </span></h3>
                                </div>

                                
                            </div>
                        </div>

                    </div>
                </div>
            </section>


        </>
    )
}

export default Cart;
