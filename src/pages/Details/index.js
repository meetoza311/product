import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import Slider from "react-slick";
import { useRef } from 'react';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import Product from '../../components/product';
import axios from 'axios';
import { MyContext } from '../../App';
import { addToCart, get_menuItem } from '../../Redux/Actions/main_action';
import { useDispatch, useSelector } from 'react-redux';


const DetailsPage = (props) => {

    const [zoomInage, setZoomImage] = useState('https://www.jiomart.com/images/product/original/490000363/maggi-2-minute-masala-noodles-70-g-product-images-o490000363-p490000363-0-202305292130.jpg');

    const [bigImageSize, setBigImageSize] = useState([1500, 1500]);
    const [smlImageSize, setSmlImageSize] = useState([150, 150]);
    const [cart, setCart] = useState({});

    const [activeSize, setActiveSize] = useState(0);

    const [inputValue, setinputValue] = useState(1);

    const [activeTabs, setActiveTabs] = useState(0);

    const [currentProduct, setCurrentProduct] = useState({})
    const [isAdded, setIsadded] = useState(false);

    const context = useContext(MyContext);

    const [prodCat, setProdCat] = useState({
        parentCat: sessionStorage.getItem('parentCat'),
        subCatName: sessionStorage.getItem('subCatName')
    })

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [rating, setRating] = useState(0.0);

    const [reviewsArr, setReviewsArr] = useState([]);

    const [isAlreadyAddedInCart, setisAlreadyAddedInCart] = useState(false);

    const dispatch = useDispatch();
    const { error, allMenuItems, cartItems } = useSelector((store) => store.reducer);

    const [reviewFields, setReviewFields] = useState({
        review: '',
        userName: '',
        rating: 0.0,
        productId: 0,
        date: ''
    })


    const zoomSliderBig = useRef();
    const zoomSlider = useRef();

    let { id } = useParams();


    var settings2 = {
        dots: false,
        infinite: false,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        arrows: false,
    };


    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth > 992 ? true : false
    };


    var related = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        fade: false,
        arrows: context.windowWidth > 992 ? true : false
    };


    const goto = (index) => {

        zoomSlider.current.slickGoTo(index);
        zoomSliderBig.current.slickGoTo(index);
    }


    const isActive = (index) => {
        setActiveSize(index);
    }


    const plus = () => {
        setinputValue(inputValue + 1)
    }

    const minus = () => {
        if (inputValue !== 1) {
            setinputValue(inputValue - 1)
        }
    }


    useEffect(() => {
        if (!allMenuItems || allMenuItems.length === 0) {
            dispatch(get_menuItem());
        }
    }, [dispatch, allMenuItems]);


    useEffect(() => {
        window.scrollTo(0, 0)

        allMenuItems.length !== 0 &&
            allMenuItems.map((item) => {
                item.items.length !== 0 &&
                    item.items.map((item_) => {
                        // item_.products.length !== 0 &&
                        //     item_.products.map((product) => {
                        if (parseInt(item_.id) === parseInt(id)) {
                            setCurrentProduct(item_);
                        }
                        // })
                    })
            })
    }, [id, allMenuItems]);

    console.log(allMenuItems)

    const addToCartData = (product) => {
        const existingIndex = cartItems.findIndex(item => item.id === product.id);
        console.log(product, existingIndex)
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



    const changeInput = (name, value) => {
        if (name === "rating") {
            setRating(value);
        }
        setReviewFields(() => ({
            ...reviewFields,
            [name]: value,
            productId: id,
            date: new Date().toLocaleString()
        }))



    }

    const reviews_Arr = [];

    const submitReview = async (e) => {
        e.preventDefault();

        try {

            await axios.post("http://localhost:5000/productReviews", reviewFields).then((response) => {
                reviews_Arr.push(response.data);
                setReviewFields(() => ({
                    review: '',
                    userName: '',
                    rating: 0.0,
                    productId: 0,
                    date: ''
                }))
            })

        } catch (error) {
            console.log(error.message);
        }

        showReviews();
    }

    var reviews_Arr2 = [];
    const showReviews = async () => {
        try {
            await axios.get("http://localhost:5000/productReviews").then((response) => {
                if (response.data.length !== 0) {
                    response.data.map((item) => {
                        if (parseInt(item.productId) === parseInt(id)) {
                            reviews_Arr2.push(item)
                        }

                    })

                }
            })
        } catch (error) {
            console.log(error.message);
        }

        if (reviews_Arr2.length !== 0) {

            setReviewsArr(reviews_Arr2);
        }

    }

    useEffect(() => {
        if (cartItems.length) {
            const existingItemIndex = cartItems.findIndex(item => item.id === currentProduct?.id);
            if (existingItemIndex !== -1) {
                setCart(cartItems[existingItemIndex])
            } else {
                setCart({})
            }
        } else {
            setCart({})
        }
    }, [dispatch, cartItems, currentProduct]);

    // const addToCart = (item) => {
    //     context.addToCart(item);
    //     setIsadded(true);
    // }



    return (
        <>


            {/* 
            {
                context.windowWidth < 992 && <Button className={`btn-g btn-lg w-100 filterBtn {isAlreadyAddedInCart===true && 'no-click'}`} onClick={() => addToCart(currentProduct)}><ShoppingCartOutlinedIcon />
                    {
                        isAdded === true || isAlreadyAddedInCart === true ? 'Added' : 'Add To Cart'
                    }
                </Button>

            } */}



            <section className="detailsPage mb-5">
                {/* {
                    context.windowWidth > 992 &&
                    <div className='breadcrumbWrapper mb-4'>
                        <div className='container-fluid'>
                            <ul className="breadcrumb breadcrumb2 mb-0">
                                <li><Link>Home</Link>  </li>
                                <li><Link to={`/cat/${prodCat.parentCat.split(' ').join('-').toLowerCase()}`}
                                    onClick={() => sessionStorage.setItem('cat', prodCat.parentCat.split(' ').join('-').toLowerCase())} className='text-capitalize'>{prodCat.parentCat}</Link> </li>

                                <li><Link to={`/cat/${prodCat.parentCat.toLowerCase()}/${prodCat.subCatName.replace(/\s/g, '-').toLowerCase()}`}
                                    onClick={() => sessionStorage.setItem('cat', prodCat.subCatName.toLowerCase())} className='text-capitalize'>{prodCat.subCatName}</Link> </li>
                                <li>{currentProduct.productName}</li>
                            </ul>
                        </div>

                    </div>
                } */}




                <div className='container detailsContainer pt-3 pb-3'>
                    <div className='row'>

                        {/* productZoom code start here */}
                        <div className='col-md-5'>
                            <div className='productZoom'>
                                <Slider {...settings2} className='zoomSliderBig' ref={zoomSliderBig}>
                                    {

                                        <div className='item'>
                                            <InnerImageZoom
                                                zoomType="hover" zoomScale={1}
                                                src={`${currentProduct.Image}?im=Resize=(${bigImageSize[0]},${bigImageSize[1]})`} />

                                        </div>


                                    }

                                </Slider>
                            </div>


                            {/* <Slider {...settings} className='zoomSlider' ref={zoomSlider}>

                                {
                                    currentProduct.productImages !== undefined &&
                                    currentProduct.productImages.map((imgUrl, index) => {
                                        return (
                                            <div className='item'>
                                                <img src={`${imgUrl}?im=Resize=(${smlImageSize[0]},${smlImageSize[1]})`} className='w-100'
                                                    onClick={() => goto(index)} />
                                            </div>
                                        )
                                    })
                                }


                            </Slider> */}

                        </div>
                        {/* productZoom code ends here */}


                        {/* product info code start here */}
                        <div className='col-md-7 productInfo'>
                            <h1>{currentProduct.productName}</h1>
                            <div className='d-flex align-items-center mb-4 mt-3'>
                                <Rating name="half-rating-read" value={parseFloat(currentProduct.rating)} precision={0.5} readOnly />
                                <span className='text-light ml-2'>(32 reviews)</span>
                            </div>

                            <div className='priceSec d-flex align-items-center mb-3'>
                                <span className='text-g priceLarge'>Rs {currentProduct.price}</span>
                                <div className='ml-3 d-flex flex-column'>
                                    <span className='text-org'>{currentProduct.discount}% Off</span>
                                    <span className='text-light oldPrice'>Rs {currentProduct.oldPrice}</span>
                                </div>
                            </div>

                            <p>{currentProduct.description}</p>
                            {
                                <div className='d-flex align-items-center justify-content-between mt-3 svg-icon-style' style={{ width: '20%' }}>
                                    <div className='remove'>
                                        <RemoveCircleIcon onClick={() => removeToCartData(currentProduct)} style={{ cursor: 'pointer' }} />
                                    </div>
                                    <div>{cart?.quantity || 0}</div>
                                    <div className='add'>
                                        <AddCircleIcon onClick={() => addToCartData(currentProduct)} style={{ cursor: 'pointer' }} />
                                    </div>
                                </div>
                            }

                            {/* {
                                currentProduct.weight !== undefined && currentProduct.weight.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>Size / Weight:</span>
                                    <ul className='list list-inline mb-0 pl-4'>
                                        {
                                            currentProduct.weight.map((item, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{item}g</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            } */}


                            {/* 
                            {
                                currentProduct.RAM !== undefined && currentProduct.RAM.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>RAM:</span>
                                    <ul className='list list-inline mb-0 pl-4'>
                                        {
                                            currentProduct.RAM.map((RAM, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{RAM} GB</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            } */}



                            {/* {
                                currentProduct.SIZE !== undefined && currentProduct.SIZE.length !== 0 &&
                                <div className='productSize d-flex align-items-center'>
                                    <span>SIZE:</span>
                                    <ul className='list list-inline mb-0 pl-4'>
                                        {
                                            currentProduct.SIZE.map((SIZE, index) => {
                                                return (
                                                    <li className='list-inline-item'><a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{SIZE}</a></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            } */}


                            <div className='d-flex align-items-center'>


                                <div className='d-flex align-items-center'>

                                    {/* {
                                        context.windowWidth > 992 && <Button className={`btn-g btn-lg addtocartbtn ${isAlreadyAddedInCart === true && 'no-click'}`} onClick={() => addToCart(currentProduct)}><ShoppingCartOutlinedIcon />
                                            {
                                                isAdded === true || isAlreadyAddedInCart === true ? 'Added' : 'Add To Cart'
                                            }
                                        </Button>

                                    } */}
                                    {/* <Button className=' btn-lg addtocartbtn  ml-3  wishlist btn-border'><FavoriteBorderOutlinedIcon /> </Button>
                                    <Button className=' btn-lg addtocartbtn ml-3 btn-border'><CompareArrowsIcon /></Button> */}

                                </div>


                            </div>

                        </div>
                        {/* product info code ends here */}
                    </div>



                    <div className='card mt-5 p-5 detailsPageTabs'>
                        <div className='customTabs'>
                            <ul className='list list-inline'>
                                <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 0 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(0)

                                        }}
                                    >Description</Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 1 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(1)

                                        }}
                                    >Additional info</Button>
                                </li>
                                <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 2 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(2)
                                            showReviews()
                                        }}
                                    >Reviews (3)</Button>
                                </li>

                            </ul>


                            <br />

                            {
                                activeTabs === 0 &&
                                <div className='tabContent'>
                                    <p>{currentProduct.description}</p>
                                </div>

                            }


                            {
                                activeTabs === 1 &&

                                <div className='tabContent'>
                                    <div className='table-responsive'>
                                        <table className='table table-bordered'>
                                            <tbody>
                                                <tr class="stand-up">
                                                    <th>Stand Up</th>
                                                    <td>
                                                        <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                                                    </td>
                                                </tr>
                                                <tr class="folded-wo-wheels">
                                                    <th>Folded (w/o wheels)</th>
                                                    <td>
                                                        <p>32.5″L x 18.5″W x 16.5″H</p>
                                                    </td>
                                                </tr>
                                                <tr class="folded-w-wheels">
                                                    <th>Folded (w/ wheels)</th>
                                                    <td>
                                                        <p>32.5″L x 24″W x 18.5″H</p>
                                                    </td>
                                                </tr>
                                                <tr class="door-pass-through">
                                                    <th>Door Pass Through</th>
                                                    <td>
                                                        <p>24</p>
                                                    </td>
                                                </tr>
                                                <tr class="frame">
                                                    <th>Frame</th>
                                                    <td>
                                                        <p>Aluminum</p>
                                                    </td>
                                                </tr>
                                                <tr class="weight-wo-wheels">
                                                    <th>Weight (w/o wheels)</th>
                                                    <td>
                                                        <p>20 LBS</p>
                                                    </td>
                                                </tr>
                                                <tr class="weight-capacity">
                                                    <th>Weight Capacity</th>
                                                    <td>
                                                        <p>60 LBS</p>
                                                    </td>
                                                </tr>
                                                <tr class="width">
                                                    <th>Width</th>
                                                    <td>
                                                        <p>24″</p>
                                                    </td>
                                                </tr>
                                                <tr class="handle-height-ground-to-handle">
                                                    <th>Handle height (ground to handle)</th>
                                                    <td>
                                                        <p>37-45″</p>
                                                    </td>
                                                </tr>
                                                <tr class="wheels">
                                                    <th>Wheels</th>
                                                    <td>
                                                        <p>12″ air / wide track slick tread</p>
                                                    </td>
                                                </tr>
                                                <tr class="seat-back-height">
                                                    <th>Seat back height</th>
                                                    <td>
                                                        <p>21.5″</p>
                                                    </td>
                                                </tr>
                                                <tr class="head-room-inside-canopy">
                                                    <th>Head room (inside canopy)</th>
                                                    <td>
                                                        <p>25″</p>
                                                    </td>
                                                </tr>
                                                <tr class="pa_color">
                                                    <th>Color</th>
                                                    <td>
                                                        <p>Black, Blue, Red, White</p>
                                                    </td>
                                                </tr>
                                                <tr class="pa_size">
                                                    <th>Size</th>
                                                    <td>
                                                        <p>M, S</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            }



                            {
                                activeTabs === 2 &&

                                <div className='tabContent'>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <h3>Customer questions & answers</h3>
                                            <br />



                                            {
                                                reviewsArr.length !== 0 && reviewsArr !== undefined &&
                                                reviewsArr.map((item, index) => {


                                                    return (


                                                        <div className='card p-4 reviewsCard flex-row' key={index}>
                                                            <div className='image'>
                                                                <div className='rounded-circle'>
                                                                    <img src='https://wp.alithemes.com/html/nest/demo/assets/imgs/blog/author-2.png' />
                                                                </div>
                                                                <span className='text-g d-block text-center font-weight-bold'>{item.userName}</span>
                                                            </div>


                                                            <div className='info pl-5'>
                                                                <div className='d-flex align-items-center w-100'>
                                                                    <h5 className='text-light'>{item.date}</h5>
                                                                    <div className='ml-auto'>
                                                                        <Rating name="half-rating-read"
                                                                            value={parseFloat(item.rating)} precision={0.5} readOnly />
                                                                    </div>
                                                                </div>

                                                                <p>{item.review} </p>
                                                            </div>

                                                        </div>
                                                    )


                                                })
                                            }





                                            <br className='res-hide' />

                                            <br className='res-hide' />





                                            <form className='reviewForm' onSubmit={submitReview}>

                                                <h4>Add a review</h4> <br />
                                                <div className='form-group'>
                                                    <textarea className='form-control' placeholder='Write a Review'
                                                        name="review" value={reviewFields.review} onChange={(e) => changeInput(e.target.name, e.target.value)}></textarea>
                                                </div>

                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <input type='text' value={reviewFields.userName} className='form-control' placeholder='Name' name='userName' onChange={(e) => changeInput(e.target.name, e.target.value)} />
                                                        </div>
                                                    </div>

                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <Rating name="rating" value={rating} precision={0.5}
                                                                onChange={(e) => changeInput(e.target.name, e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                </div>


                                                <br />
                                                <div className='form-group'>
                                                    <Button type='submit' className='btn-g btn-lg'>Submit Review</Button>
                                                </div>

                                            </form>

                                        </div>




                                        <div className='col-md-4 pl-5 reviewBox'>
                                            <h4>Customer reviews</h4>

                                            <div className='d-flex align-items-center mt-2'>
                                                <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                                                <strong className='ml-3'>4.8 out of 5</strong>
                                            </div>

                                            <br />




                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className='mr-3'>5 star</span>
                                                <div class="progress" style={{ width: '85%', height: '20px' }}>
                                                    <div class="progress-bar bg-success" style={{ width: '75%', height: '20px' }}>75%</div>
                                                </div>
                                            </div>


                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className='mr-3'>4 star</span>
                                                <div class="progress" style={{ width: '85%', height: '20px' }}>
                                                    <div class="progress-bar bg-success" style={{ width: '50%', height: '20px' }}>50%</div>
                                                </div>
                                            </div>



                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className='mr-3'>3 star</span>
                                                <div class="progress" style={{ width: '85%', height: '20px' }}>
                                                    <div class="progress-bar bg-success" style={{ width: '55%', height: '20px' }}>55%</div>
                                                </div>
                                            </div>



                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className='mr-3'>2 star</span>
                                                <div class="progress" style={{ width: '85%', height: '20px' }}>
                                                    <div class="progress-bar bg-success" style={{ width: '35%', height: '20px' }}>35%</div>
                                                </div>
                                            </div>



                                            <div className="progressBarBox d-flex align-items-center">
                                                <span className='mr-3'>1 star</span>
                                                <div class="progress" style={{ width: '85%', height: '20px' }}>
                                                    <div class="progress-bar bg-success" style={{ width: '25%', height: '20px' }}>25%</div>
                                                </div>
                                            </div>




                                        </div>




                                    </div>
                                </div>
                            }




                        </div>
                    </div>


                    <br />

                    {/* <div className='relatedProducts homeProductsRow2  pt-5 pb-4'>
                        <h2 class="hd mb-0 mt-0">Related products</h2>
                        <br className='res-hide' />
                        <Slider {...related} className='prodSlider'>

                            {

                                relatedProducts.length !== 0 &&
                                relatedProducts.map((product, index) => {

                                    return (
                                        <div className='item' key={index}>
                                            <Product tag={product.type} item={product} />
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div> */}


                </div>


            </section>
        </>
    )
}


export default DetailsPage;
