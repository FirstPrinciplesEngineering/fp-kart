import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Table } from 'react-bootstrap'

const MyOrders = ({ orders }) => {

    const renderOrders = (data) => {
        if (data) {
            return data.map((items) => {
                return (

                    <tr key={items._id}>
                        <td>{items._id}</td>
                        <td>{items.createdAt.substring(0, 10)}</td>
                        <td>{items.totalPrice}</td>
                        <td>
                            {
                                items.isPaid ? items.paidAt.substring(0, 10)
                                    :
                                    <i className='fas fa-times'></i>
                            }
                        </td>

                        <td>
                            {
                                items.isDelivered ? items.deliveredAt.substring(0, 10)
                                    :
                                    <i className='fas fa-times'></i>
                            }
                        </td>

                        <td><Link to={`order_details/${items._id}`}><button className='form-control'>Details</button></Link></td>
                    </tr>

                )
            })
        }
    }
    return (
        <Col>
            <p id='myorders' className='subheading'>My Orders</p>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Dt.</th>
                        <th>Amout</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {renderOrders(orders)}
                </tbody>
            </Table>
        </Col>
    )
}

export default MyOrders
