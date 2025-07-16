import React from 'react'

function Description({ carDetail }) {
    return (
        <div>

            <div className='p-10 rounded-xl gradient-background2 shadow-lg mt-6 border border-indigo-500'>
                <h2 className='text-white text-2xl font-medium'>Description</h2>
                <p className='text-white'>{carDetail?.listingDescription}</p>
            </div>
        </div>
    )
}

export default Description