import React from 'react'
import { Col, Row, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    const style = {
        width:'50%',
        marginLeft:'auto',
        marginRight:'auto',
        marginBottom:'50px',
        padding:'90px'
    }

    return (
        <Col style={style} className="justify-content-md-center text-center" >
            <p className='heading'>404 PAGE NOT FOUND</p>
            <Image width={200} src='/photos/notFound.gif' />
            <br />
            <Link to="/">
                <button className='page_btn'>gO HOME</button>
            </Link>
        </Col>
    )
}

export default PageNotFound
