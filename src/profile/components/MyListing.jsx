// import { Button } from '@/components/ui/button'
// import { useUser } from '@clerk/clerk-react'
// import { db } from '../../../configs'
// import { CarImages, CarListing } from '../../../configs/schema'
// import { desc, eq } from 'drizzle-orm'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { FormatResult } from '@/Shared/Service'
// import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
// import CarItem from '@/components/CarItem'
// import { FaTrashAlt } from "react-icons/fa";

// function MyListing() {

//     const { user } = useUser()
//     const [carList, setCarList] = useState([])


//     useEffect(() => {
//         user && GetUserCarListing()
//     }, [user])


//     const GetUserCarListing = async () => {

//         const result = await db.select().from(CarListing)
//             .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
//             .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
//             .orderBy(desc(CarListing.id))

//         const resp = FormatResult(result)
//         console.log("Result:", resp)
//         setCarList(resp)
//     }


//     return (
//         <div className='mt-6'>
//             <div className='flex justify-between items-center'>
//                 <h2 className='font-bold text-4xl'>My Listing</h2>
//                 <Link to={'/add-listing'} >
//                     <Button>+ Add New Listing</Button>
//                 </Link>

//             </div>
//             <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-7'>
//                 {carList.map((item, index) => (
//                     <FeatureMotionWrapper index={index} key={index}>
//                         <div>
//                             <CarItem car={item} />
//                             <div className='flex item-center p-2 rounded-lg justify-between bg-gradient-to-t from-purple-900 to-indigo-500 gap-3'>
//                                 <Link className='w-full' to={'/add-listing?mode=edit&id=' + item?.id}>
//                                     <Button className="w-full">Edit</Button>
//                                 </Link>

//                                 <Button variant="destructive"><FaTrashAlt /></Button>
//                             </div>
//                         </div>
//                     </FeatureMotionWrapper>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default MyListing



import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/clerk-react'
import { db } from '../../../configs'
import { CarImages, CarListing } from '../../../configs/schema'
import { desc, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FeatureMotionWrapper from '@/components/FramerMotion/FeatureMotionWrapperMap'
import CarItem from '@/components/CarItem'
import { FaTrashAlt } from "react-icons/fa"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Service from '@/Shared/Service'

function MyListing() {
    const { user } = useUser()
    const [carList, setCarList] = useState([])
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        user && GetUserCarListing()
    }, [user])

    const GetUserCarListing = async () => {
        const result = await db.select().from(CarListing)
            .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(CarListing.id))

        const resp = Service.FormatResult(result)
        console.log("Result:", resp)
        setCarList(resp)
    }

    const handleDeleteListing = async (carId) => {
        setIsDeleting(true)
        try {
            // Delete related car images first (foreign key constraint)
            await db.delete(CarImages).where(eq(CarImages.carListingId, carId))

            // Then delete the car listing
            await db.delete(CarListing).where(eq(CarListing.id, carId))

            // Update local state to remove the deleted item
            setCarList(carList.filter(car => car.id !== carId))

            console.log("Car listing deleted successfully")
        } catch (error) {
            console.error("Error deleting car listing:", error)
            // You might want to show a toast notification here
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className='mt-6'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-4xl'>My Listing</h2>
                <Link to={'/add-listing'} >
                    <Button>+ Add New Listing</Button>
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-7'>
                {carList.map((item, index) => (
                    <FeatureMotionWrapper index={index} key={index}>
                        <div>
                            <CarItem car={item} />
                            <div className='flex item-center p-2 rounded-lg justify-between bg-gradient-to-t from-purple-900 to-indigo-500 gap-3'>
                                <Link className='w-full' to={'/add-listing?mode=edit&id=' + item?.id}>
                                    <Button className="w-full">Edit</Button>
                                </Link>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" disabled={isDeleting}>
                                            <FaTrashAlt />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your car listing
                                                and remove all associated data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => handleDeleteListing(item.id)}
                                                className="bg-red-600 hover:bg-red-700"
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? "Deleting..." : "Delete"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </FeatureMotionWrapper>
                ))}
            </div>
        </div>
    )
}

export default MyListing