import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS, EMPTY_CART } from "../constants/CartConstant";



export const CartReducer = (state = { cartItems: [], shippingAddress: {}, paymentMethod: '' }, action) => {

    switch (action.type) {

        case ADD_TO_CART:

            const existingProduct = state.cartItems.filter(items => items._id === action.payload._id);

            if (existingProduct.length > 0) {

                const withoutExistingProduct = state.cartItems.filter(items => items._id !== action.payload._id);

                const updatedUnitsProduct = {
                    ...existingProduct[0],
                    quantity_selected: action.payload.quantity_selected,
                };

                return {
                    ...state,
                    cartItems: [...withoutExistingProduct, updatedUnitsProduct]
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            }

        case REMOVE_FROM_CART:

            return {
                ...state,
                cartItems: state.cartItems.filter(items => {
                    return items._id !== action.payload
                })
            }
            
        case EMPTY_CART:
            return {
                ...state,
                cartItems: []
            }

        case SAVE_SHIPPING_ADDRESS:

            return {
                ...state,
                shippingAddress: action.payload
            }

        case SAVE_PAYMENT_METHOD:

            return {
                ...state,
                paymentMethod: action.payload
            }

        default:
            return state
    }
}

