import React from 'react'
import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const Checkout = (props) => {

    const { loading, profile, error } = useSelector(state=>state.UserLogin)
    
    const checkoutHandler = () => {
        if(profile){
            props.history.push('/checkout_address')
        }
        else{
            props.history.push('/login?redirect=checkout_address')
        }
    }

    return (
        <Fragment>
            <Card className="text-center">
                <Card.Header>
                   Price Details
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Subtotal ({props.cartItems.length}) products
                    </Card.Text>
                    <Card.Text>
                        Total Price : ₹ {props.cartItems.map(item=>item.price*item.quantity_selected).reduce((total, price)=>total+price)}
                    </Card.Text>
                  
                    <button className='page_btn'  onClick={checkoutHandler}>Proceed To Checkout</button>
                    
                </Card.Body>

            </Card>
        </Fragment>
    )
}

export default withRouter(Checkout)
