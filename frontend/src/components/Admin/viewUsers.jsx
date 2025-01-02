import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import './viewUsers.css'; 
import { BASE_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';

const ViewUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); 
    const token = user ? user.token : null; 

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch(`${BASE_URL}/users`, {
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
                setUsers(result.data); 
            } else {
                console.error('Expected data array but got:', result);
            }

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [token, navigate]); 

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <section className="view-users">
            <Container>
                <Row>
                    <Col lg="12" className="pt-5 text-center">
                        <h1 className="heading">Manage Users</h1>
                    </Col>
                </Row>

                <Row className="pt-4">
                    <Col lg="12">
                        <Table striped>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>S.No</th>
                                    <th style={{ textAlign: 'center' }}>Id</th>
                                    <th style={{ textAlign: 'center' }}>Full Name</th>
                                    <th style={{ textAlign: 'center' }}>Email</th>
                                    <th style={{ textAlign: 'center' }}>Phone</th>
                                    <th style={{ textAlign: 'center' }}>Role</th>
                                    <th style={{ textAlign: 'center' }}>Registration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={user._id} style={{ textAlign: 'center' }}>
                                            <td>{index + 1}</td> 
                                            <td>{user._id}</td> 
                                            <td>{user.Name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.role}</td>
                                            <td>{new Date(user.createdAt).toLocaleString()}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center">No users available</td>
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

export default ViewUsers;
