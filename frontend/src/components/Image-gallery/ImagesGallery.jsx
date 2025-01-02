import React from 'react'
import  Masonry,{ResponsiveMasonry} from "react-responsive-masonry"
import galleryImages from './ImageGallery'


const MasonryImagesGallery = () => {
  return (
     <ResponsiveMasonry columnsCountBreakPoints={{480:1,768:2 ,992:3}}>
        <Masonry gutter='1.2rem'className='px-4' >
           {
            galleryImages.map((item,index)=>(
                <img  className="mesonry__img"src={item} key={index} alt='' style={{width:"98%",display:"block",borderRadius:"10px"}} />
            ))
           }
        </Masonry>
     </ResponsiveMasonry>
  )
}

export default MasonryImagesGallery