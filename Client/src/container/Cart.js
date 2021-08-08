import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubHeader from './SubHeader'
import EmptyCart from '../Extras/EmptyCart'
import DisCart from '../component/DisCart'
import Checkout from '../component/Checkout'
import { getCartProducts } from '../action/AuthCartAction'
import Message from '../Extras/Message'
import Loader from '../Extras/Loader'

const Cart = () => {

    const dispatch = useDispatch()
    const {cartItems} = useSelector(state => state.Cart)
    const {authCartItems} = useSelector(state => state.AuthCart)
    const {profile} = useSelector(state=>state.UserLogin)
    const { getCartLoading, getCartError, removeCartLoading, removeCartError, updateQuantityLoading, updateQuantityError } = useSelector(state=>state.AuthCart)

    useEffect(() => {
       if(profile){
        dispatch(getCartProducts())
       }
    }, [profile])
    
    return (
        <Fragment>

            <SubHeader /> 
            <br />
            <br />
            <br />
            <br />
            <br />

            <div>
                <center><span className='heading'>Cart ({authCartItems.length !== 0 ? authCartItems.length : cartItems.length}) product</span></center>
                {getCartLoading && <Loader/>}
                {removeCartLoading && <Loader/>}
                {updateQuantityLoading && <Loader/>}
                {getCartError && <Message variant='danger'>{getCartError}</Message>}
                {removeCartError && <Message variant='danger'>{removeCartError}</Message>}
                {updateQuantityError && <Message variant='danger'>{updateQuantityError}</Message>}
            </div>

            <div className='container' style={{padding:'34px'}}>
                {
                    cartItems.length === 0 && authCartItems.length === 0? <EmptyCart />:
                        <div className='row'>
                            <div className='col-md-9' style={{overflowY:'auto', height:'80vh'}}>
                                <DisCart cartItems={authCartItems.length !== 0 ? authCartItems :cartItems} />
                            </div>

                            <div className='col-md-3'>
                                <Checkout cartItems={authCartItems.length !== 0 ? authCartItems :cartItems}/>
                            </div>
                        </div>
                }
            </div>
        </Fragment>
    )
}

export default Cart