import React, { useRef } from 'react';
import './SearchBar.css';
import { Col, Form, FormGroup } from 'reactstrap';
import { BASE_URL } from '../../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const locationRef = useRef('');
  const navigate = useNavigate();

  const searchHandler = async (event) => {
    event.preventDefault();
    const location = locationRef.current.value;
    console.log(location);
    if (location === "") {
      return alert("Please enter a location");
    }

    try {
      const res = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}`);

      if (!res.ok) {
        return alert('Entered location not found');
      }

      const result = await res.json();

      if (result && result.data) {
        navigate(`/tours/search?city=${location}`, { state: result.data });
      } else {
        alert('No tours found for the specified location');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <Col lg="12">
      <div className='search__bar'>

        <Form className='d-flex align-items-center gao-4' onSubmit = {searchHandler } >
          <FormGroup className='d-flex gap-3 form__group form__group-fast'>
            <span><i className='ri-map-pin-line'></i></span>
            <div>
              <h6>Location</h6>
              <input type="text" placeholder='Where are you going?' ref={locationRef} />
            </div>
          </FormGroup>

          <button type="submit" className='search__icon'  style={{ border: 'none', borderRadius: '50%' }}>
            <i className='ri-search-line'></i>
          </button>
        </Form>
        
      </div>
    </Col>
  );
};

export default SearchBar;

