import React from 'react'
import MotionWrapperDelay from '../FramerMotion/MotionWrapperDelay'
import { Button } from '../ui/button'

function Hero() {
    return (
        <div className='flex flex-col item-center  gap-9'>
            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                variants={{
                    hidden: { opacity: 0, y: -100 },
                    visible: { opacity: 1, y: 0 },
                }}
            >      <h1 className='font-extrabold text-[50px] text-center mt-16 text-[#231f89]'>
                    <MotionWrapperDelay
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.9, delay: 0.8 }}
                        variants={{
                            hidden: { opacity: 0, x: -100 },
                            visible: { opacity: 1, x: 0 },
                        }}
                    >  <span className='text-[#6a50df]'>Discover Your Next Advneture With AI:</span> </MotionWrapperDelay>
                    Peronsalized Itineraries At Your Fingertips</h1></MotionWrapperDelay>

            <MotionWrapperDelay
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.9, delay: 0.8 }}
                variants={{
                    hidden: { opacity: 0, x: -100 },
                    visible: { opacity: 1, x: 0 },
                }}
            >  <p className='text-xl text-gray-500 text-center'>Your Personal Trip Planner And Travel Curator, Creating Custom Itinaries Tailored To Your Interests And Budget</p> </MotionWrapperDelay>

            <div className="flex flex-col items-center  gap-9">
                <Button variant="sex2" className="w-full mb-10 sm:w-auto px-6 py-3">
                    Get Started, It's Free
                </Button>
            </div>



        </div>
    )
}

export default Hero