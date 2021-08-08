import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Image, Form, Button } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../action/CartAction'
import { getCartProducts, removeFromCartDB, updateQuantityDB } from '../action/AuthCartAction'

const DisCart = ({ cartItems }) => {
    const dispatch = useDispatch()
    const { profile } = useSelector(state => state.UserLogin)
    const { authCartItems } = useSelector(state => state.AuthCart)
    const { removeCartLoading, updateQuantityLoading } = useSelector(state=>state.AuthCart)

    const removeItemHandler = async (productData) => {
        if (profile) {
            await dispatch(removeFromCartDB(productData.product_id))
            await dispatch(getCartProducts())
        }
        else {
            dispatch(removeFromCart(productData._id))
        }
    }
    const updateQuantityHandler = async (productData, qty) => {
        if (profile) {
            await dispatch(updateQuantityDB(productData.product_id, qty))
            await dispatch(getCartProducts())
        }
        else {
            dispatch(addToCart(productData, qty))
        }
    }
    const displayCart = (data) => {
        if (data) {
            return data.map(item => {
                return (
                    <Fragment key={item._id}>
                        <div className='row' >
                            <div className='col-md-3'>
                                {
                                    authCartItems.length > 0 ?
                                        <Link to={`/product_details/${item.product_id}`}>
                                            <Image width={200} height={100} src={item.image} fluid rounded />
                                        </Link>
                                        :
                                        <Link to={`/all_products/details/${item._id}`}>
                                            <Image width={200} height={100} src={item.image} fluid rounded />
                                        </Link>
                                }
                            </div>

                            <div className='col-md-2'>
                                {
                                    authCartItems.length > 0 ?
                                        <Link  style={{color:'black'}} to={`/product_details/${item.product_id}`}>
                                            <p>{item.name}</p>
                                        </Link>
                                        :
                                        <Link  style={{color:'black'}} to={`/all_products/details/${item._id}`}>
                                            <p>{item.name}</p>
                                        </Link>
                                }
                            </div>

                            <div className='col-md-3'>
                                <p>color : {item.product_details && item.product_details.color}</p>
                                <p>material : {item.product_details && item.product_details.material}</p>
                            </div>

                            <div className='col-md-2'>
                                <p>₹ {item.price}</p>
                            </div>

                            <div className='col-md-1.5'>
                                <Form.Control as='select' value={item.quantity_selected}
                                    onChange={(e) => updateQuantityHandler(item, e.target.value)}
                                >
                                    {

                                        [...Array(item.quantity_available).keys()].map((num) => (
                                            <option key={num + 1} value={num + 1}>
                                                {num + 1}
                                            </option>
                                        ))
                                    }
                                </Form.Control>

                            </div>
                            <div className='col-md-1'>
                                <Button type="button" variant='light' onClick={() => removeItemHandler(item)}><i className='fas fa-trash' style={{ color: 'orange' }}></i></Button>
                            </div>
                        </div>
                        <hr />
                    </Fragment>
                )
            })
        }
    }

    return (
        <Fragment>
            {displayCart(cartItems)}
        </Fragment>
    )
}

export default DisCart
