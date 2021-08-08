import React, { useState, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Spinner } from 'react-bootstrap'
import { getProductDetails, updateProduct } from '../action/productAction'
import { getCategory } from '../action/categoryAction'
import SubHeader from './SubHeader'
import Loader from '../Extras/Loader'
import Message from '../Extras/Message'



const AdminProductDetails = ({ match, history }) => {

    const dispatch = useDispatch()
    const productId = match.params.productId
    const { categoryLoading, categoryError, category } = useSelector(state => state.Category)
    const { loading, error, productDetails } = useSelector(state => state.ProductDetails)
    const { profile } = useSelector(state => state.UserLogin)
    const { productUpdateLoading, productUpdateError, product_updated } = useSelector(state => state.UpdateProduct)

    const [product, setProduct] = useState({})

    useEffect(() => {
        if (!profile) {
            history.push('/login')
        }
        if (profile && profile.role !== "admin") {
            history.push('/')
        }
        else {
            dispatch(getCategory())
            dispatch(getProductDetails(productId))
        }
    }, [history, dispatch, profile])

    const handleChange = (e) => {
        setProduct((product => ({ ...product, [e.target.name]: e.target.value })))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(updateProduct(productId, product))
        await dispatch(getProductDetails(productId))
    }

    return (
        <Fragment>
            <SubHeader />
            <br />
            <br />
            <br />
            <br />
            <Row className="justify-content-md-center" style={{ padding: '34px' }}>
                <Col sm={12} md={8} lg={6}>
                    <p onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                        <i className="fas fa-chevron-left"></i>  Back
                    </p>
                    <center><p className='heading'>Edit product</p></center>
                    {loading || productUpdateLoading && <Loader />}
                    {error && <Message variant='danger'>{error}</Message>}
                    {productUpdateError && <Message variant='danger'>{productUpdateError}</Message>}
                    {product_updated && <Message variant='success'>{product_updated}</Message>}
                    {
                        productDetails &&
                        <div>
                            <Form onSubmit={handleSubmit} style={{ marginTop: '5%' }}>
                                <Form.Group>Product name*
                                    <input defaultValue={productDetails.name} className="form-control" type="text" name="name" onChange={handleChange} required />
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <Form.Group>Brand*
                                            <input defaultValue={productDetails.brand} className="form-control" type="text" name="brand" onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>Price*
                                            <input defaultValue={productDetails.price} className="form-control" type="number" name="price" onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>Quantity*
                                            <input defaultValue={productDetails.quantity_available} className="form-control" type="number" name="quantity_available" onChange={handleChange} required /><br />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group>Material*
                                            <input defaultValue={productDetails.product_details && productDetails.product_details.material} className="form-control" type="text" name="material" onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>Color*
                                            <input defaultValue={productDetails.product_details && productDetails.product_details.color} className="form-control" type="text" name="color" onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>Items in Pack*
                                            <input defaultValue={productDetails.product_details && productDetails.product_details.items_in_pack} className="form-control" type="number" name="items_in_pack" onChange={handleChange} required /><br />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group>Description*
                                    <textarea defaultValue={productDetails.description} rows="5" className='form-control input-fill' name="description" onChange={handleChange} required></textarea>
                                </Form.Group>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group>Select Category*
                                            {
                                                categoryLoading ? <div><Spinner animation="border" /></div> :
                                                    <select name="category_id" required onChange={handleChange} className="form-control">
                                                        <option value=''>Select</option>
                                                        {
                                                            category && category.map(item => {
                                                                return (
                                                                    <option value={item._id} key={item._id}>{item.category_name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                            }
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <button className="page_btn" type="submit">update</button>
                            </Form>
                        </div>
                    }

                </Col>
            </Row>
        </Fragment>
    )
}

export default AdminProductDetails
