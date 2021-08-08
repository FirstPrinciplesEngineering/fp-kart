import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Spinner, Card, Col, Row, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, resetReviewMessage, reviewProduct } from '../action/productAction'
import SubHeader from './SubHeader'
import DisProductDetails from '../component/DisProductDetails'
import Loader from '../Extras/Loader'
import Message from '../Extras/Message'
import Ratings from '../component/Ratings'

const ProductDetails = (props) => {

    const dispatch = useDispatch()

    const productId = props.match.params.id

    const [message, setMessage] = useState("")
    const { profile } = useSelector(state => state.UserLogin)
    const { loading, error, productDetails } = useSelector(state => state.ProductDetails)
    const { reviewLoading, reviewError, reviewSuccess } = useSelector(state => state.ProductCreateReview)

    const [formDisplay, setFormDisplay] = useState(false)

    const [feedback, setFeedback] = useState({})

    useEffect(() => {
        if (reviewSuccess) {
            setFormDisplay(false)
        }
        dispatch(getProductDetails(productId))
        return () => {
            dispatch(resetReviewMessage())
        }

    }, [dispatch, props.match, reviewSuccess])


    const onChangeHandler = (e) => {
        setFeedback(feedback => ({ ...feedback, [e.target.name]: e.target.value }))
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(reviewProduct(feedback, productId))
    }
    
    return (
        <Fragment>

            <SubHeader />
            <br />
            <br />
            <br />
            <br />
            <br />

            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}

            <Col className="justify-content-md-center" style={{ padding: '34px' }}>

                <p onClick={() => props.history.goBack()} style={{ cursor: 'pointer' }}>
                    <i className="fas fa-chevron-left"></i>  Back
                </p>

                <Col>

                    {/* display details */}
                    <DisProductDetails productDetails={productDetails} />
                    <hr />

                    {/* review section */}

                    <Row>
                        <Col md={4}>
                            <p className='subheading'>Feedback</p>
                            {reviewSuccess && <Message variant="success">{reviewSuccess}</Message>}
                            {reviewError && <Message variant="danger">{reviewError}</Message>}
                            {message && <Message variant="danger">{message}</Message>}
                        </Col>

                        {profile && <Col md={8}>
                            <button style={{ width: '40%', float: 'right' }}
                                className='page_btn'
                                onClick={() => {
                                    if (profile) {
                                        setFormDisplay(!formDisplay)
                                    }
                                    else {
                                        setMessage("Please login")
                                    }
                                }}
                            >
                                Write review
                            </button>

                            {formDisplay && <Form onSubmit={submitHandler}>
                                <Form.Group>
                                    Rating
                                    <br />
                                    <select name="rating" onChange={onChangeHandler} required>
                                        <option value="" >Select</option>
                                        <option value={1}>1 - Poor</option>
                                        <option value={2}>2 - Fair</option>
                                        <option value={3}>3 - Good</option>
                                        <option value={4}>4 - Very Good</option>
                                        <option value={5}>5 - Excellent</option>
                                    </select>
                                </Form.Group>
                                <Form.Group>
                                    Comment
                                    <textarea rows="3" className='form-control input-fill' name="comment" onChange={onChangeHandler} required></textarea>
                                </Form.Group>
                                {
                                    reviewLoading ? <button className='page_btn'>
                                        <Spinner animation="border" />
                                    </button> :
                                        <button className='page_btn'>Submit</button>
                                }
                            </Form>}
                        </Col>}

                    </Row>
                    <br />
                    {
                        productDetails && productDetails.reviews &&
                        <Row>
                            {productDetails.reviews.map(item => {
                                return (
                                    <Col md={4} key={item._id}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Text>
                                                    {item.name}
                                                    <Ratings rating={item.rating} />
                                                    {item.createdAt.substring(0, 10)}
                                                </Card.Text>
                                                <Card.Text>{item.comment}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    }


                </Col>
            </Col>

        </Fragment>
    )
}

export default ProductDetails
