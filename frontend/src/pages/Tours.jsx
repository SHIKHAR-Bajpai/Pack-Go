import React, { useState, useEffect, useContext } from 'react';
import CommonSection from '../components/shared/CommonSection';
import "../styles/tours.css";
import { Row, Container, Col } from 'reactstrap';
import TourCard from '../components/shared/TourCard';
import SearchBar from '../components/shared/SearchBar';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import { AuthContext } from '../context/AuthContext';
import ReactSlider from 'react-slider';
import '../styles/slider.css'; 

const Tours = () => {
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const [tours, setTours] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [ratingFilter, setRatingFilter] = useState(0);

    const { data: fetchedTours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
    const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);
    const { data: minpriceData } = useFetch(`${BASE_URL}/tours/search/getMinPrice`);
    const { data: maxpriceData } = useFetch(`${BASE_URL}/tours/search/getMaxPrice`);
    
    
    const { user } = useContext(AuthContext);
    const token = user?.token;

    const isAdmin = user?.role; 

    useEffect(() => {
        const pages = Math.ceil(tourCount / 8);
        setPageCount(pages);
        setTours(fetchedTours || []);
        window.scrollTo(0, 0);
    }, [page, tourCount, fetchedTours]);

    useEffect(() => {
        if (minpriceData && maxpriceData) {
            setPriceRange([minpriceData || 0, maxpriceData || 1000]);
        }
    }, [minpriceData, maxpriceData]);

    const filteredTours = tours?.filter(tour => {
      const avgRating = tour.reviews.length === 0 ? 0 : tour.reviews.reduce((acc, review) => acc + review.rating, 0) / tour.reviews.length;
      return tour.price >= priceRange[0] && tour.price <= priceRange[1] && avgRating >= ratingFilter;
    });

    const handleDragStart = (e, index) => {
        if (isAdmin === 'user') return;
        e.dataTransfer.setData("tourIndex", index);
    };

    const handleDrop = (e, dropIndex) => {
        
      if (isAdmin === 'user') return;

        const dragIndex = e.dataTransfer.getData("tourIndex");
        const updatedTours = [...tours];

        const [draggedTour] = updatedTours.splice(dragIndex, 1);
        updatedTours.splice(dropIndex, 0, draggedTour);

        setTours(updatedTours);

        const orderData = updatedTours.map((tour, index) => ({
            _id: tour._id,
            order: index
        }));

        fetch(`${BASE_URL}/tours/updateOrder`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDragOver = (e) => {
        if (isAdmin) e.preventDefault();
    };

    return (
        <>
            <CommonSection title={"All Tours"} />
            <section>
                <Container>
                    <Row>
                        <SearchBar />
                    </Row>
                </Container>
            </section>

            <section className='pt-5'>
                <Container>
                    <div className="filters">
                        <div className="price-filter">
                            <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                            <ReactSlider
                                className="slider"
                                thumbClassName="thumb"
                                trackClassName="track"
                                min={minpriceData || 0}
                                max={maxpriceData || 1000}
                                value={priceRange}
                                onChange={(newValue) => setPriceRange(newValue)}
                                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            />
                        </div>

                        <div className="rating-filter">
                            <label>Minimum Rating: {ratingFilter} Stars</label>
                            <ReactSlider
                                className="slider"
                                thumbClassName="thumb"
                                trackClassName="track"
                                min={0}
                                max={5}
                                step={0.5}
                                value={ratingFilter}
                                onChange={setRatingFilter}
                                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                            />
                        </div>
                    </div>

                    {loading && <h4 className='text-center pt-5'>Loading .......</h4>}
                    {error && <h4 className='text-center pt-5'>{error}</h4>}
                    {!loading && !error && (
                        <Row>
                            {filteredTours?.map((tour, index) => (
                                <Col lg="3" md="6" sm="6" className='mb-4' key={tour._id}
                                    draggable={isAdmin}
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index)}
                                >
                                    <TourCard tour={tour} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            </section>
        </>
    );
};

export default Tours;
