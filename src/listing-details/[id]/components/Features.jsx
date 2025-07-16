// import React from 'react'
// import { ImCheckboxChecked } from "react-icons/im";

// function Features({ features }) {

//     console.log("Features:", features)
//     return (
//         <div className='mt-6'>
//             <div className='p-5 bg-white rounded-xl border shadow-md'>
//                 <h2 className='font-medium text-2xl'>Features</h2>
//                 {/* {Object.entries(features).map(([features, value]) => (
//                     <div key={index}>
//                         {features} - {value}

//                     </div>
//                 ))} */}
//             </div>
//         </div>
//     )
// }

// export default Features



import React from 'react';
import { ImCheckboxChecked } from "react-icons/im";

function Features({ features }) {
    console.log("Features:", features);

    if (!features || typeof features !== 'object') {
        return null; // Or return <div>Loading...</div>
    }

    return (
        <div className='mt-6'>
            <div className='p-10 bg-white rounded-xl border shadow-md'>
                <h2 className='font-medium text-2xl'>Features</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
                    {Object.entries(features).map(([key, value], index) => (
                        value && ( // Only show true features
                            <div key={index} className='flex items-center gap-2'>
                                <ImCheckboxChecked className='text-blue-500 text-2xl' />
                                <span className='capitalize'>{key.replace(/([A-Z])/g, ' $1')}</span>

                            </div>
                        )
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Features;
