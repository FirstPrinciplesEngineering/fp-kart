import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS, EMPTY_CART } from "../constants/CartConstant"

export const addToCart = (productData, qty) => async (dispatch, getState) => {

    dispatch({
        type: ADD_TO_CART,
        payload: {
            _id: productData._id,
            name: productData.name,
            image: productData.image,
            price: productData.price,
            quantity_selected: qty,
            quantity_available: productData.quantity_available,
            product_details: productData.product_details
        }
    })

    localStorage.setItem('cartProducts', JSON.stringify(getState().Cart.cartItems))
}

export const removeFromCart = (productId) => (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: productId
    })

    localStorage.setItem('cartProducts', JSON.stringify(getState().Cart.cartItems))
}

export const saveShippingAddress = (address) => (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_ADDRESS,
        payload: address
    })

    localStorage.setItem('address', JSON.stringify(address))
}

export const savePaymentMethod = (payment) => (dispatch) => {
    dispatch({
        type: SAVE_PAYMENT_METHOD,
        payload: payment
    })

    localStorage.setItem('payment', JSON.stringify(payment))
}

export const emptyCart = () => (dispatch) => {
    localStorage.removeItem('cartProducts')
    dispatch({
        type: EMPTY_CART
    })
}