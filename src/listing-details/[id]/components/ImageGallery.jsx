import React from 'react'

function ImageGallery({ carDetail }) {
    return (
        <div>
            <img src={carDetail?.images[0].imageUrl} alt="car" className='w-full h-[500px] rounded-lg object-cover' />
        </div>
    )
}

export default ImageGallery