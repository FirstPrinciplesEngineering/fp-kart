import {combineReducers} from 'redux'

import { AddCategoryReducer, CategoryDetailsReducer, CategoryReducer, CategoryUpdateReducer } from './CategoryReducer'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer } from './userReducer'
import { AddProductReducer, DeleteProductReducer, MostViewedProductReducer, NewArrivalProductReducer, ProductAccorToCatReducer, ProductCreateReviewReducer, ProductDetailsReducer, ProductReducer, UpdateProductReducer } from './ProductReducer'
import { CartReducer } from './CartReducer'
import { activeOrdersReducer, completedOrdersReducer, myOrdersReducer, orderDetailsReducer, placeOrderReducer, updateDeliveryStatusReducer } from './OrderReducer'
import { authAddToCartReducer, authCartReducer } from './AuthCartReducer'


const MainReducer = combineReducers({

    AddCategory : AddCategoryReducer,
    Category : CategoryReducer,
    CategoryDetails : CategoryDetailsReducer,
    CategoryUpdate : CategoryUpdateReducer,
    
    AddProduct : AddProductReducer,
    Products : ProductReducer,
    ProductAccorToCat : ProductAccorToCatReducer,
    MostViewedProduct : MostViewedProductReducer,
    NewArrivalProduct : NewArrivalProductReducer,
    ProductCreateReview : ProductCreateReviewReducer,
    ProductDetails : ProductDetailsReducer,
    UpdateProduct : UpdateProductReducer,
    DeleteProduct : DeleteProductReducer,

    Cart : CartReducer,
    AuthAddToCart : authAddToCartReducer,
    AuthCart : authCartReducer,

    UserLogin : userLoginReducer,
    UserRegister : userRegisterReducer,
    UserDetails : userDetailsReducer,
    UserUpdateProfile: userUpdateProfileReducer,
    UserList: userListReducer,
    
    PlaceOrder : placeOrderReducer,
    OrderDetails : orderDetailsReducer,
    MyOrders : myOrdersReducer,
    ActiveOrders : activeOrdersReducer,
    CompletedOrders : completedOrdersReducer,
    UpdateDeliveryStatus : updateDeliveryStatusReducer,

})


export default MainReducer