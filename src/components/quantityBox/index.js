
import React, { useState, useEffect } from 'react';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { addToCart } from '../../Redux/Actions/main_action';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';



const QuantityBox = (props) => {
    const [inputValue, setinputValue] = useState();
    const dispatch = useDispatch()
    const { cartItems } = useSelector((store) => store.reducer)

    useEffect(() => {
        setinputValue(props.item.quantity)
    }, [cartItems])

    const calculateOrderPrice = (Item) => {
        return Number(Item.price) * Item.quantity;
    };

    const updateCartData = (product) => {
        const existingIndex = cartItems.findIndex(item => item.id === product.id);

        if (existingIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingIndex].quantity++
            setinputValue(inputValue+1)
            updatedCartItems[existingIndex].subtotal = calculateOrderPrice(updatedCartItems[existingIndex]);
            dispatch(addToCart(updatedCartItems));
        }

    }

    const removeToCartData = (product) => {
        const existingIndex = cartItems.findIndex(item => item.id === product.id);
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[existingIndex].quantity > 1) {
            updatedCartItems[existingIndex].quantity--
            setinputValue(inputValue-1)
            updatedCartItems[existingIndex].subtotal = calculateOrderPrice(updatedCartItems[existingIndex]);
        } else {
            updatedCartItems.splice(existingIndex, 1);
        }
        dispatch(addToCart(updatedCartItems));

    }

    return (

        <div className='d-flex align-items-center justify-content-between mt-3 svg-icon-style'>
            <div className='remove'>
                <RemoveCircleIcon onClick={() => removeToCartData(props.item)} style={{ cursor: 'pointer' }} />
            </div>
            <div>{inputValue || 0}</div>
            <div className='add'>
                <AddCircleIcon onClick={() => updateCartData(props.item)} style={{ cursor: 'pointer' }} />
            </div>
        </div>
    )
}

export default QuantityBox;