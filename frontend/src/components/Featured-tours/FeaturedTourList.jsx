import React from 'react';
import TourCard from '../../components/shared/TourCard';
import { Col, Spinner } from 'reactstrap';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const FeaturedTourList = () => {
  const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);

  if (loading) return <Spinner color="primary" />;

  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      {
        featuredTours?.map(tour => (
          <Col lg="3" className='mb-4' md="6" sm="6" key={tour.id}>
            <TourCard tour={tour} />
          </Col>
        ))
      }
    </>
  );
}

export default FeaturedTourList;
