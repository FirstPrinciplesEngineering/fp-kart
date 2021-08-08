import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import NavigationIcon from '@material-ui/icons/Navigation';
import '../assets/css/footer.css'

const Footer = () => {
    return (


        <div className='main_footer'>
            <div className='footer'>
                <Col>
                    <p>Follow Us</p>
                    <div className='socialIcons'>
                        <a href="https://www.instagram.com/keshavpk2426/" target="blank" className="social">
                            <i style={{fontSize:'2em'}}  className="fa fa-instagram"></i>
                        </a>
                        <a href="https://twitter.com/keshavp_26" target="blank" className="social">
                            <i style={{fontSize:'2em'}}  className="fa fa-twitter"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/keshav-priyadarshi-877449125/" target="blank" className="social">
                            <i style={{fontSize:'2em'}}  className="fa fa-linkedin"></i>
                        </a>
                    </div>
                    <hr />
                </Col>
                <Row className='redirect'>
                    <Link to="/" ><span>HOME</span></Link>
                    <Link to="/all_products"><span>SHOP</span></Link>
                    <Link to="/contact"><span>CONTACT US</span></Link>
                    <Link to="/faqs"><span>FAQs</span></Link>
                    <HashLink to="#"><NavigationIcon /></HashLink>
                </Row>

                <Col className='companyLogo'>
                    <h1><span style={{ color: 'magenta' }}>Cart</span>Hunt</h1>
                    <small>Welcome to our store</small>

                </Col>

                <Col className='copyright'>
                    <center><h6>Copyright &#169;Cart Hunt 2021 | All rights reserved</h6> </center>
                </Col>
            </div>
        </div>

    )
}

export default Footer







