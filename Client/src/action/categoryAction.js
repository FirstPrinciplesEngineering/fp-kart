import axios from 'axios'
import { ADD_CATEGORY_FAIL, ADD_CATEGORY_REQUEST, ADD_CATEGORY_SUCCESS, GET_CATEGORY_DETAILS_FAIL, GET_CATEGORY_DETAILS_REQUEST, GET_CATEGORY_DETAILS_SUCCESS, GET_CATEGORY_FAIL, GET_CATEGORY_REQUEST, GET_CATEGORY_SUCCESS, UPDATE_CATEGORY_FAIL, UPDATE_CATEGORY_REQUEST, UPDATE_CATEGORY_SUCCESS } from '../constants/categoryConstant'

export const addCategory = (category_name, image) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_CATEGORY_REQUEST
        })

        const { UserLogin } = getState()
        
        //get secure url from our express server
        const config = {
            headers: {
                "x-access-token": UserLogin.profile.token
            }
        }
        const url = await axios.get(`${process.env.REACT_APP_HOST_URL}/admin/gets3_url`, config)
        const s3SecureUrl = url.data

        // post the image directly to the s3 bucket
        const config1 = {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": UserLogin.profile.token
            }
        }
        await axios.put(s3SecureUrl, image, config1)

        const imageUrl = s3SecureUrl.split('?')[0]

        const categoryBody = {
            category_name,
            category_image: imageUrl,
            created_by: UserLogin.profile._id
        }
        const config2 = {
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": UserLogin.profile.token
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_HOST_URL}/admin/create_category`, categoryBody, config2)

        dispatch({
            type:ADD_CATEGORY_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: ADD_CATEGORY_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }

}

export const getCategory = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_CATEGORY_REQUEST
        })
       

        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/product/category`)

        dispatch({
            type:GET_CATEGORY_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: GET_CATEGORY_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }

}

export const getCategoryDetails = (categoryId) => async (dispatch) => {
    try {
        dispatch({
            type: GET_CATEGORY_DETAILS_REQUEST
        })

        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/product/categorydetails/${categoryId}`)

        dispatch({
            type:GET_CATEGORY_DETAILS_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: GET_CATEGORY_DETAILS_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }

}

export const updateCategory = (categoryId, category_name, image) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_CATEGORY_REQUEST
        })

        const { UserLogin } = getState()
        
        let imageUrl
        if(image !== null){
            //get secure url from our express server
            const config = {
                headers: {
                    "x-access-token": UserLogin.profile.token
                }
            }
            const url = await axios.get(`${process.env.REACT_APP_HOST_URL}/admin/gets3_url`, config)
            const s3SecureUrl = url.data
    
            // post the image directly to the s3 bucket
            const config1 = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-access-token": UserLogin.profile.token
                }
            }
            await axios.put(s3SecureUrl, image, config1)
    
            imageUrl = s3SecureUrl.split('?')[0]
        }

        const categoryBody = {
            category_name: category_name || null,
            category_image: imageUrl || null,
            created_by: UserLogin.profile._id
        }
        const config2 = {
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": UserLogin.profile.token
            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_HOST_URL}/admin/update_category/${categoryId}`, categoryBody, config2)

        dispatch({
            type:UPDATE_CATEGORY_SUCCESS,
            payload:data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }

}