import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
    return (
        <center>
            <Alert variant={variant}>
                {children}
            </Alert>
        </center>
    )
}

Message.defaultProps = {
    variant: 'info'
}

export default Message
