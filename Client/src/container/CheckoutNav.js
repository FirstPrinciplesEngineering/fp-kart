import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const CheckoutNav = ({ process1, process2, process3 }) => {
    return (
        <Col md={8}>
        <Row style={{marginBottom:'30px'}}>
            <Col sm>
                {
                process1 ? <Link to='/checkout_address'>ADDRESS |</Link>
                :
                <p style={{color:'grey'}}>ADDRESS |</p>
                }
            </Col>
            <Col sm>
                {
                process2 ? <Link to='/payment'>PAYMENT |</Link>
                :
                <p style={{color:'grey'}}>PAYMENT |</p>
                }
            </Col>
            <Col sm>
                {
                process3 ? <Link to='/checkout_address'>ORDER SUMMARY |</Link>
                :
                <p style={{color:'grey'}}>ORDER SUMMARY |</p>
                }
            </Col>

        </Row>
        </Col>

    )
}

export default CheckoutNav
