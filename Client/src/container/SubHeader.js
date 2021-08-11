import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import "../assets/css/subheader.css"
import '../assets/css/header.css'
import { withRouter } from 'react-router-dom'

const SubHeader = (props) => {

    const [bgcolor, setBgColor] = useState("")
    const [shadow, setShadow] = useState("")

    const { profile } = useSelector(state => state.UserLogin)
    const { cartItems } = useSelector(state => state.Cart)
    const { authCartItems } = useSelector(state => state.AuthCart)

    const scrollEventListen = (e) => {
        if (window.scrollY > 80) {
            setBgColor("white")
            setShadow("0px 1px 5px grey")
        }
        else {
            setBgColor("")
            setShadow("")
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollEventListen)
        return () => {
            window.removeEventListener('scroll', scrollEventListen)
        }
    }, [window.scroll])

    return (
        <header style={{ backgroundColor: `${bgcolor}`, boxShadow: `${shadow}` }}>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light" >

                    <Link to="/">
                        <p style={{ marginTop: '5px', fontSize: '2em', color: '#4d05e8' }}>fp<span style={{ color: 'magenta' }}>Kart</span></p>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-lg-auto">

                            <li className="nav-item nav-hover">
                                <Link className="nav-link" to="/all_products">Shop</Link>
                            </li>
                            <li className="nav-item nav-hover">
                                <Link className="nav-link" to="/faqs">FAQ</Link>
                            </li>
                            <li className="nav-item nav-hover">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                            {
                                profile ?
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile" ><i className="far fa-user"></i></Link>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login" ><i className="far fa-user"></i></Link>
                                    </li>
                            }
                            <li className="nav-item">
                                <Link className="cartIcon nav-link" to="/cart">
                                    <i class="fab fa-opencart"></i>
                                    <small className='cartNum'>{authCartItems.length !== 0 ? authCartItems.length : cartItems.length}</small>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default withRouter(SubHeader)
