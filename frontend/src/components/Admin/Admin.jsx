import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Admin.css';


const Admin = () => {
  return (
    <section className="admin-dashboard">
      <Container>
        <Row>
          <Col lg="12" className='pt-5 text-center'>
            <h1 className='heading'>Admin Dashboard</h1>
          </Col>
        </Row>

        <Row className="pt-5 d-flex justify-content-between align-items-center">
            <Col lg="3" md="6" className='text-center'>
                <Link to="/admin/mangeTours">
                    <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626562/timetable_uoe9zz.png' alt="Manage Tours" className="admin-image" />
                    <Button className='admin-button'>Tours</Button>
                </Link>
            </Col>

            <Col lg="3" md="6" className='text-center'>
                <Link to="/admin/viewbookings">
                    <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626558/worldtour_kfh6tn.png' alt="Manage Bookings" className="admin-image" />
                    <Button className='admin-button'>Bookings</Button>
                </Link>
            </Col>

            <Col lg="3" md="6" className='text-center'>
                <Link to="/admin/viewUsers">
                    <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626560/adminuser_qx3bdp.png' alt="Manage Users" className="admin-image" />
                    <Button className='admin-button'>Users</Button>
                </Link>
            </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Admin;

