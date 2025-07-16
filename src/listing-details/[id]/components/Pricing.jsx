import { Button } from '@/components/ui/button'
import React from 'react'
import { MdOutlineLocalOffer } from "react-icons/md";

function Pricing({ carDetail }) {
    return (
        <div className='p-10 rounded-xl border shadow-lg '>
            <h2>Our Price</h2>
            <h2 className='font-bold text-4xl'>R {carDetail?.sellingPrice}</h2>
            <Button className="mt-4 w-full" size="lg"><MdOutlineLocalOffer className='text-2xl mr-2' />Make An Offer Price</Button>
        </div>
    )
}

export default Pricing