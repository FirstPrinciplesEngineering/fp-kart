import React, { Fragment } from 'react'
import { Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SubHeader from '../container/SubHeader'

const OrderSuccessful = () => {
    const style = {
        width:'50%',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:'50px'
    }
    return (
        <Fragment>
            <SubHeader/>
            <br/>
            <br/>
            <br/>
            <Col style={style} className="justify-content-md-center text-center" >
                <p className='heading'>Order successfully placed</p>
                <Image width={200} src='/photos/order-successful.gif' />
                <br/>
                <Link to="/profile#myorders">
                   <button className='page_btn'>VIEW ORDERS</button>
                </Link>
            </Col>
        </Fragment>
    )
}

export default OrderSuccessful
