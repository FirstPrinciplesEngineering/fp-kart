import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Table, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import SubHeader from './SubHeader'
import Message from '../Extras/Message'
import Loader from '../Extras/Loader'
import { getUserList } from '../action/userAction'

const AdminListUsers = ({ history }) => {

    const dispatch = useDispatch()
    const { loading, error, userList } = useSelector(state => state.UserList)

    useEffect(() => {
        dispatch(getUserList())
    }, [dispatch])


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
                    <center><p className='heading'> Users List</p></center>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                        (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Account Created on</th>
                                        <th>Active</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userList && userList.map(items => {
                                        return <tr key={items._id}>
                                            <td>{items._id}</td>
                                            <td>{items.firstname} {items.lastname}</td>
                                            <td><a href={`mailto:${items.email}`}>{items.email}</a></td>
                                            <td>{items.createdAt.substring(0, 10)}</td>
                                            {
                                                items.isActive ? <td><i style={{ color: 'green' }} className="fas fa-check-circle"></i></td> : <td><i style={{ color: 'red' }} className="fas fa-times"></i></td>
                                            }
                                            <td>
                                                <Link to={`/user/${items._id}`}><i className="fas fa-edit"></i></Link>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        )}
                </Col>
            </Row>
        </Fragment>
    )
}

export default AdminListUsers
