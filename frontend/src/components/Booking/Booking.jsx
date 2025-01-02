import React, { useState, useContext } from 'react';
import "./Booking.css";
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userEmail: user ? user.email : '',
    tourName: title,
    fullName: '',
    phone: '',
    guestSize: 1,
    amount: price * 1 + 10,
    bookingDate: '',
    status: 'pending'
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { id, value } = e.target;
    if (id === 'guestSize') {
      const guestCount = Math.max(1, Number(value));
      setBooking(prev => ({
        ...prev,
        guestSize: guestCount,
        amount: (price * guestCount) + 10
      }));
    } else {
      setBooking(prev => ({ ...prev, [id]: value }));
    }
  };

  const validateForm = () => {
    let formErrors = {};
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];

    if (!booking.fullName) formErrors.fullName = "*required";

    if (!booking.phone) {
      formErrors.phone = "*required";
    } else if (!/^\d{10}$/.test(booking.phone)) {
      formErrors.phone = "*Invalid Phone Number";
    }

    if (!booking.userEmail) {
      formErrors.userEmail = "*required";
    } else if (!/\S+@\S+\.\S+/.test(booking.userEmail)) {
      formErrors.userEmail = "*Invalid Email Address";
    }

    if (!booking.bookingDate) {
      formErrors.bookingDate = "*required";
    } else if (booking.bookingDate < tomorrowString) {
      formErrors.bookingDate = "*Invalid Date";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return false;
    }
    
    setErrors({});
    return true;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user || user === undefined || user === null) {
      alert('Please sign in to proceed');
      navigate('/login');
      return;
    }

    if (!validateForm()) return;

    const bookingData = {
      userEmail: booking.userEmail,
      tourName: booking.tourName,
      fullName: booking.fullName,
      guestSize: booking.guestSize,
      phone: booking.phone,
      bookingDate: booking.bookingDate,
      amount: booking.amount,
    };

    localStorage.setItem('bookingData', JSON.stringify(bookingData));

    try {
      const res = await fetch(`${BASE_URL}/booking/new`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        credentials: 'include',
        body: JSON.stringify(bookingData)
      });

      const response = await res.json();
      
      if (!res.ok) {
        return alert(response.message);
      }

      window.location.href = response.session_url;

    } catch (err) {
      alert(err.message);
      navigate('/');
    }
  };

  const serviceFee = 10;
  const totalAmount = (Number(price) * Number(booking.guestSize)) + Number(serviceFee);

  return (
    <div className='booking'>
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>${price} <span>/per person</span></h3>
        <span className='tour__rating d flex align-items-center'>
          <i className="ri-star-s-fill"></i>{avgRating === 0 ? null : avgRating}({reviews?.length})
        </span>
      </div>

      <div className='booking__form'>
        <h5 className='mt-3'>Information</h5>
        <Form className='booking__info-form' onSubmit={(e) => e.preventDefault()}>
          
          <FormGroup>
            <input 
              type="text" 
              placeholder='Full Name' 
              id='fullName' 
              required 
              onChange={handleChange}
            />
            {errors.fullName && <p className="error" style={{color:'red',fontStyle:'italic',fontSize:'15px'}}>{errors.fullName}</p>} 
          </FormGroup>

          <FormGroup>
            <input 
              type="email" 
              placeholder='Email' 
              id='userEmail' 
              required 
              value={booking.userEmail}
              onChange={handleChange}
            />
            {errors.userEmail && <p className="error" style={{color:'red',fontStyle:'italic',fontSize:'15px'}}>{errors.userEmail}</p>} 
          </FormGroup>

          <FormGroup>
            <input 
              type="text" 
              placeholder='Phone' 
              id='phone' 
              required 
              onChange={handleChange}
            />
            {errors.phone && <p className="error" style={{color:'red',fontStyle:'italic',fontSize:'15px'}}>{errors.phone}</p>} 
          </FormGroup>

          <FormGroup >
            <input type="date" 
              id='bookingDate' 
              required 
              onChange={handleChange} 
              min={new Date().toISOString().split('T')[0]}
            />
            {errors.bookingDate && <p className="error" style={{ color:'red',fontStyle:'italic',fontSize:'15px'}}>{errors.bookingDate}</p>}
          </FormGroup>

          <FormGroup className='d-flex align-items-center gap-2 justify-content-between'>
            <span style={{paddingLeft:'8px', letterSpacing:'1px'}}> Number of Guest(s):</span>
            <input style={{flex:'1',maxWidth:'120px'}}
              type="number" 
              placeholder='Guest' 
              id='guestSize' 
              required 
              onChange={handleChange} 
              min="1" 
              onWheel={(e) => e.currentTarget.blur()} 
              value={booking.guestSize}
            />
          </FormGroup>
        </Form>
      </div>

      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'>${price} <i className="ri-close-line"> 1 person</i></h5>
            <span>${price}</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0'>
            <h5>Service Charge</h5>
            <span>$10</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total'>
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>Book Now</Button>
      </div>
    </div>
  );
}

export default Booking;
