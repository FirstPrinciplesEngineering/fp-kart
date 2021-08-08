import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import SubHeader from "./SubHeader"
import Message from '../Extras/Message'
import Loader from '../Extras/Loader'
import { register } from '../action/userAction';
import { Form, Row, Col } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
import { addToCartLogin, getCartProducts } from '../action/AuthCartAction';
import { emptyCart } from '../action/CartAction';

const Style = {
  padding: '34px'
}

const SignUp = (props) => {

  const dispatch = useDispatch()
  const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', password: '', confirmPassword: '' })

  const { loading, error } = useSelector(state => state.UserRegister)
  const { profile } = useSelector(state => state.UserLogin)
  const { cartItems } = useSelector(state => state.Cart)
  
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/'
  
  useEffect(async () => {
    if (profile) {
      if (cartItems.length !== 0) {
        await dispatch(addToCartLogin())
        await dispatch(emptyCart())
      }
      await dispatch(getCartProducts())
      props.history.push(redirect)
    }
  }, [props.history, profile, redirect])

  const handleChange = (e) => {
    setNewUser((newUser => ({ ...newUser, [e.target.name]: e.target.value })))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register(newUser))
  }

  return (
    <Fragment>
      <SubHeader />
      <br />
      <br />
      <br />

      <Row className="justify-content-md-center" style={Style}>
        <Col sm={12} md={8} lg={6}>
          <center><p className='heading'>create account</p></center>
          {loading && <Loader />}
          {error && <Message variant='danger'>{error}</Message>}

          <div className="login">

            <Form onSubmit={handleSubmit}  style={{marginTop:'15%'}}>
              <Row>
                <Col>
                  <Form.Group>First name*
                    <TextField className="form-control" type="text" name="firstname" onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>Last name*
                    <TextField className="form-control" type="text" name="lastname" onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>


              <Form.Group>Email*
                <TextField className="form-control" type="email" name="email" onChange={handleChange} required />
              </Form.Group>

              <Form.Group>Password*
                <TextField className="form-control" type="password" name="password" onChange={handleChange} required />
              </Form.Group>

              <Form.Group>Confirm Password*
                <TextField className="form-control" type="password" name="confirmPassword" onChange={handleChange} required /><br />
              </Form.Group>

              <button className="page_btn" type="submit">Sign Up</button>

            </Form>

            Have an account? <Link style={{color:'black'}} to="/login"><Form.Group>Log In</Form.Group></Link>
          </div>

        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUp;