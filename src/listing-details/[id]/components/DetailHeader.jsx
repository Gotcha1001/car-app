// import React from 'react'
// import { FaRegCalendarAlt } from "react-icons/fa";
// import { IoSpeedometerOutline } from "react-icons/io5";
// import { GiGearStickPattern } from "react-icons/gi";
// import { RiGasStationFill } from "react-icons/ri";

// function DetailHeader({ carDetail }) {
//     return (
//         <div>
//             {carDetail?.tagLine ? <div>
//                 <h2 className='font-bold text-3xl'>{carDetail?.listingTitle}</h2>
//                 <p className='text-sm'>{carDetail?.tagLine}</p>
//                 <div className='flex gap-4 mt-3'>
//                     <div className='flex gap-2 items-center bg-blue-100 rounded-full p-2 px-3'>
//                         <FaRegCalendarAlt className='h-7 w-7 text-indigo-500' />
//                         <h2 className='text-indigo-500 text-sm'>{carDetail?.year}</h2>
//                     </div>
//                     <div className='flex gap-2 items-center bg-blue-100 rounded-full p-2 px-3'>
//                         <IoSpeedometerOutline className='h-7 w-7 text-indigo-500' />
//                         <h2 className='text-indigo-500 text-sm'>{carDetail?.mileage}</h2>
//                     </div>
//                     <div className='flex gap-2 items-center bg-blue-100 rounded-full p-2 px-3'>
//                         <GiGearStickPattern className='h-7 w-7 text-indigo-500' />
//                         <h2 className='text-indigo-500 text-sm'>{carDetail?.transmission}</h2>
//                     </div>
//                     <div className='flex gap-2 items-center bg-blue-100 rounded-full p-2 px-3'>
//                         <RiGasStationFill className='h-7 w-7 text-indigo-500' />
//                         <h2 className='text-indigo-500 text-sm'>{carDetail?.fuelType}</h2>
//                     </div>
//                 </div>
//             </div> :
//                 <div className='w-full rounded-xl h-[100px] bg-slate-300 animate-pulse'>

//                 </div>}
//         </div>
//     )
// }

// export default DetailHeader




import React from 'react'
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { GiGearStickPattern } from "react-icons/gi";
import { RiGasStationFill } from "react-icons/ri";

function DetailHeader({ carDetail }) {
    return (
        <div>
            <div>
                <h2 className='font-bold text-3xl'>{carDetail?.listingTitle}</h2>
                <p className='text-sm'>{carDetail?.tagLine}</p>
                <div className='flex gap-4 mt-3'>
                    <div className='flex gap-2 items-center bg-blue-100 rounded-full p-2 px-3'>
                        <FaRegCalendarAlt className='h-7 w-7 text-indigo-500' />
                        <h2 className='text-indigo-500 text-sm'>{carDetail?.year}</h2>
                    </div>
                    <div className='flex gap-2 items-center bg-blue-100 rounded-full p-2 px-3'>
                        <IoSpeedometerOutline className='h-7 w-7 text-indigo-500' />
                        <h2 className='text-indigo-500 text-sm'>{carDetail?.mileage}</h2>
                    </div>
                    <div className='flex gap-2 items-center bg-blue-100 rounded-full p-2 px-3'>
                        <GiGearStickPattern className='h-7 w-7 text-indigo-500' />
                        <h2 className='text-indigo-500 text-sm'>{carDetail?.transmission}</h2>
                    </div>
                    <div className='flex gap-2 items-center bg-blue-100 rounded-full p-2 px-3'>
                        <RiGasStationFill className='h-7 w-7 text-indigo-500' />
                        <h2 className='text-indigo-500 text-sm'>{carDetail?.fuelType}</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DetailHeader