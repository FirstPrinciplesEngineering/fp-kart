import React, { useState } from 'react'
import { Fragment } from 'react'
import SubHeader from './SubHeader'
import { Form, Col, Row } from 'react-bootstrap'
import { TextField } from '@material-ui/core'

const Style = {
    padding: '34px'
}

const Contact = () => {
    const [data, setData] = useState({})

    const handleChange = (e) => {
        setData(data => ({ ...data, [e.target.name]: e.target.value }))
    }
    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <Fragment>

            <SubHeader />
            <br />
            <br />
            <Row className='justify-content-md-center' style={Style}>
                <Col sm={12} md={8} lg={6}>
                    <center>
                        <p className='heading'>Contact Us</p>
                        <p>
                            If you have any questions about orders, sizes, new collections, be sure you check out our FAQ page. If your question wasn't answered there, don't hesitate to drop us a line. 
                        </p>
                    </center>

                    <Form onSubmit={submitHandler} style={{ marginTop: '10%' }}>

                        <Row>
                            <Col>
                                <Form.Group>
                                    Name
                                    <TextField className='form-control' name='name' type='text' onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    Email
                                    <TextField className='form-control' name='email' type='email' onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group>
                                    Your Message<br />
                                    <textarea rows="5" className='form-control input-fill' name="message" onChange={handleChange} required></textarea>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />

                        <Row>
                            <Col>
                                <Form.Group>
                                    City
                                    <TextField className='form-control' name='city' type='text' onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    State
                                    <TextField className='form-control' name='state' type='text' onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <button className='page_btn' >Send</button>
                    </Form>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Contact
