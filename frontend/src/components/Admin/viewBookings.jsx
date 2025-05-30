import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import './viewBookings.css'; 
import { BASE_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';

const ViewBookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); 
    const token = user ? user.token : null; 

    const fetchBookings = useCallback(async () => {
        try {
            const response = await fetch(`${BASE_URL}/booking`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                alert('Network response was not ok');
                navigate('/admin');
                return; 
            }

            const result = await response.json(); 
            console.log(result);
            

            if (result.success && Array.isArray(result.data)) {
                setBookings(result.data); 
            } else {
                console.error('Expected data array but got:', result);
            }

        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    }, [token, navigate]); 

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    return (
        <section className="view-bookings">
            <Container>
                <Row>
                    <Col lg="12" className="pt-5 text-center">
                        <h1 className="heading">Manage Bookings</h1>
                    </Col>
                </Row>

                <Row className="pt-4">
                    <Col lg="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Tour Name</th>
                                    <th>Full Name</th>
                                    <th>Guest Size</th>
                                    <th>Amount</th>
                                    <th>Phone</th>
                                    <th>Booking Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length > 0 ? (
                                    bookings.map((booking) => (
                                        <tr key={booking._id}> 
                                            <td>{booking.tourName}</td>
                                            <td>{booking.fullName}</td>
                                            <td>{booking.guestSize}</td>
                                            <td>{booking.amount}</td>
                                            <td>{booking.phone}</td>
                                            <td>{booking.bookingDate}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">No bookings available</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ViewBookings;
