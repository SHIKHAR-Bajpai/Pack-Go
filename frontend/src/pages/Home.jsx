import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import '../styles/home.css'
import ServiceList from '../components/services/ServiceList'
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../components/Image-gallery/ImagesGallery'
import Testimonials from '../components/Testimonial/Testimonials'


const SectionTitle = ({ title, subtitle }) => (
  <>
    <h2 className='subtitle'>{title}</h2>
    {subtitle && <h4 className='title mt-4'>{subtitle}</h4>}
  </>
)

const MainContent = () => (
  <Col lg="6">
    <div className='main__content'>
      <h2 className='subtitle'>What we Are</h2>
      <h1>
        Discovering new places creates unforgettable{" "}
        <span className='highlight'>memories</span>
      </h1>
      <p>
        Welcome to Pack & Go, where each journey is a step towards creating something truly unforgettable. Explore stunning destinations, benefit from expert travel advice, and immerse yourself in experiences that make every trip exceptional. Whether you're searching for peaceful retreats or thrilling escapades, we have the perfect guide for every explorer. Let us be your partner in crafting memories that will stay with you forever. Your next unforgettable adventure begins now!
      </p>
    </div>
  </Col>
)

const MainImageBox = () => (
  <>
    <Col lg="2">
      <div className='main__img-box'>
        <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626676/main-img01_hw6cyy.jpg' alt="mainimg" />
      </div>
    </Col>
    <Col lg="2">
      <div className='main__img-box main__video-box mt-4'>
        <video src='https://res.cloudinary.com/dmrugchjk/video/upload/v1729626585/main-video_spnzik.mp4' alt="mainvideo" controls />
      </div>
    </Col>
    <Col lg="2">
      <div className='main__img-box mt-5'>
        <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626679/main-img02_f74wdi.jpg' alt="mainimg" />
      </div>
    </Col>
  </>
)

const CounterBox = ({ count, label }) => (
  <div className="counter__box">
    <span>{count}</span>
    <h6>{label}</h6>
  </div>
)

const Home = () => {
  return (
    <>
      <section className='main'>
        <Container>
          <Row>
            <MainContent />
            <MainImageBox />
          </Row>
        </Container>
      </section>

      <section className='main'>
        <Container>
          <Row>
            <Col lg="3">
              <SectionTitle title="What we Serve" />
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className='mb-4'>
              <SectionTitle title="Featured Tours" />
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row className="align-items-center my-4">
            <Col lg="6">
              <div className='experience__content'>
                  <SectionTitle title="Experience" subtitle="With Our Extensive Experience" />
                  <p>
                    Over the years, we've proudly served countless clients, delivering exceptional experiences and building lasting relationships. Our dedication to excellence is reflected in the milestones we've achieved:
                  </p>

                  <div className="counter__wrapper d-flex align-items-center gap-5">
                    <CounterBox count="12k+" label="Successful Trips" />
                    <CounterBox count="2k+" label="Regular Clients" />
                    <CounterBox count="15" label="Years Experience" />
                  </div>
              </div>
            </Col>

            <Col lg="6">
              <div className='experience__img text-right'>
                <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626931/experience_g44uf7.png' alt="Experience" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      

      <section>
        <Container>
          <Row>
            <Col lg="12" className='mb-4'>
              <SectionTitle title="Customer Gallery" />
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className='mt-5'>
              <SectionTitle title="Testimonials" subtitle="What our fans say about us" />
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home
