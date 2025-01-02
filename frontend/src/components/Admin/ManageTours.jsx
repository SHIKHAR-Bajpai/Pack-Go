import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import './ManageTours.css';
import { BASE_URL } from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';

const ManageTours = () => {
  const [addTourData, setAddTourData] = useState({
    title: '',
    city: '',
    country: '',
    photo: null,
    desc: '',
    price: '',
    maxGroupSize: '',
    featured: false,
  });
  
  const [tourIdToDelete, setTourIdToDelete] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useContext(AuthContext);
  const token = user?.token;

  const handleAddInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddTourData({
      ...addTourData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddFileChange = (e) => {
    setAddTourData({
      ...addTourData,
      photo: e.target.files[0]
    });
  };

  const handleAddTour = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    Object.keys(addTourData).forEach((key) => formData.append(key, addTourData[key]));

    try {
      const response = await fetch(`${BASE_URL}/tours`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Tour Added Successfully:", data);
      } else {
        console.error("Failed to add tour");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setAddTourData({
      title: '',
      city: '',
      country: '',
      photo: null,
      desc: '',
      price: '',
      maxGroupSize: '',
      featured: false,
    });
    setIsSubmitting(false);
  };

  const handleDeleteTour = async (e) => {
    e.preventDefault();
    if (!tourIdToDelete) {
      alert("Please enter a Tour ID to delete.");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${BASE_URL}/tours/${tourIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Tour Deleted Successfully:", data);
        setTourIdToDelete(''); 
      } else {
        console.error("Failed to delete tour");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="manage-tours">
      <Container>
        <Row>
          <Col lg="12" className='pt-5 text-center'>
            <h1 className="heading">Admin Dashboard</h1>
          </Col>
        </Row>

        <Row className="pt-5">
          <Col lg="8" className="mx-auto">
            <h3>Add Tour</h3>
            <Form onSubmit={handleAddTour} encType="multipart/form-data">
              <FormGroup>
                <Input
                  type="text"
                  name="title"
                  placeholder="Tour Title"
                  value={addTourData.title}
                  onChange={handleAddInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={addTourData.city}
                  onChange={handleAddInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={addTourData.country}
                  onChange={handleAddInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="file"
                  name="photo"
                  onChange={handleAddFileChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="desc"
                  placeholder="Tour Description"
                  value={addTourData.desc}
                  onChange={handleAddInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={addTourData.price}
                  onChange={handleAddInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  name="maxGroupSize"
                  placeholder="Max Group Size"
                  value={addTourData.maxGroupSize}
                  onChange={handleAddInputChange}
                  required
                />
              </FormGroup>
              <FormGroup check>
                <Input
                  type="checkbox"
                  name="featured"
                  checked={addTourData.featured}
                  onChange={handleAddInputChange}
                />
                <label>Featured</label>
              </FormGroup>
              <Button type="submit" color="primary" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Add Tour"}
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Delete Tour Section */}
        <Row className="pt-5">
          <Col lg="8" className="mx-auto">
            <h3>Delete Tour</h3>
            <Form onSubmit={handleDeleteTour}>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Tour ID"
                  value={tourIdToDelete}
                  onChange={(e) => setTourIdToDelete(e.target.value)}
                  required
                />
              </FormGroup>
              <Button type="submit" color="danger" disabled={isSubmitting}>
                {isSubmitting ? "Deleting..." : "Delete Tour"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ManageTours;
