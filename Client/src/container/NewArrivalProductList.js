import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getNewArrivalProducts } from '../action/productAction'
import SubHeader from "../container/SubHeader"
import { getCategory } from '../action/categoryAction'
import Ratings from '../component/Ratings'
import Loader from '../Extras/Loader'
import Message from '../Extras/Message'



const AllProduct = () => {

    const dispatch = useDispatch()
    const { newArrivalLoading, newArrivalProducts, newArrivalError } = useSelector(state => state.NewArrivalProduct)
    const { category } = useSelector(state => state.Category)

    const [width, setWidth] = useState('18em')


    const updateCardWidth = () => {
        if (window.innerWidth <= 428) {
            setWidth('10em')
        } else {
            setWidth('18em')
        }
    }

    useEffect(() => {
        dispatch(getNewArrivalProducts())
        dispatch(getCategory())

        window.addEventListener('resize', updateCardWidth)
        return () => {
            window.removeEventListener('resize', updateCardWidth)
        }

    }, [dispatch])

    return (
        <Fragment>
            <SubHeader />
            <br />
            <br />
            <br />
            <Col className="justify-content-md-center" data-aos="fade-up" style={{ padding: '20px', textTransform: 'uppercase' }} data-aos-delay="400" >
                <center><p className='heading'>New Collection</p></center>

                {newArrivalLoading ? <Loader /> :
                    newArrivalError ? <Message variant='danger'>{newArrivalError}</Message> :
                        <Row>
                            <Col md={3}>
                                <center><p>Shop</p></center>

                                <ul style={{ listStyle: 'none', float: 'left' }}>
                                    <Link style={{ color: 'black' }} to='/all_products'>
                                        <li>All</li>
                                    </Link>
                                    {
                                        category && category.map(category => {
                                            return (
                                                <Link key={category._id} style={{ color: 'black' }} to={`/products/${category._id}`}>
                                                    <li>{category.category_name}</li>
                                                </Link>
                                            )
                                        })
                                    }
                                </ul>
                            </Col>

                            <Col md={9}>
                                <Row>
                                    {
                                        newArrivalProducts && newArrivalProducts.map((items) => {

                                            return (
                                                <Col xs={6} sm={6} md={6} lg={4} className='overflow category_block1' key={items._id}>
                                                    <Card variant='flush' className="border-0 text-center" style={{ lineHeight: '1em', width: { width }, overflow: 'hidden' }}>
                                                        <Link to={`/product_details/${items._id}`}>
                                                            <Card.Img variant="top" src={items.image} />
                                                        </Link>
                                                        <p style={{ position: 'absolute', top: '0', right: '0', background: 'pink', padding: '5px' }}>New Arrival</p>
                                                        <Card.Body>
                                                            <Card.Text>{items.name}</Card.Text>
                                                            <Card.Text>Pack of {items.product_details && items.product_details.items_in_pack}</Card.Text>
                                                            <Card.Text>₹ {items.price}</Card.Text>
                                                            {
                                                                items.rating > 0 &&
                                                                <Ratings rating={items.rating} numReview={items.reviews.length} />
                                                            }
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )

                                        })
                                    }
                                </Row>
                            </Col>

                        </Row >
                }
            </Col>
        </Fragment>
    )
}

export default AllProduct
