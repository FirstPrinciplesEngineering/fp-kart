import React, { useEffect, Fragment, useState } from 'react'
import { Col, Row, Form } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
import { Link } from "react-router-dom"
import "../assets/css/verifyemail.css"
import { useSelector } from 'react-redux'
import Loader from './Loader'


const VerifyEmail = ({ history, location }) => {

    const [verifyToken, setVerifyToken] = useState('')
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const { profile } = useSelector(state => state.UserLogin)

    useEffect(async () => {
        if (profile) {
            history.push('/')
        }
        else {
            if (location.search === "") {
                history.push('/')
            }
            else {
                console.log(location.search)
                const splitUrl = location.search.split("=")
                setVerifyToken(splitUrl[1])
            }
        }
    }, [history, location, profile])

    const styleLogin = {
        padding: '4px',
        margin: '34px',
        height: '100vh'
    }

    const handleChange = (e) => {
        console.log("object")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            password,
            confirmPassword,
            verifyToken
        }
    }

    return (
        <Fragment>
            <Row className=" justify-content-md-center" style={styleLogin}>
                <Col sm={12} md={8} lg={6}>
                    <center><p className='heading'>RESET PASSWORD</p></center>

                    {/* {loading && <Loader />}
              {error && <Message variant='danger'>{error}</Message>} */}


                    <Form onSubmit={handleSubmit} style={{ marginTop: '25%' }}>

                        <Form.Group>New Password*
                            <TextField className="form-control" type="password" name="password" onChange={handleChange} required /><br />
                        </Form.Group>


                        <Form.Group>Confirm Password*
                            <TextField className="form-control" type="password" name="confirmPassword" onChange={handleChange} required /><br />
                        </Form.Group>

                        <button className="page_btn" type="submit">submit</button>

                    </Form>

                </Col>
            </Row>
        </Fragment>
    )
}

export default VerifyEmail
