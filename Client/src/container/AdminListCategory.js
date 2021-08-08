import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import Message from '../Extras/Message'
import Loader from '../Extras/Loader'
import SubHeader from './SubHeader'
import { getCategory } from '../action/categoryAction'

const AdminListCategory = ({ history }) => {

    const dispatch = useDispatch()
    const { categoryLoading, categoryError, category } = useSelector(state => state.Category)
    const { profile } = useSelector(state => state.UserLogin)

    useEffect(() => {
        if (!profile) {
            history.push('/login')
        }
        if (profile && profile.role !== "admin") {
            history.push('/')
        }
        else {
            dispatch(getCategory())
        }

    }, [dispatch, profile, history])

    return (
        <Fragment>
            <SubHeader />
            <br />
            <br />
            <br />
            <br />
            <Row className="justify-content-md-center" style={{ padding: '34px' }}>
                <Col>
                    <p onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-chevron-left"></i>  Back
                    </p>

                    <center><p className='heading'>Product Categories</p></center>

                    {categoryLoading ? <Loader /> :
                        categoryError ? <Message variant='danger'>{categoryError}</Message> : (

                            category ?
                                <Row>

                                    {category.map(items => {
                                        return (
                                            <Col md={4} key={items._id}>
                                                <Card style={{ width: '18rem' }} key={items._id}>
                                                    <Card.Img variant="top" src={items.category_image} />
                                                    <Card.Body>
                                                        <Card.Title>{items.category_name}</Card.Title>
                                                        <Card.Text>Created on {items.createdAt.substring(0, 10)}</Card.Text>
                                                        <Card.Text>
                                                            <Link style={{ color: 'black' }} to={`/admin/products/${items._id}?${items.category_name}`}>
                                                                Category Products <i className="fas fa-box-open"></i>
                                                            </Link>
                                                        </Card.Text>
                                                        <Card.Text>
                                                            <Link style={{ color: 'black' }} to={`/admin/categorydetails/${items._id}`}>
                                                                Details <i className='fas fa-edit'></i>
                                                            </Link>
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    })}

                                </Row>
                                : null
                        )}
                </Col>
            </Row>
        </Fragment>
    )
}

export default AdminListCategory
