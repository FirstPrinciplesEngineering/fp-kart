import { ADD_TO_CART_LOGIN_REQUEST, ADD_TO_CART_LOGIN_SUCCESS, ADD_TO_CART_LOGIN_FAIL, GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAIL, EMPTY_AUTH_CART, ADD_TO_CART_REQUEST, ADD_TO_CART_FAIL, ADD_TO_CART_SUCCESS, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAIL, UPDATE_CART_QUANTITY_FAIL, UPDATE_CART_QUANTITY_SUCCESS, UPDATE_CART_QUANTITY_REQUEST, RESET_CART_MESSAGES } from "../constants/CartConstant";



export const authAddToCartReducer = (state = {}, action) => {

    switch (action.type) {

        case ADD_TO_CART_LOGIN_REQUEST:
            return {
                ...state,
                loading : true
            }

        case ADD_TO_CART_LOGIN_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true
            }

        case ADD_TO_CART_LOGIN_FAIL:
            return {
                ...state,
                loading : false,
                error : action.payload 
            }
    
        default:
            return state
    }
}

export const authCartReducer = (state = {authCartItems:[]}, action) => {
    switch (action.type){

        //get cart products from database
        case GET_CART_REQUEST:
            return {
                ...state,
                getCartLoading:true
            }
        case GET_CART_SUCCESS:
            return {
                ...state,
                getCartLoading:false,
                authCartItems:action.payload
            }
        case GET_CART_FAIL:
            return {
                ...state,
                getCartLoading:false,
                getCartError:action.payload
            }

        // add to cart in database
        case ADD_TO_CART_REQUEST:
            return {
                ...state,
                addCartLoading:true
            }
        case ADD_TO_CART_SUCCESS:
            return {
                ...state,
                addCartLoading:false,
                addCartSuccess:action.payload
            }
        case ADD_TO_CART_FAIL:
            return {
                ...state,
                addCartLoading:false,
                addCartError:action.payload
            }

        // remove from cart in database
        case REMOVE_FROM_CART_REQUEST:
            return {
                ...state,
                removeCartLoading:true
            }
        case REMOVE_FROM_CART_SUCCESS:
            return {
                ...state,
                removeCartLoading:false,
                removeCartSuccess:action.payload
            }
        case REMOVE_FROM_CART_FAIL:
            return {
                ...state,
                removeCartLoading:false,
                removeCartError:action.payload
            }

        // update quantity in database
        case UPDATE_CART_QUANTITY_REQUEST:
            return {
                ...state,
                updateQuantityLoading:true
            }
        case UPDATE_CART_QUANTITY_SUCCESS:
            return {
                ...state,
                updateQuantityLoading:false,
                updateQuantitySuccess:action.payload
            }
        case UPDATE_CART_QUANTITY_FAIL:
            return {
                ...state,
                updateQuantityLoading:false,
                updateQuantityError:action.payload
            }
        case RESET_CART_MESSAGES:
            return{
                ...state,
                getCartError : '',
                addCartSuccess : '',
                addCartError : '',
                removeCartSuccess : '',
                removeCartError : '',
                updateQuantitySuccess : '',
                updateQuantityError : ''

            }
        case EMPTY_AUTH_CART:
            return{
                authCartItems:[]
            }

        default:
            return state
    }
}
