import React from 'react'
import Slider from 'react-slick'

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 786,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
    }
    return (
        
        <Slider {...settings} style={{width:"95%"}}>

            <div className='testimonial py-4 px-3'>
                <p className='text-justify'>
                    <i>
                    "Pack & Go made our dream vacation a reality! From the moment we booked until the end of our trip, everything was seamless. The destinations they recommended were breathtaking, and the personalized service exceeded our expectations. We created memories that will last a lifetime, and we can't wait to book our next adventure with them!"
                    </i>
                </p>

                <div className='d-flex align-items-center gap-4 mt-4 pt-1'>
                    <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626604/ava-1_c3ots6.jpg' className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h4 className='mb-1 mt-3'>John Doe</h4>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className='testimonial py-4 px-3'>
                <p className='text-justify'>
                    <i>
                        "Our family vacation was a dream come true thanks to Pack & Go. The team was so accommodating to our needs and preferences, ensuring everyone had a fantastic time. The kids loved the activities, and we appreciated the hassle-free planning. We made memories that will last forever.<br/> Thank you, Pack & Go!"
                    </i>
                </p>         

                <div className='d-flex align-items-center gap-4 mt-4 pt-1'>
                    <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626593/ava-2_t8f5gf.jpg' className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h4 className='mb-1 mt-3'>Emily Smith </h4>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className='testimonial py-4 px-3'>
                <p className='text-justify'>
                    <i>
                        "As someone who loves exploring new places, I was thrilled with the variety of tours offered by Pack & Go. Their team was incredibly knowledgeable and always available to answer any questions.
                        <br/>The trip was perfectly organized, and I felt well taken care of throughout. This was my best vacation yet, and I owe it all to Pack & Go!"
                    </i>
                </p>
                <div className='d-flex align-items-center gap-4 mt-4'>
                    <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626590/ava-3_lxltay.jpg' className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h4 className='mb-1 mt-3'>Michael Johnson</h4>
                        <p>Customer</p>
                    </div>
                </div>
            </div>

            <div className='testimonial py-4 px-3'>
                <p className='text-justify'>
                    <i>
                    "Traveling with Pack & Go was an absolute delight. The professionalism and passion they bring to their service are evident in every detail. From the picturesque destinations to the seamless logistics, everything was perfect. This company truly knows how to create memorable experiences, and I wouldn’t travel with anyone else!"   
                    </i>
                </p>
                <div className='d-flex align-items-center gap-4 mt-4 pt-1'>
                    <img src='https://res.cloudinary.com/dmrugchjk/image/upload/v1729626573/ava-4_jmlqhh.jpg' className='w-25 h-25 rounded-2' alt="" />
                    <div>
                        <h4 className='mb-1 mt-3'>Sarah Williams </h4>
                        <p>Customer</p>
                    </div>
                </div>
            </div>    

        </Slider>
    )
}

export default Testimonials