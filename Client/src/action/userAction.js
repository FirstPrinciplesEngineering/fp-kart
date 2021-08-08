import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_LOGOUT_FAIL, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS } from "../constants/userConstant"
import axios from 'axios'
import { EMPTY_AUTH_CART } from "../constants/CartConstant"
import { MY_ORDER_RESET, ORDER_DETAILS_RESET } from "../constants/orderConstant"
import { REVIEW_PRODUCT_RESET } from "../constants/productConstant"


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_HOST_URL}/user/login`, { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('profile', JSON.stringify(data))
    }

    catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const logout = () => async (dispatch, getState) => {
    try {
        const { UserLogin } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.put(`${process.env.REACT_APP_HOST_URL}/user/logout/${UserLogin.profile._id}`, config)

        if (data) {
            dispatch({
                type: USER_LOGOUT,
                payload:data
            })
            dispatch({type: EMPTY_AUTH_CART})
            dispatch({type: USER_DETAILS_RESET})
            dispatch({type: MY_ORDER_RESET})
            dispatch({type: ORDER_DETAILS_RESET})
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch({type: REVIEW_PRODUCT_RESET})
            
            localStorage.removeItem('payment')
            localStorage.removeItem('profile')
            localStorage.removeItem('address')
            localStorage.removeItem('authCartProducts')
        }

    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const register = (newUser) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_HOST_URL}/user/register`, newUser, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('profile', JSON.stringify(data))
    }

    catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const getUserDetails = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const { UserLogin } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserLogin.profile.token
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/my_account/profile/${UserLogin.profile._id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    }

    catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const updateUserProfile = (newData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })
        const { UserLogin } = getState()
        const updateData = {
            _id: UserLogin.profile._id,
            firstname: newData.firstname || null,
            lastname: newData.lastname || null,
            oldPassword: newData.oldPassword || null,
            newPassword: newData.newPassword || null
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': UserLogin.profile.token
            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_HOST_URL}/my_account/update_profile`, updateData, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('profile', JSON.stringify(data))
    }

    catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const getUserList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { UserLogin } = getState()
        const config = {
            headers: {
                'x-access-token': UserLogin.profile.token
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/admin/users`, config)
        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })
    }

    catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const resetUpdateUserMessage = () => (dispatch) => {
    dispatch({
        type:USER_UPDATE_PROFILE_RESET
    })
}