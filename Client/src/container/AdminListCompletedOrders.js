import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Row, Col, Image, Spinner } from 'react-bootstrap'
import Message from '../Extras/Message'
import Loader from '../Extras/Loader'
import SubHeader from './SubHeader'
import { completed_Orders } from '../action/orderAction'


const AdminListCompletedOrders = ({ history }) => {

    const dispatch = useDispatch()
    const { loadingCompletedOrders, completedOrders, completedOrderError } = useSelector(state => state.CompletedOrders)
    const { profile } = useSelector(state => state.UserLogin)

    useEffect(() => {
        if (!profile) {
            history.push('/login')
        }
        if (profile && profile.role !== "admin") {
            history.push('/')
        }
        else {
            dispatch(completed_Orders())
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

                    <center>
                        <p className='heading'>Completed Orders</p>

                    </center>
                    <br />

                    {
                        loadingCompletedOrders ? <Loader />
                            :
                            completedOrderError ? <Message variant='danger'>{completedOrderError}</Message> :
                                completedOrders ?
                                    <Table striped bordered hover responsive className='table-sm'>
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Order Dt.</th>
                                                <th>Order By</th>
                                                <th>Email</th>
                                                <th>Amout</th>
                                                <th>Paid</th>
                                                <th>Delivered</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                completedOrders && completedOrders.map(items => {
                                                    return (
                                                        <tr key={items._id}>
                                                            <td>{items.paymentResult.razorpay_order_id}</td>
                                                            <td>{items.createdAt.substring(0, 10)}</td>
                                                            <td>{`${items.orderedBy.firstname} ${items.orderedBy.lastname}`}</td>
                                                            <td><a href={`mailto:${items.orderedBy.email}`}>{items.orderedBy.email}</a>{ }</td>
                                                            <td>{items.totalPrice}</td>
                                                            <td>
                                                                {
                                                                    items.isPaid ? <i style={{ color: 'green' }} className="fas fa-thumbs-up"></i>
                                                                        :
                                                                        <i className='fas fa-times'></i>
                                                                }
                                                            </td>

                                                            <td>
                                                                {
                                                                    items.isDelivered ? <i style={{ color: 'green' }} className="fas fa-thumbs-up"></i>
                                                                        :
                                                                        <i style={{ color: 'red' }} className="fas fa-thumbs-down"></i>
                                                                }
                                                            </td>

                                                            <td><Link to={`/order_details/${items._id}`}><button className='form-control'>Details</button></Link></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                    :
                                    null
                    }

                </Col>
            </Row>
        </Fragment>
    )
}

export default AdminListCompletedOrders

