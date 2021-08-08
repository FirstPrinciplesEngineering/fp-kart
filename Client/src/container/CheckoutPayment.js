import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form } from 'react-bootstrap'
import SubHeader from './SubHeader'
import { savePaymentMethod } from '../action/CartAction'
import CheckoutNav from './CheckoutNav'


const CheckoutPayment = ({ history }) => {

    const dispatch = useDispatch()
    const savedPaymentMethod = useSelector(state => state.Cart.paymentMethod)
    const { profile } = useSelector(state => state.UserLogin)
    const { authCartItems } = useSelector(state => state.AuthCart)

    const [paymentMethod, setPaymentMethod] = useState()
    
    useEffect(()=>{
        if (!profile) {
            history.push('/login')
        }
        if (authCartItems.length <= 0) {
            history.push('/cart')
        }
    },[history, profile])

    const submitHandler = async (e) => {
        e.preventDefault()
        await dispatch(savePaymentMethod(paymentMethod || 'RazorPay'))
        history.push('/place_order')
    }

    const handleChange = (e) => {
        setPaymentMethod(e.target.value)
    }

    return (
        <Fragment>
            <SubHeader />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container style={{ padding: '34px' }}>
                <Row className="justify-content-md-center">
                    <CheckoutNav process1 process2 />
                    <Col md={8}>

                        <p className='subheading'>Payment Method</p>

                        <Form onSubmit={submitHandler}>
                            <Form.Group>
                                <Col>
                                    <Form.Check
                                        type='radio'
                                        label='RazorPay'
                                        id='RazorPay'
                                        name='paymentMethod'
                                        defaultValue='RazorPay'
                                        checked onChange={handleChange}>
                                    </Form.Check>
                                </Col>
                            </Form.Group>
                            <button className='page_btn' >Save and Proceed</button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default CheckoutPayment
