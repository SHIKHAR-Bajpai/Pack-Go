import React from 'react';
import "./Footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faXTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faBuilding, faLink } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const year = new Date().getFullYear();

  const company = [
    { path: '/Blog', display: "Blog" },
    { path: '/privacypolicy', display: "Privacy Policy" },
    { path: '/FAQs', display: "FAQ's" },
    { path: '/contac', display: "Contact" }
  ];

  const quickLinks = [
    { path: '/Home', display: "Home" },
    { path: '/tours', display: "Tour" },
    { path: '/about', display: "About" },
    { path: '/gallery', display: "Gallery" }
  ];

  return (
    <footer className='footer pt-5 mt-5 pb-2'>
      <Container>
        <Row>
          <Col lg="3">
            <div className='logo'>
              <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626662/logo_nxjrps.png' alt="Pack and Go Logo" />
              <p className='mx-2 my-4'>
                <b>Crafting exceptional journeys for you</b>
              </p>
            </div>
          </Col>

          <Col lg="3">
            <div className='company'>
              <h5 className='footer-links-title d-flex gap-2 align-items-center'>
                <FontAwesomeIcon icon={faBuilding} />
                <b>Company</b>
              </h5>
              <ListGroup className='quick-links'>
                {company.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3">
            <div className='links'>
              <h5 className='footer-links-title d-flex gap-2 align-items-center'>
                <FontAwesomeIcon icon={faLink} />
                <b>Quick Links</b>
              </h5>
              <ListGroup className='quick-links'>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3">
            <div className='contacts'>
              <h5 className='footer-links-title d-flex gap-2 align-items-center'>
                <FontAwesomeIcon icon={faEnvelope} />
                <b>Contact</b>
              </h5>
              <ListGroup className='contact-links'>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <div className='mb-0'>
                    <h6 className='mb-0 d-flex align-items-center gap-2'>
                      <span><i className="ri-map-pin-line"></i></span><b>Address:</b>
                    </h6>
                    <span>24, Nehru Place, Block B, 4th Floor, New Delhi, Delhi, 110019, India</span>
                  </div>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <h6 className='mb-0 d-flex align-items-center gap-2'>
                    <span><i className="ri-mail-line"></i></span><b>Email:</b>
                  </h6>
                  <p className='mb-0'>packandGo@gmail.com</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <h6 className='mb-0 d-flex align-items-center gap-2'>
                    <span><i className="ri-phone-line"></i></span><b>Phone:</b>
                  </h6>
                  <p className='mb-0'>+91-8755094484</p>
                </ListGroupItem>

                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-4 mt-2'>
                  <div>
                    <h3 className='mt-2'><strong>Socials</strong></h3>
                  </div>
                  <div className='socials d-flex align-items-center gap-4'>
                    <span><Link to="#"><FontAwesomeIcon icon={faXTwitter} size="2x" /></Link></span>
                    <span><Link to="#"><FontAwesomeIcon icon={faInstagram} size="2x" /></Link></span>
                    <span><Link to="#"><FontAwesomeIcon icon={faFacebookF} size="2x" /></Link></span>
                    <span><Link to="#"><FontAwesomeIcon icon={faYoutube} size="2x" /></Link></span>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>

          <Col lg="12" className='text-center pt-4 pb-2'>
            <p className='copyright'><b>Copyright {year} • All rights reserved •</b></p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
