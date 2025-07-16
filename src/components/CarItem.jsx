import React from 'react'
import { Separator } from './ui/separator'
import { BsFuelPump } from "react-icons/bs";
import { BsSpeedometer } from "react-icons/bs";
import { TbManualGearboxFilled } from "react-icons/tb";
import { IoIosOpen } from "react-icons/io";
import { Link } from 'react-router-dom';


function CarItem({ car }) {


    return (
        <Link to={'/listing-detail/' + car?.id}>

            <div className='border rounded-xl bg-gray-200 cursor-pointer hover:scale-105 transition-all ease-in-out'>
                <h2 className='absolute m-2 bg-green-500 p-1 rounded-full text-sm pb-1 text-white'>New</h2>
                <img src={car?.images[0]?.imageUrl} alt="image" height={400} width={'100%'} className='rounded-t-xl  mx-auto h-[200px] object-cover' />
                <div className='p-4'>
                    <h2 className='font-bold text-black text-lg mb-2'>{car?.listingTitle}</h2>
                    <Separator />
                    <div className='grid grid-cols-3 mt-5 border p-2 rounded-lg'>
                        <div className='flex flex-col items-center'>
                            <BsFuelPump className='text-lg mb-2' />
                            <h2>{car?.mileage} Miles</h2>
                        </div>
                        <div className='flex flex-col items-center'>
                            <BsSpeedometer className='text-lg mb-2' />
                            <h2>{car?.fuelType}</h2>
                        </div>
                        <div className='flex flex-col items-center'>
                            <TbManualGearboxFilled className='text-lg mb-2' />
                            <h2>{car?.transmission}</h2>
                        </div>
                    </div>
                    <Separator className="my-2" />
                    <div className='flex items-center justify-between'>
                        <h2 className='font-bold text-xl'>R {car?.sellingPrice}</h2>
                        <h2 className='text-sm flex gap-2 items-center'>
                            View Details
                            <IoIosOpen />
                        </h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CarItem