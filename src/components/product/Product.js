import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { MyContext } from '../../App';
import { addToCart } from '../../Redux/Actions/main_action';
import { useDispatch, useSelector } from 'react-redux';


const ProductDemo = (props) => {
    const dispatch = useDispatch();
    const { error, allMenuItems, cartItems } = useSelector((store) => store.reducer);
    const [productData, setProductData] = useState();
    const [isAdded, setIsadded] = useState(false);
    const [cart, setCart] = useState({});

    const context = useContext(MyContext);

    useEffect(() => {
        setProductData(props.item);
    }, [props.item])

    const setProductCat = () => {
        sessionStorage.setItem('parentCat', productData.parentCatName);
        sessionStorage.setItem('subCatName', productData.subCatName);
    }


    const addToCartData = (product) => {
        const existingIndex = cartItems.findIndex(item => item.id === product.id);
    
        if (existingIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingIndex].quantity++;
            updatedCartItems[existingIndex].subtotal = calculateOrderPrice(updatedCartItems[existingIndex]);
            dispatch(addToCart(updatedCartItems));
        } else {
            product.quantity = 1;
            dispatch(addToCart([...cartItems, { ...product, subtotal: calculateOrderPrice(product) }]));
        }
    }
    

    const calculateOrderPrice = (Item) => {
        return Number(Item.price) * Item.quantity;
    };


    const removeToCartData = (product) => {
        const existingIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingIndex !== -1) {
            const updatedCartItems = [...cartItems];
            if (updatedCartItems[existingIndex].quantity > 1) {
                updatedCartItems[existingIndex].quantity--;
                updatedCartItems[existingIndex].subtotal = calculateOrderPrice(updatedCartItems[existingIndex]);
            } else {
                updatedCartItems.splice(existingIndex, 1);
            }
            dispatch(addToCart(updatedCartItems));
        }
    }

    useEffect(() => {
        if (cartItems.length) {
            const existingItemIndex = cartItems.findIndex(item => item.id === productData?.id);
            if (existingItemIndex !== -1) {
                setCart(cartItems[existingItemIndex])
            }else{
                setCart({}) 
            }
        } else {
            setCart({})
        }
    }, [dispatch, cartItems, productData]);

    return (
        <div className='productThumb' onClick={setProductCat}>
            {
                props.tag !== null && props.tag !== undefined &&
                <span className={`badge ${props.tag}`}>{props.tag}</span>
            }

            {
                productData !== undefined &&
                <>
                    <Link to={`/product/${productData.id}`}>
                        <div className='imgWrapper'>
                            <div className='p-4 wrapper mb-3'>
                                <img src={productData.Image + '?im=Resize=(420,420)'} className='w-100' />
                            </div>

                            <div className='overlay transition'>
                                <ul className='list list-inline mb-0'>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Add to Wishlist">
                                            <FavoriteBorderOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Compare">
                                            <CompareArrowsOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' tooltip="Quick View">
                                            <RemoveRedEyeOutlinedIcon />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </Link>

                    <div className='info'>
                        {/* <span className='d-block catName'>{productData?.brand}</span> */}
                        <h4 className='title'><Link>{productData.productName.substr(0, 50) + '...'}</Link></h4>
                        <Rating name="half-rating-read"
                            value={parseFloat(productData.rating)} precision={0.5} readOnly />
                        <span className='brand d-block text-g'>By <Link className='text-g'>{productData.brand}</Link></span>

                        <div className='d-flex align-items-center mt-3'>
                            <div className='d-flex align-items-center w-100'>
                                <span className='price text-g font-weight-bold'>
                                    Rs {productData.price}</span> <span className='oldPrice ml-auto'>Rs {productData.oldPrice}</span>
                            </div>
                        </div>

                        {/* <Button className='w-100 transition mt-3' onClick={() => addToCart(productData)}><ShoppingCartOutlinedIcon />
                            {
                                isAdded === true ? 'Added' : 'Add'
                            }
                        </Button> */}
                        {
                            <div className='d-flex align-items-center justify-content-between mt-3 svg-icon-style'>
                                <div className='remove'>
                                    <RemoveCircleIcon onClick={() => removeToCartData(productData)} style={{cursor:'pointer'}}/>
                                </div>
                                <div>{cart?.quantity || 0}</div>
                                <div className='add'>
                                    <AddCircleIcon onClick={() => addToCartData(productData)} style={{cursor:'pointer'}}/>
                                </div>
                            </div>
                        }

                    </div>

                </>
            }
        </div>
    )
}

export default ProductDemo;