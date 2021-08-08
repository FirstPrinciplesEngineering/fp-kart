import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <Spinner animation='border' role='status' style={{
            width:'100px',
            height:'100px',
            margin:'auto',
            marginBottom:'50px',
            display:'block',
            color:'#4d05e8'
        }}>
            <span className='sr-only'>
                Loading...
            </span>
        </Spinner>
    )
}

export default Loader
