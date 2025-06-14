import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody } from 'reactstrap'
import "./tour-card.css"
import calculateAvgRating from '../../utils/avgRating'

const TourCard = ({ tour }) => {
  const { _id, title, city, photo, price, featured, reviews } = tour;
  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className='tour__card'>
      <Card>
        <Link to={`/tours/${_id}`}>
          <div className='tour__img'>
            <img src={photo} alt="tour-img" />
            {featured && <span>Featured</span>}
          </div>
        </Link>

        <CardBody>
          <div className='card__top d-flex align-items-center justify-content-between'>
            <span className='tour__location d flex align-items-center gap-1'>
              <i className="ri-map-pin-line"></i>{city}
            </span>
            <span className='tour__rating d flex align-items-center gap-1'>
              <i className="ri-star-fill"></i>
              {avgRating === 0 ? "Not Rated" : avgRating}
              {totalRating === 0 ? "0" : <span>({reviews.length})</span>}
            </span>
          </div>

          <h5 className="tour__title">
            <Link to={`/tours/${_id}`}>{title}</Link>
          </h5>
          <div className='card__bottom d-flex align-items-center justify-content-between mt-3'>
            <h5>${price}<span> &nbsp; per person</span></h5>
            <button className='btn booking__btn'>
              <Link to={`/tours/${_id}`}>Book Now</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TourCard;
