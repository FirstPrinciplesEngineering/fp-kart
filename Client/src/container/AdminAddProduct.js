import React, { useState, Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Spinner } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
import { addProducts } from '../action/productAction'
import { getCategory } from '../action/categoryAction'
import SubHeader from './SubHeader'
import Loader from '../Extras/Loader'
import Message from '../Extras/Message'



const AdminAddProduct = ({ history }) => {

    const dispatch = useDispatch()
    const { loading, error, product_added } = useSelector(state => state.AddProduct)
    const { categoryLoading, categoryError, category } = useSelector(state => state.Category)
    const { profile } = useSelector(state => state.UserLogin)

    const [product, setProduct] = useState({})
    const [image, setImage] = useState([])

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
    }, [history, dispatch, profile])

    const handleChange = (e) => {
        setProduct((product => ({ ...product, [e.target.name]: e.target.value })))
    }

    const handleFileChange = (e) => {
        setImage(existImage => [...existImage, e.target.files[0]])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(addProducts(product, image))

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
                    <center><p className='heading'>Publish Product</p></center>
                    {loading && <Loader />}
                    {error && <Message variant='danger'>{error}</Message>}
                    {product_added && <Message variant='success'>{product_added}</Message>}

                    <div>
                        <Form onSubmit={handleSubmit} style={{ marginTop: '5%' }}>
                            <Form.Group>Product name*
                                <TextField className="form-control" type="text" name="name" onChange={handleChange} required />
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group>Brand*
                                        <TextField className="form-control" type="text" name="brand" onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>Price*
                                        <TextField className="form-control" type="number" name="price" onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>Quantity*
                                        <TextField className="form-control" type="number" name="quantity_available" onChange={handleChange} required /><br />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>Material*
                                        <TextField className="form-control" type="text" name="material" onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>Color*
                                        <TextField className="form-control" type="text" name="color" onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>Items in Pack*
                                        <TextField className="form-control" type="number" name="items_in_pack" onChange={handleChange} required /><br />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group>Description*
                                <textarea rows="5" className='form-control input-fill' name="description" onChange={handleChange} required></textarea>
                            </Form.Group>

                            <Row>
                                <Col>
                                    <Form.Group>Product image 1*
                                        <TextField className="form-control" accept="image/*" type="file" name="image" onChange={handleFileChange} required /><br />
                                    </Form.Group>
                                    <Form.Group>Product image 2
                                        <TextField className="form-control" accept="image/*" type="file" name="image2" onChange={handleFileChange} /><br />
                                    </Form.Group>
                                    <Form.Group>Product image 3
                                        <TextField className="form-control" accept="image/*" type="file" name="image3" onChange={handleFileChange} /><br />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>Select Category*
                                        {
                                            categoryLoading ? <div><Spinner animation="border" /></div> :
                                                <select name="category_id" onChange={handleChange} className="form-control" required>
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

                            <button className="page_btn" type="submit">PUBLISH</button>
                        </Form>
                    </div>

                </Col>
            </Row>
        </Fragment>
    )
}

export default AdminAddProduct
