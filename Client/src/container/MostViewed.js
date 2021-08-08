import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getMostViewedProducts } from '../action/productAction'
import Loader from '../Extras/Loader'


const MostViewed = () => {

    const dispatch = useDispatch()
    const { mostViewedLoading, mostViewedProducts } = useSelector(state => state.MostViewedProduct)
    const [width, setWidth] = useState('18em')


    const updateCardWidth = () => {
        if (window.innerWidth <= 428) {
            setWidth('10em')
        } else {
            setWidth('18em')
        }
    }

    useEffect(() => {
        dispatch(getMostViewedProducts())
        window.addEventListener('resize', updateCardWidth)
        return () => {
            window.removeEventListener('resize', updateCardWidth)
        }
    }, [dispatch])


    return (
        <Fragment>
            <Col className="justify-content-md-center text-center" data-aos="fade-up" style={{ padding: '20px', textTransform: 'uppercase' }} data-aos-delay="400" >
                <center><p className='heading'>Most Viewed Products</p></center>
                {mostViewedLoading ? <Loader /> :

                    <Row>
                        {
                            mostViewedProducts && mostViewedProducts.map((items, idx) => {
                                return (
                                    <Col xs={6} sm={6} md={6} lg={3} className='overflow category_block1' key={items._id}>
                                        <Card variant='flush' className="border-0 text-center" style={{ lineHeight: '1em', width: { width }, overflow: 'hidden' }}>
                                            <Link to={`/product_details/${items._id}`}>
                                                <Card.Img variant="top" src={items.image} />
                                            </Link>
                                            <Card.Body>
                                                <Card.Text>{items.name}</Card.Text>
                                                <Card.Text>Pack of {items.product_details && items.product_details.items_in_pack}</Card.Text>
                                                <Card.Text>₹ {items.price}</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }

                    </Row >
                }
            </Col>
        </Fragment>
    )
}


export default MostViewed
