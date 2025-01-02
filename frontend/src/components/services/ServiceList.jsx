import React from 'react'
import { Col } from 'reactstrap'
import "./Service-Card.css"

const ServiceData = [
    {
        imgUrl: 'https://res.cloudinary.com/dmrugchjk/image/upload/v1729627187/weather_qr4mal.png',
        title: "Explore Weather Patterns",
        desc: "Uncover the diverse weather conditions that impact your travels. From tropical climates to arid deserts, learn how different weather types affect your journey and stay prepared for every destination."
    },
    {
        imgUrl: 'https://res.cloudinary.com/dmrugchjk/image/upload/v1729627189/guide_w82kbk.png',
        title: "Top Travel Guides",
        desc: "Find the best travel guides to enhance your adventures. Whether you're exploring new cities or places, our recommendations ensure you have expert insights and local tips for an unforgettable journey."
    },
    {
        imgUrl: 'https://res.cloudinary.com/dmrugchjk/image/upload/v1729627191/customization_sr6jsx.png',
        title: "Personalized Travel Plans",
        desc: "Tailor your travel experiences with our customized plans. From personalized itineraries to unique recommendations, get the flexibility and insights you need to make every trip truly your own."
    },
]

const ServiceList = () => {
    const ServiceCard = ({ imgUrl, title, desc }) => (
        <div className='service__item'>
            <div className='service__img'>
                <img src={imgUrl} alt="" />
            </div>
            <h5>{title}</h5>
            <p>{desc}</p>
        </div>
    )

    return (
        <>
            {ServiceData.map((item, index) => (
                    <Col lg="3" md="6" sm="12" className='mb-4' key={index}>
                        {ServiceCard(item)}
                    </Col>))
            }
        </>
    )
}

export default ServiceList
