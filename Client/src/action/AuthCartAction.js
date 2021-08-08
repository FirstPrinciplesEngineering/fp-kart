import { GET_CART_FAIL, ADD_TO_CART_LOGIN_FAIL, ADD_TO_CART_LOGIN_REQUEST, ADD_TO_CART_LOGIN_SUCCESS, GET_CART_REQUEST, GET_CART_SUCCESS, EMPTY_AUTH_CART, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAIL, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL, UPDATE_CART_QUANTITY_REQUEST, UPDATE_CART_QUANTITY_SUCCESS, UPDATE_CART_QUANTITY_FAIL, EMPTY_CART_DB_REQUEST, EMPTY_CART_DB_SUCCESS, EMPTY_CART_DB_FAIL, RESET_CART_MESSAGES } from "../constants/CartConstant"
import axios from 'axios'


export const addToCartLogin = () => async (dispatch, getState) => {

    try {
        const cartProducts = getState().Cart.cartItems

        const { UserLogin } = getState()

        dispatch({
            type: ADD_TO_CART_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_HOST_URL}/cart/add_products`, { user_id: UserLogin.profile._id, cartProducts }, config)

        dispatch({
            type: ADD_TO_CART_LOGIN_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADD_TO_CART_LOGIN_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const getCartProducts = () => async (dispatch, getState) => {
    try {
        const { UserLogin } = getState()
        dispatch({
            type: GET_CART_REQUEST,
        })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/cart/get_products/${UserLogin.profile._id}`, config)

        dispatch({
            type: GET_CART_SUCCESS,
            payload: data
        })

        localStorage.setItem('authCartProducts', JSON.stringify(getState().AuthCart.authCartItems))
    } catch (error) {
        dispatch({
            type: GET_CART_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const addToCartDB = (productData, qty) => async (dispatch, getState) => {
    try {
        const { UserLogin } = getState()
        dispatch({
            type: ADD_TO_CART_REQUEST,
        })
        console.log(productData)
        const product = {
            product_id: productData._id, 
            user_id: UserLogin.profile._id,
            name: productData.name,
            image: productData.image,
            price: productData.price,
            quantity_selected: qty,
            quantity_available: productData.quantity_available,
            product_details: productData.product_details
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_HOST_URL}/cart/add_product`, product, config)

        dispatch({
            type: ADD_TO_CART_SUCCESS,
            payload: data
        })

        localStorage.setItem('authCartProducts', JSON.stringify(getState().AuthCart.authCartItems))

    } catch (error) {
        dispatch({
            type: ADD_TO_CART_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const updateQuantityDB = (product_id, qty) => async (dispatch, getState) => {

    try {
        const { UserLogin } = getState()
        dispatch({
            type: UPDATE_CART_QUANTITY_REQUEST,
        })

        const product = {
            product_id: product_id,
            user_id: UserLogin.profile._id,
            quantity_selected: qty,
        }
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.put(`${process.env.REACT_APP_HOST_URL}/cart/update_quantity`, product, config)

        dispatch({
            type: UPDATE_CART_QUANTITY_SUCCESS,
            payload: data
        })
        localStorage.setItem('authCartProducts', JSON.stringify(getState().AuthCart.authCartItems))

    } catch (error) {
        dispatch({
            type: UPDATE_CART_QUANTITY_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const removeFromCartDB = (p_id) => async (dispatch, getState) => {

    try {
        const { UserLogin } = getState()
        dispatch({
            type: REMOVE_FROM_CART_REQUEST,
        })
        const header = {
            headers: {
                'x-access-token': UserLogin.profile.token
            }
        }
        const IDs = {
            product_id: p_id,
            user_id: UserLogin.profile._id
        }
        console.log(header, IDs)
        const { data } = await axios.put(`${process.env.REACT_APP_HOST_URL}/cart/remove_product`, IDs, header)

        dispatch({
            type: REMOVE_FROM_CART_SUCCESS,
            payload: data
        })
        localStorage.setItem('authCartProducts', JSON.stringify(getState().AuthCart.authCartItems))

    } catch (error) {
        dispatch({
            type: REMOVE_FROM_CART_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const emptyCartDB = () => async (dispatch, getState) => {

    try {
        const { UserLogin } = getState()
        dispatch({
            type: EMPTY_CART_DB_REQUEST,
        })
        const header = {
            headers: {
                'x-access-token': UserLogin.profile.token
            }
        }
      
        const { data } = await axios.delete(`${process.env.REACT_APP_HOST_URL}/cart/empty_cart/${UserLogin.profile._id}`, header)

        dispatch({
            type: EMPTY_CART_DB_SUCCESS,
            payload: data
        })

        localStorage.setItem('authCartProducts', JSON.stringify(getState().AuthCart.authCartItems))

    } catch (error) {
        dispatch({
            type: EMPTY_CART_DB_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const resetCartMessages = () => (dispatch) => {
    dispatch({
        type: RESET_CART_MESSAGES
    })
}
export const emptyAuthCart = () => (dispatch) => {
    localStorage.removeItem('authCartProducts')
    dispatch({
        type: EMPTY_AUTH_CART
    })
}