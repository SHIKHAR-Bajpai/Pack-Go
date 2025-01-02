import React, { useEffect, useRef, useState, useContext } from 'react';
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import Booking from '../components/Booking/Booking';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);
  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const { photo, title, desc, price, reviews = [], city, country, maxGroupSize } = tour || {};
  const options = { day: "numeric", month: 'long', year: 'numeric' };
  console.log({ tour, loading, error });
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    if (!user) {
      alert('Please sign in');
      return;
    }

    if (!tourRating) {
      alert('Please select a rating');
      return;
    }

    const reviewObj = {
      username: user.Name,
      reviewText,
      rating: tourRating,
    };

    try {
      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });
      
      const result = await res.json();
      console.log(result)

      if (!res.ok) {
        return alert(result.message);
      }
      alert(result.message);
      window.location.reload();

    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <section>
      <Container>
        {loading && <h4 className='text-center pt-5'>Loading .......</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
        {!loading && !error && (
          <Row>
            <Col lg="8">
              <div className='tour__content'>
                <img src={photo} alt={title} />
                <div className='tour__info'>
                  <h2>{title}</h2>

                  <div className='d-flex align-items-center gap-5'>
                    <span><i className="ri-map-pin-2-line"></i>{city}</span>
                    <span>
                      <i className="ri-map-pin-fill"></i>{country}
                    </span>
                  </div>

                  <div className='tour__extra-details'>
                    <span><i className="ri-money-dollar-circle-line"></i>${price} /per person</span>
                    <span><i className="ri-group-line"></i>{maxGroupSize} People</span>
                    <span className='tour__rating d-flex align-items-center gap-1'>
                      <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? "Not rated" : (<span>({reviews.length})</span>)}
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{desc}</p>
                </div>

                <div className='tour__reviews mt-4'>
                  <h4>Reviews ({reviews.length} reviews)</h4>

                  <Form onSubmit={submitHandler}>
                    <div className='d-flex align-items-center gap-3 mb-4 rating__group'>
                      {[1, 2, 3, 4, 5].map((rate) => (
                        <span
                          key={rate}
                          onClick={() => setTourRating(rate)}
                          style={{
                            cursor: 'pointer',
                            padding: '10px',
                            borderRadius: '50%',
                            border: tourRating === rate ? '2px solid var(--secondary-color)' : '2px solid transparent',
                            backgroundColor: tourRating === rate ? 'var(--secondary-color)' : 'transparent',
                            color: tourRating === rate ? '#fff' : 'inherit',
                          }}
                        >
                          {rate} <i className="ri-star-s-fill"></i>
                        </span>
                      ))}
                    </div>
                    <div className='review__input'>
                      <input type="text" ref={reviewMsgRef} placeholder=' Share your thoughts' required />
                      <button className='btn primary__btn text-white' type='submit'>Submit</button>
                    </div>
                  </Form>

                  <ListGroup className='user__reviews'>
                    {reviews.map(review => (
                      <div className='review__item' key={review._id}>
                        <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729627825/avatar_gljmaf.jpg' alt={review.username} />
                        <div className='w-100'>
                          <div className='d-flex align-items-center justify-content-between'>
                            <div>
                              <h5>{review.username.replace(/\b\w/g, (char) => char.toUpperCase())}</h5>
                              <p>{new Date(review.createdAt).toLocaleDateString("en-US", options)}</p>
                            </div>
                            <span className='d-flex align-items-center '>
                              {review.rating} <i className="ri-star-s-fill"></i>
                            </span>
                          </div>
                          <h6>{review.reviewText}</h6>
                        </div>
                      </div>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col lg="4">
              <Booking tour={tour} avgRating={avgRating} />
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}

export default TourDetails;
