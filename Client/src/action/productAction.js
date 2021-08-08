import axios from 'axios'
import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_PRODUCT_ACCOR_TO_CAT_FAIL, GET_PRODUCT_ACCOR_TO_CAT_REQUEST, GET_PRODUCT_ACCOR_TO_CAT_SUCCESS, MOST_VIEWED_PRODUCT_FAIL, MOST_VIEWED_PRODUCT_REQUEST, MOST_VIEWED_PRODUCT_SUCCESS, NEW_ARRIVAL_PRODUCT_FAIL, NEW_ARRIVAL_PRODUCT_REQUEST, NEW_ARRIVAL_PRODUCT_SUCCESS, REVIEW_PRODUCT_FAIL, REVIEW_PRODUCT_REQUEST, REVIEW_PRODUCT_RESET, REVIEW_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from '../constants/productConstant'

export const addProducts = (productData, imageFile) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ADD_PRODUCT_REQUEST
        })

        const { UserLogin } = getState()

        let imageArr = []

        for (let i = 0; i < imageFile.length; i++) {
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
            await axios.put(s3SecureUrl, imageFile[i], config1)

            const imageUrl = s3SecureUrl.split('?')[0]
            imageArr.push(imageUrl)
        }

        const productBody = {
            name: productData.name,
            brand: productData.brand,
            description: productData.description,
            price: Number(productData.price),
            image: imageArr,
            quantity_available: Number(productData.quantity_available),
            product_details: {
                material: productData.material,
                color: productData.color,
                items_in_pack: Number(productData.items_in_pack)
            },
            created_by: UserLogin.profile._id,
            category_id: productData.category_id,
        }
       
        const config2 = {
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": UserLogin.profile.token
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_HOST_URL}/admin/add_product`, productBody, config2)

        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_LIST_REQUEST' })

        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/product/all_product`)

        dispatch({
            type: 'PRODUCT_LIST_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'PRODUCT_LIST_FAIL',
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const getProductsAccorToCat = (category_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_ACCOR_TO_CAT_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/product/selected_category/${category_id}`)

        dispatch({
            type: GET_PRODUCT_ACCOR_TO_CAT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_PRODUCT_ACCOR_TO_CAT_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const getMostViewedProducts = () => async (dispatch) => {
    try {
        dispatch({ type: MOST_VIEWED_PRODUCT_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/product/most_viewed`)

        dispatch({
            type: MOST_VIEWED_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MOST_VIEWED_PRODUCT_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const getNewArrivalProducts = () => async (dispatch) => {
    try {
        dispatch({ type: NEW_ARRIVAL_PRODUCT_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/product/new_arrival`)

        dispatch({
            type: NEW_ARRIVAL_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ARRIVAL_PRODUCT_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const getProductDetails = (productId) => async (dispatch) => {

    try {
        dispatch({ type: 'PRODUCT_DETAILS_REQUEST' })

        const { data } = await axios.get(`${process.env.REACT_APP_HOST_URL}/product/details/${productId}`)

        dispatch({
            type: 'PRODUCT_DETAILS_SUCCESS',
            payload: data
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCT_DETAILS_FAIL',
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_PRODUCT_REQUEST
        })
        const { UserLogin } = getState()
        const config = {
            headers: {
                'x-access-token': UserLogin.profile.token
            }
        }
        const { data } = await axios.delete(`${process.env.REACT_APP_HOST_URL}/admin/delete_product/${productId}`, config)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}


export const updateProduct = (productId, productData) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_PRODUCT_REQUEST
        })

        const { UserLogin } = getState()

        const productBody = {
            name: productData.name || null,
            brand: productData.brand || null,
            description: productData.description || null,
            price: Number(productData.price) || null,
            quantity_available: Number(productData.quantity_available) || null,
            product_details: {
                material: productData.material || null,
                color: productData.color || null,
                items_in_pack: Number(productData.items_in_pack) || null
            },
            category_id: productData.category_id || null,
        }

        const config = {
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": UserLogin.profile.token
            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_HOST_URL}/admin/update_product/${productId}`, productBody, config)

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const reviewProduct = (feedback, productId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_PRODUCT_REQUEST
        })

        const { UserLogin } = getState()

        const config = {
            headers: {
                "Content-Type": 'application/json',
                "x-access-token": UserLogin.profile.token
            }
        }

        const reviewBody = {
            name: `${UserLogin.profile.firstname} ${UserLogin.profile.lastname}`,
            rating: feedback.rating,
            comment: feedback.comment,
            postedBy: UserLogin.profile._id
        }

        const { data } = await axios.post(`${process.env.REACT_APP_HOST_URL}/product/add_review/${productId}`, reviewBody, config)

        dispatch({
            type: REVIEW_PRODUCT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REVIEW_PRODUCT_FAIL,
            payload: error.response && error.response.data ? error.response.data.message : error.message
        })
    }
}

export const resetReviewMessage = () => (dispatch) => {
    dispatch({
        type : REVIEW_PRODUCT_RESET
    })
}