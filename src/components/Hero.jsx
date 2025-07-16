import React from 'react'
import Search from './Search'
import MotionWrapperDelay from './FramerMotion/MotionWrapperDelay'

function Hero() {
    return (
        <div>
            <div className='flex flex-col items-center p-10 py-20 gap-6 h-[650px] w-full bg-gradient-to-r from-blue-500 to-purple-700 text-white'>
                <h2 className='text-lg'>Find Cars For Sale And For Rent Near You</h2>
                <h2 className='text-[60px] font-bold'>Find Your Dream Car</h2>
                <Search />
                <MotionWrapperDelay
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >  <img src="/car1.png" alt="car" height={350} width={350} /></MotionWrapperDelay>

            </div>

        </div>
    )
}

export default Hero