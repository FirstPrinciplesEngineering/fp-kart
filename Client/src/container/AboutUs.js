import React, { useEffect, useState } from 'react'
import { Col, Row, Image } from 'react-bootstrap'

const AboutUs = () => {

    const display = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }

    return (
        <Col className="justify-content-md-center text-center" data-aos="fade-up" style={{ padding: '20px', textTransform: 'uppercase' }} data-aos-delay="400" >
            <center><p className='heading'>About CartHunt</p></center>
            <Row>
                <Col md={6}>
                    <Image width={500} src='/photos/ourServices.jpg' alt="scrunchies" data-aos="zoom-out" data-aos-delay="400" />
                </Col>
                <Col md={6} data-aos="fade-up" style={display}>
                    <p className='heading'>Our Services</p>
                    <p>At Cart Hunt we believe in making our customers happy! Our team will work with you every step of the way to ensure that you get perfect product for your event or occasion.

                        Right from your first call, you will work with our experienced account handling team. We work with you through the entire process, of designing and making the product, to delivering them to your doorstep.

                        We are committed to delivering the best service experience all the way and you will feel the difference when you work with us!</p>
                </Col>
            </Row >

            <Row>
                <Col data-aos="fade-up" data-aos-delay="400" style={display}>
                    <p className='heading'>Product Quality</p>
                    <p>When it comes to product quality we make no compromises! We use only the best material sourced from the best suppliers globally.
                        We understand we play an important part in a happy occasion that you are celebrating and we never want to let you down. We work hard to make sure that each product and each box to be perfect!</p>
                </Col>
                {/* <Col md={6}>
                    <Image width={500} src='/photos/ourServices.jpg' alt="scrunchies" data-aos="zoom-out" data-aos-delay="400" />
                </Col> */}
            </Row >
        </Col>

    )
}

export default AboutUs
