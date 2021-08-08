import React, { useEffect } from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//AOS imports
import AOS from "aos"
import "aos/dist/aos.css"
import ScrollToTop from "../container/ScrollToTop"
import Login from "../container/Login"
import Home from "../container/Home"
import SignUp from "../container/SignUp"
import AccountVerify from "../Extras/AccountVerify"

import AllProduct from "../container/AllProduct"
import NewArrivalProductList from "../container/NewArrivalProductList"

import ProductDetails from "../container/ProductDetails"
import Cart from "../container/Cart"
import Footer from '../container/Footer'
import CheckoutAddress from "../container/CheckoutAddress"
import CheckoutPayment from "../container/CheckoutPayment"
import PlaceOrder from "../container/PlaceOrder"
import PageNotFound from "../Extras/PageNotFound"
import OrderDetails from "../container/OrderDetails"
import Contact from "../container/Contact"
import FAQs from "../container/FAQs"
import UserDashboard from "../container/UserDashboard"

import AdminDashboard from "../container/AdminPanel"

import AdminListUsers from "../container/AdminListUsers"
import AdminListCategory from "../container/AdminListCategory"
import AdminListProduct from "../container/AdminListProduct"

import AdminAddCategory from "../container/AdminAddCategory"
import AdminAddProduct from "../container/AdminAddProduct"
import AdminProductDetails from "../container/AdminProductDetails"
import AdminCategoryDetails from "../container/AdminCategoryDetails"
import CategoryProducts from "../container/CategoryProducts"
import AdminListActiveOrders from "../container/AdminListActiveOrders"
import AdminListCompletedOrders from "../container/AdminListCompletedOrders"
import OrderSuccessful from "../Extras/OrderSuccessful"



const Routes = () => {
    useEffect(() => {
        //AOS initialise
        AOS.init({ duration: 1000 })
    }, [])
    
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/faqs' component={FAQs} />
                <Route path='/login' component={Login} />
                <Route path="/account_verify" component={AccountVerify} />
                <Route path="/signup" component={SignUp} />

                <Route exact path="/all_products" component={AllProduct} />
                <Route exact path="/newcollection" component={NewArrivalProductList} />
                <Route exact path="/products/:categoryId" component={CategoryProducts} />

                <Route path="/product_details/:id" component={ProductDetails} />
                <Route path="/cart/:id?" component={Cart} />
                <Route path="/profile" component={UserDashboard} />
                <Route path="/order_details/:id" component={OrderDetails} />
                <Route path="/checkout_address" component={CheckoutAddress} />
                <Route path="/payment" component={CheckoutPayment} />
                <Route path="/place_order" component={PlaceOrder} />


                //admin routes
                <Route exact path='/admin' component={AdminDashboard} />
                <Route exact path='/admin/users' component={AdminListUsers} />

                <Route path='/admin/categories' component={AdminListCategory} />
                <Route path='/admin/categorydetails/:categoryId' component={AdminCategoryDetails} />
                
                <Route path='/admin/products/:categoryId' component={AdminListProduct} />
                <Route path='/admin/productdetails/:productId' component={AdminProductDetails} />


                <Route path='/admin/add_category' component={AdminAddCategory} />
                <Route path='/admin/add_product' component={AdminAddProduct} />

                <Route path='/admin/active_orders' component={AdminListActiveOrders} />
                <Route path='/admin/completed_orders' component={AdminListCompletedOrders} />

                <Route path='/order_placed' component={OrderSuccessful} />
                <Route component={PageNotFound} />
            </Switch>
            <Footer />

        </BrowserRouter>
    )
}

export default Routes;