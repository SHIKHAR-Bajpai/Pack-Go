import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/thank-you.css";
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import emailjs from 'emailjs-com';

const ThankYou = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = user?.token;

  const sendConfirmationEmail = (bookingData) => {
    const emailParams = {
      to_email: bookingData.userEmail,
      full_name: bookingData.fullName,
      tour_name: bookingData.tourName,
      guest_size: bookingData.guestSize,
      phone: bookingData.phone,
      bookingDate: bookingData.bookingDate, 
      amount: bookingData.amount,
    };

    emailjs
      .send('service_isjd0lf', 'template_yi7p9am', emailParams, 'JQbTERsFse5LZcPK-')
      .then(
        (response) => {
          console.log('Email sent successfully!', response);
        },
        (error) => {
          console.error('Error sending email:', error);
        }
      );
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get('success');
    const sessionId = params.get('session_id');

    if (success === 'true' && sessionId) {
      const bookingData = JSON.parse(localStorage.getItem('bookingData'));

      if (!bookingData || !bookingData.userEmail || !bookingData.fullName || !bookingData.tourName || !bookingData.guestSize || !bookingData.phone || !bookingData.bookingDate || !bookingData.amount) {
        console.error('Missing required fields in booking data');
        alert('Booking data is incomplete. Please try again.');
        navigate('/');
        return;
      }

      const createBooking = async () => {
        try {
          const response = await fetch(`${BASE_URL}/booking/payment-success?session_id=${sessionId}&success=true`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(bookingData),
          });

          const data = await response.json();
          
          if (data.success) {
            alert(data.message);
            sendConfirmationEmail(bookingData);

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
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span aria-label="Success Icon"><i className="ri-checkbox-circle-line"></i></span>
              <h1 className="mb-3 fw-semibold">Thank You</h1>
              <h3 className="mb-4">Your Trip is booked!!</h3>
              <Button className="btn primary__btn w-25">
                <Link to="/home">Back to Home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
