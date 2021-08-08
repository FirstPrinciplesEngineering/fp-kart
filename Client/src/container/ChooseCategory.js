import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../action/categoryAction'
import Loader from '../Extras/Loader'


const ChooseCategory = () => {
    const dispatch = useDispatch()
    const { categoryLoading, category } = useSelector(state => state.Category)

    const [width, setWidth] = useState('18em')

    const updateCardWidth = () => {
        if(window.innerWidth <= 428){
            setWidth('10em')
        }else{
            setWidth('18em')
        }
    }

    useEffect(() => {
        dispatch(getCategory())
        window.addEventListener('resize', updateCardWidth)
        return () => {
            window.removeEventListener('resize', updateCardWidth)
        }
    }, [dispatch])

    return (
        <Fragment>
            <Col className="justify-content-md-center text-center" data-aos="fade-up" style={{ padding: '20px', textTransform: 'uppercase' }} data-aos-delay="400" >
                <center><p className='heading'>Our Category</p></center>
                {categoryLoading ? <Loader /> :

                    <Row>
                        {
                            category && category.map(items => {
                                return (
                                    <Col xs={6} sm={6} md={6} lg={3} className='overflow category_block1' key={items._id}>
                                        <Card variant='flush' className="border-0 text-center" style={{ lineHeight: '1em', width: {width}, overflow: 'hidden' }}>
                                            <Link to={`/products/${items._id}`}>
                                                <Card.Img variant="top" src={items.category_image} />
                                            </Link>
                                            <Card.Body>
                                                <Card.Text>{items.category_name}</Card.Text>
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

export default ChooseCategory
