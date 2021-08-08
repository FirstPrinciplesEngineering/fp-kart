import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SubHeader from './SubHeader'

const AdminDashboard = ({ history }) => {

    const { profile } = useSelector(state => state.UserLogin)

    useEffect(() => {
        if (!profile) {
            history.push('/login')
        }
        if (profile && profile.role !== "admin") {
            history.push('/')
        }
    })

    return (
        <Fragment>
            <SubHeader />
            <br />
            <br />
            <br />
            <br />
            <Col className='justify-content-md-center' style={{ padding: '34px' }}>
                <p onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>
                    <i className="fas fa-chevron-left"></i>  Back
                </p>
                <center><p className='heading'>Admin Dashboard</p></center>
                <Row>
                    <Col xs={12} sm={12} md={8} lg={8}>
                        <ListGroup>
                            <ListGroup.Item>
                                <Link to='/admin/users' style={{ color: 'black' }}>
                                    <p className="subheading">
                                        users list <i className="fas fa-chevron-right"></i>
                                    </p>
                                </Link>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Link to='/admin/categories' style={{ color: 'black' }}>
                                    <p className="subheading">
                                        Product Categories <i className="fas fa-chevron-right"></i>
                                    </p>
                                </Link>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Link to='/admin/add_category' style={{ color: 'black' }}>
                                    <p className="subheading">
                                        Add Category <i className="fas fa-chevron-right"></i>
                                    </p>
                                </Link>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Link to='/admin/add_product' style={{ color: 'black' }}>
                                    <p className="subheading">
                                        Add Product <i className="fas fa-chevron-right"></i>
                                    </p>
                                </Link>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Link to='/admin/active_orders' style={{ color: 'black' }}>
                                    <p className="subheading">
                                        Active Orders <i className="fas fa-chevron-right"></i>
                                    </p>
                                </Link>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Link to='/admin/completed_orders' style={{ color: 'black' }}>
                                    <p className="subheading">
                                        Completed Orders <i className="fas fa-chevron-right"></i>
                                    </p>
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={6}>
                        <Image src="" />
                    </Col>
                </Row>
            </Col>
        </Fragment>
    )
}

export default AdminDashboard
