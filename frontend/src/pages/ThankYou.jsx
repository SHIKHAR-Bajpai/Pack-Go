import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/thank-you.css";
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const ThankYou = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = user?.token;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const sessionId = params.get('session_id');

    if (success === 'true' && sessionId) {

      const bookingData = JSON.parse(localStorage.getItem('bookingData'));
      const createBooking = async () => {
        try {
          const response = await fetch(`${BASE_URL}/booking/payment-success?session_id=${sessionId}&success=true`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(bookingData) 
          });

          const data = await response.json();
          console.log(data);

          if (data.success) {
            
            alert(data.message);
            console.log('Booking created successfully:', data);
            localStorage.setItem('bookingCreated', 'true'); 
            navigate('/thank-you'); 

          } else {
            alert(data.message);
            navigate('/'); 
          }
        } catch (error) {
          alert(error.message);
          navigate('/'); 
        }
      };

      createBooking();
    } else {
      console.log('Payment was not successful. Please try again.');
      navigate('/'); 
    }
  }, [navigate, token]);

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className='pt-5 text-center'>
            <div className='thank__you'>
              <span aria-label="Success Icon"><i className="ri-checkbox-circle-line"></i></span>
              <h1 className='mb-3 fw-semibold'>Thank You</h1>
              <h3 className='mb-4'>Your Trip is booked!!</h3>
              <Button className='btn primary__btn w-25'>
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ThankYou;
