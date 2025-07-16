import MotionWrapperDelay from '@/components/FramerMotion/MotionWrapperDelay'
import { Button } from '@/components/ui/button'
import Service from '@/Shared/Service'
import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function OwnersDetail({ carDetail }) {

    const { user } = useUser()

    const navigation = useNavigate()

    const OnMessageOwnerButtonClick = async () => {
        //Create Current User ID
        const userId = user.primaryEmailAddress.emailAddress.split('@')[0];
        const ownerUserId = carDetail?.createdBy.split('@')[0];
        try {

            await Service.CreateSendBirdUser(userId, user?.fullName, user?.imageUrl)
                .then(resp => {
                    console.log("Message:", resp)
                })
        } catch (e) {

        }
        // Owner User ID
        try {

            console.log("OWNER", ownerUserId)
            await Service.CreateSendBirdUser(ownerUserId, carDetail?.userName, carDetail?.userImageUrl)
                .then(resp => {
                    console.log("Message:", resp)
                })
        } catch (e) {

        }

        // Create Channel
        try {
            await Service.CreateSendBirdChannel([userId, ownerUserId], carDetail?.listingTitle)
                .then(resp => {
                    console.log("Channel:", resp)
                    console.log("Channel Created")
                    navigation('/profile')
                })
        } catch (e) {

        }
    }
    return (

        <MotionWrapperDelay
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ amount: 0.2 }}
        >
            <div className='p-10 border rounded-xl shadow-md mt-4 flex flex-col items-center justify-center'>
                <h2 className='gradient-title text-2xl font-bold text-center mb-2'>Owners Details</h2>
                <img src={carDetail?.userImageUrl} alt="Uses Image" className='w-[70px] h-[70px] rounded-full' />
                <h2 className='mt-2 font-bold text-xl'>{carDetail?.userName}</h2>
                <h2 className='mt-2 text-sm'>{carDetail?.createdBy}</h2>
                <Button
                    onClick={OnMessageOwnerButtonClick}
                    className="w-full mt-6">Message Owner</Button>

            </div>

        </MotionWrapperDelay>

    )
}

export default OwnersDetail