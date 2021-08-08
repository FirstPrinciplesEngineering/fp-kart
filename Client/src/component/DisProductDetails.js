import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment } from 'react'
import { Carousel, Spinner, Image, Col, Row, ListGroup, Form } from 'react-bootstrap'
import { addToCart } from '../action/CartAction'
import { addToCartDB, getCartProducts, resetCartMessages } from '../action/AuthCartAction'
import Ratings from './Ratings'
import Message from '../Extras/Message'
import { Link } from 'react-router-dom'


const DisProductDetails = (props) => {

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const { cartItems } = useSelector(state => state.Cart)
    const { authCartItems } = useSelector(state => state.AuthCart)
    const { profile } = useSelector(state => state.UserLogin)
    const { addCartLoading, addCartSuccess, addCartError } = useSelector(state => state.AuthCart)

    useEffect(() => {
        return () => (
            dispatch(resetCartMessages())
        )
    }, [])

    const AddToCart = async (productData) => {
        if (profile) {
            await dispatch(addToCartDB(productData, Number(qty)))
            await dispatch(getCartProducts())
        }
        else {
            dispatch(addToCart(productData, Number(qty)))
        }
    }

    const renderDetails = (data) => {
        if (data) {
            return (
                <Row>
                    <Col md={6}>
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={data.image}
                                    alt={data.name}
                                />

                            </Carousel.Item>

                            {data.image2 ?
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={data.image2}
                                        alt={data.name}
                                    />
                                </Carousel.Item>
                                :
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={data.image}
                                        alt={data.name}
                                    />
                                </Carousel.Item>
                            }

                            {data.image3 &&
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={data.image3}
                                        alt={data.name}
                                    />
                                </Carousel.Item>
                            }

                        </Carousel>
                    </Col>

                    <Col md={5}>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <p className="heading">{data.name}</p>
                            </ListGroup.Item>

                            {
                                data.rating > 0 && <ListGroup.Item>
                                    <Ratings rating={data.rating} numReview={data.reviews && data.reviews.length} />
                                </ListGroup.Item>}

                            <ListGroup.Item>
                                <p className='subheading'>Rs  {data.price}</p>
                                <p>{data.quantity_available > 0 ? 'In Stock' : 'Out Of Stock'}</p>
                                <p>

                                    Qty
                                    <Form.Control style={{ width: '30%' }} as='select' value={qty} onChange={(e) => setQty(e.target.value)} >
                                        {

                                            data.quantity_available > 0 && [...Array(data.quantity_available).keys()].map((item) => (
                                                <option key={item + 1} value={item + 1}>
                                                    {item + 1}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>

                                </p>
                            </ListGroup.Item>

                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    {addCartSuccess && <Message variant='success'>{addCartSuccess}</Message>
                                    }
                                    {addCartError && <Message variant='danger'>{addCartError}</Message>}
                                    {
                                        cartItems && cartItems.find(items => items._id === data._id) || authCartItems && authCartItems.find(items => items.product_id === data._id) ?
                                            <Link to="/cart"><button style={{ width: '100%' }} className="page_btn">Go to cart</button></Link>
                                            :
                                            addCartLoading ? <button style={{ width: '100%' }} className="page_btn">
                                                <Spinner animation="border" />
                                            </button>
                                                :
                                                data.quantity_available <= 0 ?
                                                    <button style={{ width: '100%', backgroundColor: 'magenta' }} className="page_btn">Out Of Stock</button>
                                                    :
                                                    <button style={{ width: '100%' }} onClick={() => AddToCart(data)} className="page_btn">Add to cart</button>
                                    }
                                </ListGroup.Item>
                            </ListGroup>


                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <p className='subheading'>Description </p>
                                    {data.description}

                                    <p className='subheading'>Details </p>
                                    {data.product_details &&
                                        <>
                                            <p>Color : {data.product_details && data.product_details.color}</p>
                                            <p>Material : {data.product_details && data.product_details.material}</p>
                                            <p>Items in Pack : {data.product_details && data.product_details.items_in_pack}</p>
                                        </>
                                    }


                                </ListGroup.Item>
                            </ListGroup>

                        </ListGroup>
                    </Col>

                </Row>
            )
        }
    }

    return (
        <Fragment>
            {renderDetails(props.productDetails)}
        </Fragment>
    )
}

export default DisProductDetails
