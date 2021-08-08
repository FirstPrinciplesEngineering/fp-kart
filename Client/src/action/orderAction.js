import { ACTIVE_ORDER_FAIL, ACTIVE_ORDER_REQUEST, ACTIVE_ORDER_SUCCESS, COMPLETED_ORDER_FAIL, COMPLETED_ORDER_REQUEST, COMPLETED_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, PLACE_ORDER_RESET, UPDATE_DELIVERY_STATUS_FAIL, UPDATE_DELIVERY_STATUS_REQUEST, UPDATE_DELIVERY_STATUS_SUCCESS } from "../constants/orderConstant"
import axios from 'axios'

export const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: MY_ORDER_REQUEST
        })

        const { UserLogin } = getState()
        const config = {
            headers: {
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/order/get_user_orders/${UserLogin.profile._id}`, config)
        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data
        })
    }

    catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}


export const getOrderDetails = (orderId) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { UserLogin } = getState()
        const config = {
            headers: {
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/order/get_order_details/${orderId}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}


export const active_Orders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ACTIVE_ORDER_REQUEST
        })

        const { UserLogin } = getState()
        const config = {
            headers: {
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/admin/active_orders`, config)
        dispatch({
            type: ACTIVE_ORDER_SUCCESS,
            payload: data
        })
    }

    catch (error) {
        dispatch({
            type: ACTIVE_ORDER_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}


export const completed_Orders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: COMPLETED_ORDER_REQUEST
        })

        const { UserLogin } = getState()
        const config = {
            headers: {
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/admin/completed_orders`, config)
        dispatch({
            type: COMPLETED_ORDER_SUCCESS,
            payload: data
        })
    }

    catch (error) {
        dispatch({
            type: COMPLETED_ORDER_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}


export const updateDeliveryStatus = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_DELIVERY_STATUS_REQUEST
        })

        const { UserLogin } = getState()

        fetch(`${process.env.REACT_APP_HOST_URL}/admin/update_delivery_status/${orderId}`, {
            method:'PUT',
            headers : {
                'x-access-token': UserLogin.profile.token
            }
        })
        .then(data=>{
            dispatch({
                type: UPDATE_DELIVERY_STATUS_SUCCESS,
                payload: data
            })
        })
    }

    catch (error) {
        dispatch({
            type: UPDATE_DELIVERY_STATUS_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const resetPlaceOrder = () => (dispatch) => {
    console.log("hdgfjhdg*****")
    dispatch({
        type:PLACE_ORDER_RESET
    })
}
