
import { db } from '../../configs';
import { CarImages, CarListing } from '../../configs/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '@/components/Header';
import Search from '@/components/Search';
import CarItem from '@/components/CarItem';
import Service from '@/Shared/Service';

function SearchByOptions() {

    const [searchParam] = useSearchParams()

    const condition = searchParam.get('cars');
    const make = searchParam.get('make');
    const price = searchParam.get('price')

    const [carList, setCarList] = useState([])

    console.log("Values:", condition, make, price)

    useEffect(() => {
        GetCarList()
    }, [])

    const GetCarList = async () => {
        const result = await db.select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(condition != undefined && eq(CarListing.condition, condition))
            .where(make != undefined && eq(CarListing.make, make))

        setCarList(resp)


        const resp = Service.FormatResult(result)
        console.log("GETCAR:", resp)
    }

    return (
        <div>
            <Header />

            <div className='p-16 bg-slate-500 flex justify-center'>
                <Search />
            </div>
            <div className='p-10 md:px-20'>
                <h2 className='font-bold text-4xl '>Search Result</h2>

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

export default SearchByOptions