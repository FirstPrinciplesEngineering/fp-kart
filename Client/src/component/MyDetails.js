import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TextField } from '@material-ui/core'
import { Spinner, Col, Form, Row } from 'react-bootstrap'
import { resetUpdateUserMessage, updateUserProfile } from '../action/userAction'
import Message from '../Extras/Message'


const MyDetails = ({ userData, passwordDisplay }) => {

    const [firstname, setFirstname] = useState(null)
    const [lastname, setLastname] = useState(null)
    const [oldPassword, setOldPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)

    const dispatch = useDispatch()

    const { loading, error, success } = useSelector(state => state.UserUpdateProfile)
    useEffect(() => {
        return () => {
            dispatch(resetUpdateUserMessage())
        }
    }, [])

    const updateHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({ firstname, lastname, oldPassword, newPassword }))
    }

    return (
        <Col>
            {success &&
                <Message variant='success'>Profile updated successfully</Message>}
            {error &&
                <Message variant='danger'>{error}</Message>}

            <p className='subheading'>My Details</p>
            {
                userData &&
                <Form style={{ width: '70%' }} onSubmit={updateHandler}>

                    <Form.Group>
                        <small>Account ID</small>
                        <TextField
                            type='text'
                            value={userData._id}
                            className='form-control'
                            disabled
                        ></TextField>
                    </Form.Group>

                    <Form.Group>
                        <Row>
                            <Col>
                                <small>Firstname</small>
                                <TextField
                                    type='text'
                                    defaultValue={userData.firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    className='form-control'
                                    required
                                ></TextField>
                            </Col>
                            <Col>
                                <small>Lastname</small>
                                <TextField
                                    type='text'
                                    defaultValue={userData.lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    className='form-control'
                                    required
                                >
                                </TextField>
                            </Col>

                        </Row>
                    </Form.Group>

                    {
                        passwordDisplay &&
                        <Form.Group>
                            <Row>
                                <Col>
                                    <small>Old Password*</small>
                                    <TextField
                                        type='password'
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className='form-control'
                                        required
                                    ></TextField>
                                </Col>
                                <Col>
                                    <small>New Password*</small>
                                    <TextField
                                        type='password'
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className='form-control'
                                        required
                                    >
                                    </TextField>
                                </Col>

                            </Row>
                        </Form.Group>
                    }

                    <Form.Group>
                        <small>Email</small>
                        <TextField className='form-control' disabled type='email' value={userData.email}></TextField>
                    </Form.Group>

                    <Form.Group>
                        <small>Last login</small>
                        <TextField className='form-control' disabled value={userData.lastlogin && userData.lastlogin.substring(0, 15)}></TextField>

                    </Form.Group>

                    {
                        loading ? <button className='page_btn'>
                            <Spinner animation="border" />
                        </button>
                            :
                            <button className='page_btn' type="submit">
                                Update
                            </button>
                    }

                </Form>
            }
        </Col >
    )
}

export default MyDetails
