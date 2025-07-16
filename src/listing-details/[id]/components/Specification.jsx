import IconField from '@/add-listing/components/IconField'
import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
import CarSpecification from '@/Shared/CarSpecification'
import React from 'react'

function Specification({ carDetail }) {
    console.log(carDetail)
    return (
        <div className='p-10 rounded-xl border shadow-md mt-7'>
            <h2 className='text-2xl font-medium text-center gradient-title'>Specifications</h2>

            {CarSpecification.map((item, index) => (
                <FeatureMotionWrapper index={index} key={index}>

                    <div className='mt-2 flex items-center justify-between'>

                        <h2 className='flex gap-3'>  <IconField icon={item.icon} /> {item.label}</h2>
                        <h2>{carDetail?.[item?.name]}</h2>
                    </div>
                </FeatureMotionWrapper>

            ))}
            {/* {carDetail?.length > 0 && carDetail.map((carItem, index) => (
                <FeatureMotionWrapper key={index} index={index}>
                    <div>
                        <IconField icon={CarSpecification[index].icon} />
                    </div>

                </FeatureMotionWrapper>
            ))} */}
        </div>
    )
}

export default Specification