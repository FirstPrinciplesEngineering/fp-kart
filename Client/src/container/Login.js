import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { login } from '../action/userAction';
import SubHeader from "./SubHeader"
import Message from '../Extras/Message'
import Loader from '../Extras/Loader'
import { Form, Col, Row } from 'react-bootstrap'
import { TextField } from '@material-ui/core'
import { addToCartLogin, getCartProducts } from '../action/AuthCartAction';
import { emptyCart } from '../action/CartAction';

const styleLogin = {
  padding: '4px',
  margin: '34px',
}

const styleRecover = {
  padding: '4px',
  margin: '34px',
}

const form_item = {
  position: 'relative'
}
const form_btn = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  fontSize: '12px',
  // color: red,
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  fontSize: '1em'
}


const Login = (props) => {

  const [user, setUser] = useState({ email: '', password: '' })
  const [recoverEmail, setRecoverEmail] = useState('')
  const [underWork, setUnderWork] = useState(false)
  const [display, setDisplay] = useState(true)
  const dispatch = useDispatch()

  const { loading, profile, error } = useSelector(state => state.UserLogin)
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
    return ()=>{
      setUnderWork(false)
    }
  }, [props.history, profile, redirect])


  const handleChange = (e) => {
    setUser(user => ({ ...user, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(user.email, user.password))
  }

  const handleRecoverEmail = (e) => {
    setRecoverEmail(e.target.value)
  }

  const handleSubmitRecoverPassword = (e) => {
    e.preventDefault()
    setUnderWork(true)
  }

  return (
    <Fragment>
      <SubHeader />
      <br />
      <br />
      <br />

      {
        display ?
          <Row className=" justify-content-md-center" style={styleLogin}>
            <Col sm={12} md={8} lg={6}>
              <center><p className='heading'>Sign in</p></center>

              {loading && <Loader />}
              {error && <Message variant='danger'>{error}</Message>}


              <Form onSubmit={handleSubmit} style={{ marginTop: '25%' }}>

                <Form.Group>Email*
                  <TextField className="form-control" type="email" name="email" onChange={handleChange} required /><br />
                </Form.Group>


                <Form.Group style={form_item}>Password*
                  <TextField className="form-control" type="password" name="password" onChange={handleChange} required /><br />
                  <p onClick={()=>{setDisplay(!true)}} style={form_btn}>forgot password?</p>
                </Form.Group>

                <button className="page_btn" type="submit">Sign In</button>
                <Link style={{color:'black'}} to={redirect === 'checkout_address' ? '/signup?redirect=checkout_address' : `/signup`}>
                  <Form.Group>Create account</Form.Group>
                </Link>
              </Form>

            </Col>
          </Row>






          :




          <Row className="justify-content-md-center" style={styleRecover}>
            <Col sm={12} md={8} lg={6}>
              <center><p className='heading'>Recover Password</p></center>
              {
                underWork &&
                <Message variant='danger'>{'This feature is disabled for now. '}</Message>
              }
              <Form onSubmit={handleSubmitRecoverPassword} style={{ marginTop: '25%' }}>

                <Form.Group>Please enter your email
                  <TextField className="form-control" type="email" name="email" onChange={handleRecoverEmail} required /><br />
                </Form.Group>

                <button className="page_btn" type="submit">Recover</button>
                <Form.Group>Remember your password? <span style={{cursor:'pointer'}} onClick={()=>{setDisplay(true)}}>login</span></Form.Group>
              </Form>

            </Col>
          </Row>
      }
    </Fragment>
  );
};

export default Login;