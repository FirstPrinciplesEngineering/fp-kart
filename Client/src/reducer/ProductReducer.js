import { ADD_PRODUCT_FAIL, ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, GET_PRODUCT_ACCOR_TO_CAT_FAIL, GET_PRODUCT_ACCOR_TO_CAT_REQUEST, GET_PRODUCT_ACCOR_TO_CAT_SUCCESS, MOST_VIEWED_PRODUCT_FAIL, MOST_VIEWED_PRODUCT_REQUEST, MOST_VIEWED_PRODUCT_SUCCESS, NEW_ARRIVAL_PRODUCT_FAIL, NEW_ARRIVAL_PRODUCT_REQUEST, NEW_ARRIVAL_PRODUCT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, REVIEW_PRODUCT_FAIL, REVIEW_PRODUCT_REQUEST, REVIEW_PRODUCT_RESET, REVIEW_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../constants/productConstant"

export const AddProductReducer = (state={}, action) => {

    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
            return{
                loading: true
            }
        case ADD_PRODUCT_SUCCESS:
            return{
                loading:false,
                product_added:action.payload
            }
        case ADD_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
    
        default:
            return state
    }
}


export const DeleteProductReducer = (state={}, action) => {

    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return{
                productDeleteLoading: true
            }
        case DELETE_PRODUCT_SUCCESS:
            return{
                productDeleteLoading:false,
                product_deleted:action.payload
            }
        case DELETE_PRODUCT_FAIL:
            return{
                productDeleteLoading:false,
                productDeleteError:action.payload
            }
    
        default:
            return state
    }
}

export const UpdateProductReducer = (state={}, action) => {

    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return{
                productUpdateLoading: true
            }
        case UPDATE_PRODUCT_SUCCESS:
            return{
                productUpdateLoading:false,
                product_updated:action.payload
            }
        case UPDATE_PRODUCT_FAIL:
            return{
                productUpdateLoading:false,
                productUpdateError:action.payload
            }
    
        default:
            return state
    }
}

export const ProductReducer = (state = { products: [] }, action) => {

    switch (action.type) {

        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const ProductAccorToCatReducer = (state = { productATC: [] }, action) => {

    switch (action.type) {

        case GET_PRODUCT_ACCOR_TO_CAT_REQUEST:
            return { loading: true, productATC: [] }
        case GET_PRODUCT_ACCOR_TO_CAT_SUCCESS:
            return { loading: false, productATC: action.payload }
        case GET_PRODUCT_ACCOR_TO_CAT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const MostViewedProductReducer = (state = { mostViewedProducts: [] }, action) => {

    switch (action.type) {

        case MOST_VIEWED_PRODUCT_REQUEST:
            return { mostViewedLoading: true, mostViewedProducts: [] }
        case MOST_VIEWED_PRODUCT_SUCCESS:
            return { mostViewedLoading: false, mostViewedProducts: action.payload }
        case MOST_VIEWED_PRODUCT_FAIL:
            return { mostViewedLoading: false, mostViewedError: action.payload }
        default:
            return state
    }
}

export const NewArrivalProductReducer = (state = { newArrivalProducts: [] }, action) => {

    switch (action.type) {

        case NEW_ARRIVAL_PRODUCT_REQUEST:
            return { newArrivalLoading: true, newArrivalProducts: [] }
        case NEW_ARRIVAL_PRODUCT_SUCCESS:
            return { newArrivalLoading: false, newArrivalProducts: action.payload }
        case NEW_ARRIVAL_PRODUCT_FAIL:
            return { newArrivalLoading: false, newArrivalError: action.payload }
        default:
            return state
    }
}

export const ProductDetailsReducer = (state = { productDetails : {} }, action) => {

    switch (action.type) {

        case 'PRODUCT_DETAILS_REQUEST':
            return { loading: true, ...state }
        case 'PRODUCT_DETAILS_SUCCESS':
            return { loading: false, productDetails: action.payload }
        case 'PRODUCT_DETAILS_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const ProductCreateReviewReducer = (state = {}, action) => {

    switch (action.type) {

        case REVIEW_PRODUCT_REQUEST:
            return { reviewLoading: true }
        case REVIEW_PRODUCT_SUCCESS:
            return { reviewLoading: false, reviewSuccess: action.payload }
        case REVIEW_PRODUCT_FAIL:
            return { reviewLoading: false, reviewError: action.payload }
        case REVIEW_PRODUCT_RESET:
            return {}

        default:
            return state
    }
}
