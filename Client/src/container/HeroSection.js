import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import '../assets/css/heroSection.css'

const HeroSection = () => {

    return (
        <Row className='banner justify-content-md-center text-center' data-aos="zoom-in">
            <Col md={7}>
                <h2>Each Purchase will be made with pleasure.</h2>
                <p>
                WHEN IT COMES TO PRODUCT QUALITY WE MAKE NO COMPROMISES! WE USE ONLY THE BEST MATERIAL SOURCED FROM THE BEST SUPPLIERS GLOBALLY. WE UNDERSTAND WE PLAY AN IMPORTANT PART IN A HAPPY OCCASION THAT YOU ARE CELEBRATING AND WE NEVER WANT TO LET YOU DOWN. WE WORK HARD TO MAKE SURE THAT EACH PRODUCT AND EACH BOX TO BE PERFECT!
                </p>
                <Link to="/all_products"><button className="shopNow_btn">
                    Shop Now
                </button></Link>
            </Col>

        </Row>
    )
}

export default HeroSection
