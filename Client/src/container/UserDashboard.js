import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { HashLink } from "react-router-hash-link"
import { Container, Row, Col, ListGroup } from 'react-bootstrap'
import { getUserDetails, logout } from '../action/userAction'
import { getMyOrders } from '../action/orderAction'
import SubHeader from './SubHeader'
import MyDetails from '../component/MyDetails'
import MyOrders from '../component/MyOrders'
import Message from '../Extras/Message'
import Loader from '../Extras/Loader'


const UserDashboard = ({ history }) => {

    const dispatch = useDispatch()

    const [userData, setUserData] = useState('')
    const [orders, setOrders] = useState('')
    const [updatePasswordDisplay, setUpdatePasswordDisplay] = useState(false)

    const { profile } = useSelector(state => state.UserLogin)

    const { loading, user, error } = useSelector(state => state.UserDetails)

    const { loadingOrders, myOrders, orderError } = useSelector(state => state.MyOrders)

    useEffect(async () => {
        if (!profile) {
            history.push('/login')
        }

        else {
            await dispatch(getMyOrders())
            setOrders(myOrders)
            if (user && !user.firstname) {
                dispatch(getUserDetails())
            }
            else {
                setUserData(user)
            }
        }
    }, [dispatch, history, profile, user])

    const logoutHandler = async () => {
        await dispatch(logout())
    }

    return (
        <Fragment>
            <SubHeader />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container>
                <Col style={{ float: 'right' }}>
                    {profile && <p className='subheading'>Hi {profile.firstname}</p>}
                    <p onClick={logoutHandler} style={{ cursor: 'pointer' }}>LOGOUT</p>
                </Col>

                <Row>
                    {/* navigation sidebar */}
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item><HashLink to='#mydetails' style={{ color: 'black' }}>My Details</HashLink></ListGroup.Item>

                            <ListGroup.Item>
                                <HashLink to='#myorders' style={{ color: 'black' }}>My Orders</HashLink>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    
                                    setUpdatePasswordDisplay(!updatePasswordDisplay)
                                }}>
                                Change Password</ListGroup.Item>

                            {
                                profile && profile.role === 'admin' &&
                                <ListGroup.Item>
                                    <Link to='/admin' style={{ color: 'black' }}>Admin Dashboard</Link>
                                </ListGroup.Item>
                            }

                        </ListGroup>
                    </Col>


                    {/* Main content */}
                    <Col md={9}>
                        <MyDetails id='mydetails' userData={userData} passwordDisplay={updatePasswordDisplay} />
                        <br />
                        <br />
                        {
                            loadingOrders ? <Loader />
                                :
                                orderError ?
                                    <div style={{ marginTop: '50px' }}>
                                        <h4 id='myorders' className='subheading'>My Orders</h4>
                                        <Message variant='danger'>{orderError}</Message>
                                        <Link to='/all_products'><button className='page_btn'>Shop Now</button></Link>
                                        <br />
                                        <br />
                                    </div>
                                    :
                                    <div style={{ marginTop: '50px' }}>
                                        <MyOrders orders={orders} />
                                    </div>
                        }
                    </Col>
                </Row>
            </Container>
        </Fragment>
    )
}

export default UserDashboard
