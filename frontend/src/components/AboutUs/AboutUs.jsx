import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './About.css';

const About = () => {
  return (
    <section className="about__section">
      <Container>
        <Row>
          <Col lg="12" className="text-center mb-5">
            <h1>About Us</h1>
          </Col>
          <Col lg="12">
            <div className="about__content">
              <h2>Welcome to Pack & Go</h2>
              <p>
                At <strong>Pack & Go</strong>, we believe that every journey has the power to transform lives. Founded with a passion for exploration and a dedication to providing exceptional travel experiences, we have grown into a trusted partner for travelers around the world. Our mission is to make your dream vacations a reality, whether you're seeking tranquil getaways, cultural immersions, or thrilling adventures.
              </p>
              
              <h3>Our Story</h3>
              <p>
                <strong>Pack & Go</strong> was established in 2021 by a group of travel enthusiasts who recognized the need for a travel agency that truly understands the desires and needs of modern travelers. From humble beginnings, we've expanded our services to offer a wide range of curated tours, personalized travel planning, and unique experiences that cater to every type of explorer.
              </p>

              <h3>What We Offer</h3>
              <ul>
                <li><strong>Customized Travel Experiences:</strong> We craft personalized itineraries that suit your preferences, budget, and schedule. Whether it's a solo trip, a family vacation, or a corporate retreat, we ensure every detail is taken care of.</li>
                <li><strong>Expert Travel Advice:</strong> Our team of seasoned travel experts provides insights and recommendations that help you make the most of your journey. From hidden gems to popular landmarks, we guide you to the best destinations.</li>
                <li><strong>Seamless Booking:</strong> We offer an easy and convenient booking process, with a range of options from flights and accommodations to local tours and transportation. Our partnerships with leading providers ensure you get the best deals.</li>
                <li><strong>24/7 Support:</strong> Travel with peace of mind knowing that our support team is available around the clock to assist with any questions or issues that may arise during your trip.</li>
              </ul>

              <h3>Our Values</h3>
              <ul>
                <li><strong>Passion for Travel:</strong> We are driven by our love for discovering new places and sharing those experiences with our clients.</li>
                <li><strong>Customer-Centric:</strong> Your satisfaction is our top priority. We listen to your needs and go the extra mile to ensure your travel experience exceeds expectations.</li>
                <li><strong>Sustainability:</strong> We are committed to promoting responsible travel. We work with local communities to create sustainable tourism opportunities that benefit both travelers and the destinations they visit.</li>
              </ul>

              <h3>Why Choose Us?</h3>
              <ul>
                <li><strong>Experienced Team:</strong> Our team of travel professionals has decades of combined experience in the travel industry.</li>
                <li><strong>Global Reach:</strong> We have a vast network of partners and connections worldwide, allowing us to offer unparalleled travel options.</li>
                <li><strong>Personalized Service:</strong> We treat every trip as a unique adventure, offering tailor-made solutions that reflect your personal travel style.</li>
              </ul>

              <h3>Our Vision</h3>
              <p>
                Our vision is to become the world’s most trusted and innovative travel company, known for delivering unforgettable travel experiences that inspire and enrich the lives of our clients.
              </p>

              <h3>Join Us on Your Next Adventure</h3>
              <p>
                Whether you’re dreaming of exploring new cultures, relaxing on pristine beaches, or embarking on a once-in-a-lifetime adventure, <strong>Pack & Go</strong> is here to make it happen. Let’s create memories that you’ll cherish forever.
              </p>
              <p><strong>Contact us</strong> today and start planning your next great escape with <strong>Pack & Go</strong>!</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
