import { ACTIVE_ORDER_FAIL, ACTIVE_ORDER_REQUEST, ACTIVE_ORDER_RESET, ACTIVE_ORDER_SUCCESS, COMPLETED_ORDER_FAIL, COMPLETED_ORDER_REQUEST, COMPLETED_ORDER_RESET, COMPLETED_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_RESET, MY_ORDER_SUCCESS, ORDER_DELIVERED_FAIL, ORDER_DELIVERED_REQUEST, ORDER_DELIVERED_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_RESET, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS, PLACE_ORDER_FAIL, PLACE_ORDER_REQUEST, PLACE_ORDER_RESET, PLACE_ORDER_SUCCESS, UPDATE_DELIVERY_STATUS_FAIL, UPDATE_DELIVERY_STATUS_REQUEST, UPDATE_DELIVERY_STATUS_SUCCESS } from "../constants/orderConstant";

export const placeOrderReducer = (state={}, action) => {
    switch (action.type) {
        case PLACE_ORDER_REQUEST:
            return {
                loading : true
            }

        case PLACE_ORDER_SUCCESS:
            return {
                loading:false,
                success:true,
                order:action.payload
            }

        case PLACE_ORDER_FAIL:
            return {
                loading : false,
                error : action.payload 
            }
        case PLACE_ORDER_RESET:
            return { }
            
        default:
            return state;
    }
}

export const myOrdersReducer = (state={ myOrders:[] }, action) => {

    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                loadingOrders : true
            }

        case MY_ORDER_SUCCESS:
            return {
                loadingOrders:false,
                myOrders:action.payload
            }

        case MY_ORDER_FAIL:
            return {
                loadingOrders : false,
                orderError : action.payload 
            }
        case MY_ORDER_RESET:
            return {
                myOrders:[]
            }
            
        default:
            return state;
    }
}


export const orderDetailsReducer = (state={ orderDetails:{} }, action) => {

    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading : true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading:false,
                orderDetails:action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading : false,
                error : action.payload 
            }
        case ORDER_DETAILS_RESET:
            return {
                orderDetails:{}
            }
            
        default:
            return state;
    }
}


export const activeOrdersReducer = (state={ activeOrders:[] }, action) => {

    switch (action.type) {
        case ACTIVE_ORDER_REQUEST:
            return {
                loadingActiveOrders : true
            }

        case ACTIVE_ORDER_SUCCESS:
            return {
                loadingActiveOrders:false,
                activeOrders:action.payload
            }

        case ACTIVE_ORDER_FAIL:
            return {
                loadingActiveOrders : false,
                activeOrderError : action.payload 
            }
        case ACTIVE_ORDER_RESET:
            return {
                activeOrders:[]
            }
            
        default:
            return state;
    }
}

export const completedOrdersReducer = (state={ completedOrders:[] }, action) => {

    switch (action.type) {
        case COMPLETED_ORDER_REQUEST:
            return {
                loadingCompletedOrders : true
            }

        case COMPLETED_ORDER_SUCCESS:
            return {
                loadingCompletedOrders:false,
                completedOrders:action.payload
            }

        case COMPLETED_ORDER_FAIL:
            return {
                loadingCompletedOrders : false,
                completedOrderError : action.payload 
            }
        case COMPLETED_ORDER_RESET:
            return {
                completedOrders:[]
            }
            
        default:
            return state;
    }
}


export const updateDeliveryStatusReducer = (state={}, action) => {

    switch (action.type) {
        case UPDATE_DELIVERY_STATUS_REQUEST:
            return {
                deliveryLoading : true
            }

        case UPDATE_DELIVERY_STATUS_SUCCESS:
            return {
                deliveryLoading:false,
                delivered:action.payload
            }

        case UPDATE_DELIVERY_STATUS_FAIL:
            return {
                deliveryLoading : false,
                deliveryError : action.payload 
            }
            
        default:
            return state;
    }
}