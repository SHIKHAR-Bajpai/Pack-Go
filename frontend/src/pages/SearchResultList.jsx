import React, { useState } from 'react'
import CommonSection from '../components/shared/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import TourCard from '../components/shared/TourCard'

const SearchResultList = () => {
  const location = useLocation()
  const [data] = useState(location.state)
  return (
    <>
      <CommonSection title={"Tours Search Result"} />
      <section>
        <Container>
          <Row className='mt-5'>
            { data.length === 0 ? (<h4 className='text-center'>No tour Found</h4>) : (data?.map(tour => <Col lg="3" className='mb-4' key={tour._id}><TourCard tour={tour} /></Col>))}
          </Row>
        </Container>
      </section>
    </> 
  )
}

export default SearchResultList