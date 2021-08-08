import React, { Fragment, useEffect } from 'react'
import { Container, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../Extras/Message'
import Loader from '../Extras/Loader'
import CheckoutNav from './CheckoutNav'
import SubHeader from './SubHeader'
import { razorPayPayment } from '../action/razorpayAction'
import { emptyAuthCart, emptyCartDB } from '../action/AuthCartAction'
import { resetPlaceOrder } from '../action/orderAction'


const PlaceOrder = ({ history }) => {

    const dispatch = useDispatch()
    const cart = useSelector(state => state.Cart)
    const { shippingAddress, paymentMethod } = cart
    const authcart = useSelector(state => state.AuthCart)
    const { authCartItems } = authcart
    const { profile } = useSelector(state => state.UserLogin)
    const { loading, order, success, error } = useSelector(state => state.PlaceOrder)

    useEffect(async () => {
        if (!profile) {
            history.push('/login')
        }
        if (authCartItems.length <= 0) {
            history.push('/cart')
        }
        if (success) {
            await dispatch(emptyAuthCart())
            await dispatch(emptyCartDB())
            history.push('/order_placed') 
        }
        return ()=>{
            dispatch(resetPlaceOrder())
        }
    }, [history, profile, success])


    if (authCartItems.length > 0) {

        authcart.itemsPrice = authCartItems.map(item => item.price * item.quantity_selected).reduce((total, price) => total + price)

        authcart.deliveryPrice = authcart.itemsPrice > 200 ? 0 : 80

        authcart.totalPrice = authcart.itemsPrice + authcart.deliveryPrice
    }

    const placeOrderHandler = () => {
        dispatch(razorPayPayment())
    }

    return (
        <Fragment>
            <SubHeader />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container>
                <Row className="justify-content-md-center">
                    <CheckoutNav process1 process2 process3 />
                    <Row>

                        <Col md={8}>
                            <ListGroup variant='flush'>
                                {loading && <Loader />}
                                {error && <Message variant='danger'>{error}</Message>}
                                <ListGroup.Item>
                                    <p className='subheading'>Shipping Address</p>
                                    <p>
                                        {shippingAddress.name}, {shippingAddress.address}, {shippingAddress.locality}, {shippingAddress.city}, {shippingAddress.state}, {shippingAddress.pincode}, {shippingAddress.mobile}
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <p className='subheading'>Payment Method</p>
                                    <p>
                                        {paymentMethod}
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <p className='subheading'>Product List</p>
                                    {authCartItems.length === 0 ? <Message variant='danger'>Cart is empty</Message> : (
                                        <ListGroup variant='flush'>
                                            {authCartItems.map((item, idx) => {
                                                return <ListGroup.Item key={idx}>
                                                    <Row>
                                                        <Col md={2}>
                                                            <Link to={`/product_details/${item.product_id}`}>
                                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            <Link style={{color:'black'}} to={`/product_details/${item.product_id}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.quantity_selected} x ₹ {item.price} = ₹ {item.quantity_selected * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            })}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>

                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card className="text-center">

                                <Card.Header>
                                    Order Summary
                                </Card.Header>

                                <Card.Body>

                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Item Price</Col>
                                                <Col>₹ {authcart.itemsPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Delivery</Col>
                                                <Col>₹ {authcart.deliveryPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Total Price</Col>
                                                <Col>₹ {authcart.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>


                                    </ListGroup>

                                    <button
                                        className="page_btn"
                                        onClick={placeOrderHandler}
                                        disabled={authCartItems.length === 0}
                                    >
                                        Pay with RazorPay
                                    </button>

                                </Card.Body>

                            </Card>
                        </Col>
                    </Row>

                </Row>
            </Container>

        </Fragment>
    )
}

export default PlaceOrder
