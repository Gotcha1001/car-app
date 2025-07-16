import Header from '@/components/Header'
import Search from '@/components/Search'
import { db } from '../../../configs'
import { CarImages, CarListing } from '../../../configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import CarItem from '@/components/CarItem'
import Service from '@/Shared/Service'

function SearchByCategory() {

    const { category } = useParams()
    const [carList, setCarList] = useState([])
    console.log("Params:", category)


    useEffect(() => {
        GetCarList()
    }, [])

    const GetCarList = async () => {
        const result = await db.select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.category, category))

        const resp = Service.FormatResult(result)
        setCarList(resp)

    }

    return (
        <div>
            <Header />

            <div className='p-16 bg-black flex justify-center'>
                <Search />
            </div>
            <div className='p-10 md:px-20'>
                <h2 className='font-bold text-4xl '>{category}</h2>

                {/* List of CarList */}
                <div className='mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    {carList?.length > 0 ? carList.map((item, index) => (
                        <div key={index}>
                            <CarItem car={item} />
                        </div>
                    )) :
                        [1, 2, 3, 4, 5].map((item, index) => (
                            <div className='h-[370px] rounded-xl bg-slate-300 animate-pulse'>

                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default SearchByCategory