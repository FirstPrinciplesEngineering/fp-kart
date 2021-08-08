import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import MainReducer from '../reducer/MainReducer'
import {composeWithDevTools} from 'redux-devtools-extension'


const getItemsFromStorage = localStorage.getItem('cartProducts') ? JSON.parse(localStorage.getItem('cartProducts')) : []
const getAuthItemsFromStorage = localStorage.getItem('authCartProducts') ? JSON.parse(localStorage.getItem('authCartProducts')) : []
const getProfileFromStorage = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile')) : null
const getShippingAddressFromStorage = localStorage.getItem('address') ? JSON.parse(localStorage.getItem('address')) : null
const getPaymentMethodFromStorage = localStorage.getItem('payment') ? JSON.parse(localStorage.getItem('payment')) : null

const initialState = {
    Cart : { 
        cartItems : getItemsFromStorage, 
        shippingAddress : getShippingAddressFromStorage, 
        paymentMethod:getPaymentMethodFromStorage
    },
    AuthCart : { 
        authCartItems : getAuthItemsFromStorage,
    },
    UserLogin : { profile : getProfileFromStorage },
    OrderDetails : { orderDetails : null }
}

const middleware = [thunk]

// const store = createStore(MainReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
const store = createStore(MainReducer, initialState, applyMiddleware(...middleware))

export default store