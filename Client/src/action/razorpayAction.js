import axios from 'axios'
import { PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from '../constants/orderConstant'

const razorpayScriptLoad = () => {

    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = "https://checkout.razorpay.com/v1/checkout.js"

        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


export const razorPayPayment = () => async (dispatch, getState) => {

    try {
        dispatch({
            type: PLACE_ORDER_REQUEST
        })

        const res = await razorpayScriptLoad()

        if (!res) {
            dispatch({
                type: PLACE_ORDER_FAIL,
                payload: 'Razorpay SDK failed to load. Try again.'
            })
        }

        else {
            const { UserLogin, AuthCart, Cart } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': UserLogin.profile.token
                }
            }
    
            const { data } = await axios.post(`${process.env.REACT_APP_HOST_URL}/order/generate_order_id`, { amount: AuthCart.totalPrice }, config)

            if (data) {
                const options = {
                    key_id: "rzp_test_OySIcjLvv0NCGK",
                    amount: data.amount,
                    currency: "INR",
                    name: "CART HUNT",
                    description: "Complete your order to pay the amount.",
                    image: "https://forever21.imgix.net/img/app/product/4/466785-3276207.jpg?w=412&auto=format",
                    order_id: data.id,
                    handler: async (response) => {
                        const orderData = {
                            orderedBy: UserLogin.profile._id,
                            orderItems: AuthCart.authCartItems,
                            shippingAddress: Cart.shippingAddress,
                            paymentMethod: 'RazorPay',
                            paymentResult: {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            },
                            itemsPrice: AuthCart.itemsPrice,
                            deliveryPrice: AuthCart.deliveryPrice,
                            totalPrice: AuthCart.totalPrice
                        }

                        try {
                            const { data } = await axios.post(`${process.env.REACT_APP_HOST_URL}/order/place_order`, orderData, config)

                            dispatch({
                                type: PLACE_ORDER_SUCCESS,
                                payload: data
                            })
                        }

                        catch (error) {
                            dispatch({
                                type: PLACE_ORDER_FAIL,
                                payload: error.response && error.response.data ? error.response.data.message : error.message
                            })
                        }
                    },
                    prefill: {
                        "name": `${UserLogin.profile.firstname} ${UserLogin.profile.lastname}`,
                        "email": UserLogin.profile.email,
                        "contact": ""
                    },
                    notes: {
                        "address": Cart.shippingAddress
                    },
                    theme: {
                        "color": '#4d05e8'
                    }
                }

                const razorpayDialogBox = new window.Razorpay(options)
                razorpayDialogBox.open()
                razorpayDialogBox.on('payment.failed', (response) => {
                    dispatch({
                        type: PLACE_ORDER_FAIL,
                        payload: `${response.error.description}`
                    })
                    // .log(response.error)
                    // this below response we get
                    // code: "BAD_REQUEST_ERROR"
                    // description: "Payment failed"
                    // metadata:
                    // order_id: "order_HOxCBXIq2aXl8G"
                    // payment_id: "pay_HOxCVn3BFAZr5y"
                    // __proto__: Object
                    // reason: "payment_failed"
                    // source: "gateway"
                    // step: "payment_authorization"
                });

            }
        }
    } catch (error) {
        dispatch({
            type: PLACE_ORDER_FAIL,
            payload: error.message
        })
    }
}