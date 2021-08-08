
import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Row, Col, Image, Spinner } from 'react-bootstrap'
import Message from '../Extras/Message'
import Loader from '../Extras/Loader'
import SubHeader from './SubHeader'
import { getProductsAccorToCat } from '../action/productAction'
import { deleteProduct } from '../action/productAction'

const AdminListProduct = ({ history, match, location }) => {

    const dispatch = useDispatch()
    const { loading, error, productATC } = useSelector(state => state.ProductAccorToCat)
    const { productDeleteLoading, productDeleteError, product_deleted } = useSelector(state => state.DeleteProduct)
    const { profile } = useSelector(state => state.UserLogin)
    const [categoryName, setCategoryName] = useState('')

    useEffect(() => {
        const category_id = match.params.categoryId
        console.log(location)
        setCategoryName(location.search.split('?')[1])

        if (!profile) {
            history.push('/login')
        }
        if (profile && profile.role !== "admin") {
            history.push('/')
        }
        else {
            dispatch(getProductsAccorToCat(category_id))
        }

    }, [dispatch, profile, history, match])

    const productDeleteHandler = async (productId) => {
        const category_id = match.params.categoryId
        await dispatch(deleteProduct(productId))
        await dispatch(getProductsAccorToCat(category_id))
    }
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

                    <center>
                        <p className='heading'>{categoryName} Product List</p>
                        <Link to='/admin/add_product'>
                            <button className="page_btn">Add Products</button>
                        </Link>
                    </center>
                    <br />

                    {loading ? <Loader /> :
                        error ? <Message variant='danger'>{error}</Message> :
                            productDeleteError ? <Message variant='danger'>{productDeleteError}</Message> :
                                product_deleted ? <Message variant='success'>{product_deleted}</Message> : null}
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Image</th>
                                <th>Product Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity Available</th>
                                <th>Created on</th>
                                <th>Product Details</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productATC && productATC.map(items => {
                                return <tr key={items._id}>
                                    <td>{items._id}</td>
                                    <td><Image src={items.image} width={200} rounded alt={items.name} /></td>
                                    <td>{items.name}</td>
                                    <td>{items.description}</td>
                                    <td>{items.price}</td>
                                    <td>{items.quantity_available}</td>
                                    <td>{items.createdAt.substring(0, 10)}</td>
                                    <td>
                                        <Link style={{ color: 'black' }} to={`/admin/productdetails/${items._id}`}>View Details</Link>
                                    </td>
                                    <td>
                                        {productDeleteLoading ? <Spinner animation="border" />
                                            :
                                            <i onClick={() => productDeleteHandler(items._id)} className="fas fa-trash" style={{ cursor: 'pointer', color: 'orange' }}></i>
                                        }
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>



                </Col>
            </Row>
        </Fragment>
    )
}

export default AdminListProduct

