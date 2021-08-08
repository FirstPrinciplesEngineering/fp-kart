import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from '@material-ui/core'
import { addCategory } from '../action/categoryAction'
import SubHeader from './SubHeader'
import Loader from '../Extras/Loader'
import Message from '../Extras/Message'


const AdminAddCategory = ({history}) => {

    const dispatch = useDispatch()
    const [category_name, setCategory_name] = useState('')
    const [image, setImage] = useState()
    const { loading, error, category_added } = useSelector(state => state.AddCategory)

    const Style = {
        padding: '34px'
    }

    const handleChange = (e) => {
        setCategory_name(e.target.value)
    }

    const handleFileChange = (e) => {
        const imageFile = e.target.files[0]
        setImage(imageFile)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(addCategory(category_name, image))
    }

    return (
        <Fragment>
            <SubHeader />
            <br />
            <br />
            <br />
            <br />
            <Row className="justify-content-md-center" style={Style}>
                <Col sm={12} md={8} lg={6}>
                <p onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                    <i className="fas fa-chevron-left"></i>  Back
                </p>
                    <center><p className='heading'>Publish Category</p></center>
                    {category_added && <Message variant='success'>{category_added}</Message>}
                    {loading && <Loader />}
                    {error && <Message variant='danger'>{error}</Message>}

                    <div>
                        <Form onSubmit={handleSubmit} style={{ marginTop: '15%' }}>
                            <Form.Group>Category name*
                                <TextField className="form-control" type="text" name="category_name" onChange={handleChange} required />
                            </Form.Group>


                            <Form.Group>Category image*
                                <TextField className="form-control" type="file" name="category_image" onChange={handleFileChange} required />
                            </Form.Group>


                            <button className="page_btn" type="submit">PUBLISH</button>
                        </Form>
                    </div>

                </Col>
            </Row>
        </Fragment>
    )
}

export default AdminAddCategory
