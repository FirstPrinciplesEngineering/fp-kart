import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Image } from 'react-bootstrap'

const EmptyCart = () => {
    const style = {
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '50px'
    }
    return (
        <Col style={style} className="justify-content-md-center text-center" >
            <Image width={200} src='/photos/emptycart.gif' />
           
            <Link to='/all_products'>
                <button className='shopNow_btn'>Continue Shopping</button>
            </Link>
        </Col>
    )
}


export default EmptyCart
