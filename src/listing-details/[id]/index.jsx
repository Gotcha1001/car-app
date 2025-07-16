// import Header from "@/components/Header";
// import React, { useEffect, useState } from "react";
// import DetailHeader from "./components/DetailHeader";
// import { useParams } from "react-router-dom";
// import { db } from "../../../configs";
// import { CarImages, CarListing } from "../../../configs/schema";
// import { eq } from "drizzle-orm";
// import { FormatResult } from "@/Shared/Service";
// import ImageGallery from "./components/ImageGallery";
// import Description from "./components/Description";
// import Features from "./components/Features";
// import Pricing from "./components/Pricing";
// import Specification from "./components/Specification";
// import OwnersDetail from "./components/ownersDetail";
// import FinancialCalculator from "./components/FinancialCalculator";
// import MostSearchedCar from "@/components/MostSearchedCar";

// function LisingDetail() {

//   const { id } = useParams()
//   const [carDetail, setCarDetail] = useState()


//   useEffect(() => {
//     GetCarDetail()
//   }, [id]) // 👈 re-fetch when the id changes


//   // const GetCarDetail = async () => {
//   //   const result = await db.select().from(CarListing)
//   //     .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
//   //     .where(eq(CarListing.id, id))

//   //   const resp = FormatResult(result)
//   //   console.log("RESPONSE:", resp[0])
//   //   setCarDetail(resp[0])
//   // }


//   const GetCarDetail = async () => {
//     const carId = Number(id);
//     if (isNaN(carId)) return;

//     const result = await db
//       .select()
//       .from(CarListing)
//       .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
//       .where(eq(CarListing.id, carId));

//     const resp = FormatResult(result);
//     console.log("RESPONSE:", resp[0]);
//     setCarDetail(resp[0]);
//   };


//   return <div>
//     <Header />
//     <div className="p-10 md:px-20">
//       {/* Header detail component  */}
//       <DetailHeader carDetail={carDetail} />
//       <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">
//         {/* Left */}

//         <div className="md:col-span-2 ">
//           {/* Image Gallery */}
//           <ImageGallery carDetail={carDetail} />

//           {/* Description */}

//           <Description carDetail={carDetail} />

//           {/* Features List */}
//           <Features features={carDetail?.features} />
//           {/* Financial Calculator */}
//           <FinancialCalculator carDetail={carDetail} />

//         </div>
//         {/* Right */}
//         <div className="">
//           {/* Pricing */}
//           <Pricing carDetail={carDetail} />
//           {/* Car Specification */}
//           <Specification carDetail={carDetail} />

//           {/* Car Properties */}


//           {/* Owners Details */}
//           <OwnersDetail carDetail={carDetail} />
//         </div>
//       </div>
//       <MostSearchedCar />
//     </div>


//   </div>;
// }

// export default LisingDetail;



// import Header from "@/components/Header";
// import React, { useEffect, useState } from "react";
// import DetailHeader from "./components/DetailHeader";
// import { useParams } from "react-router-dom";
// import { db } from "../../../configs";
// import { CarImages, CarListing } from "../../../configs/schema";
// import { eq } from "drizzle-orm";
// import { FormatResult } from "@/Shared/Service";
// import ImageGallery from "./components/ImageGallery";
// import Description from "./components/Description";
// import Features from "./components/Features";
// import Pricing from "./components/Pricing";
// import Specification from "./components/Specification";
// import OwnersDetail from "./components/ownersDetail";
// import FinancialCalculator from "./components/FinancialCalculator";
// import MostSearchedCar from "@/components/MostSearchedCar";

// function LisingDetail() {
//   const { id } = useParams();
//   const [carDetail, setCarDetail] = useState();

//   console.log("🚗 URL param id:", id);

//   useEffect(() => {
//     console.log("🌀 useEffect triggered with id:", id);
//     window.scrollTo(0, 0); // Scroll to top on new car
//     GetCarDetail();
//   }, [id]);

//   const GetCarDetail = async () => {
//     console.log("🔍 Running GetCarDetail with ID:", id);

//     const carId = Number(id);
//     if (isNaN(carId)) {
//       console.warn("❌ Invalid car ID:", id);
//       return;
//     }

//     try {
//       const result = await db
//         .select()
//         .from(CarListing)
//         .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
//         .where(eq(CarListing.id, carId));

//       console.log("📦 Raw DB result:", result);

//       const resp = FormatResult(result);
//       console.log("✅ Formatted result:", resp);

//       setCarDetail(resp[0]);
//     } catch (err) {
//       console.error("❌ DB Error:", err);
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <div className="p-10 md:px-20">
//         {/* Header detail component */}
//         <DetailHeader carDetail={carDetail} />
//         {!carDetail && (
//           <p className="text-red-500 font-semibold text-center mt-5">
//             🚫 No car detail loaded.
//           </p>
//         )}
//         <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">
//           {/* Left Side */}
//           <div className="md:col-span-2">
//             <ImageGallery carDetail={carDetail} />
//             <Description carDetail={carDetail} />
//             <Features features={carDetail?.features} />
//             <FinancialCalculator carDetail={carDetail} />
//           </div>

//           {/* Right Side */}
//           <div>
//             <Pricing carDetail={carDetail} />
//             <Specification carDetail={carDetail} />
//             <OwnersDetail carDetail={carDetail} />
//           </div>
//         </div>

//         {/* Most Searched Car Carousel */}
//         <MostSearchedCar />
//       </div>
//     </div>
//   );
// }

// export default LisingDetail;



import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import DetailHeader from "./components/DetailHeader";
import { useParams } from "react-router-dom";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { eq } from "drizzle-orm";

import ImageGallery from "./components/ImageGallery";
import Description from "./components/Description";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Specification from "./components/Specification";
import OwnersDetail from "./components/OwnersDetail";
import FinancialCalculator from "./components/FinancialCalculator";
import MostSearchedCar from "@/components/MostSearchedCar";
import Service from "@/Shared/Service";

function LisingDetail() {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("🚗 URL param id:", id);

  useEffect(() => {
    console.log("🌀 useEffect triggered with id:", id);
    window.scrollTo(0, 0);
    setCarDetail(null); // Reset state
    setIsLoading(true);
    setError(null);
    GetCarDetail();
    return () => {
      // Cleanup on unmount
      setCarDetail(null);
      setIsLoading(true);
      setError(null);
    };
  }, [id]); // Re-run when id changes

  const GetCarDetail = async () => {
    console.log("🔍 Running GetCarDetail with ID:", id);
    const carId = Number(id);
    if (isNaN(carId)) {
      console.warn("❌ Invalid car ID:", id);
      setError("Invalid car ID");
      setIsLoading(false);
      return;
    }

    try {
      const result = await db
        .select()
        .from(CarListing)
        .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .where(eq(CarListing.id, carId));

      console.log("📦 Raw DB result:", result);

      if (result.length === 0) {
        console.warn("❌ No data found for car ID:", carId);
        setError("No car found for this ID");
        setIsLoading(false);
        return;
      }

      const resp = Service.FormatResult(result);
      console.log("✅ Formatted result:", resp);

      setCarDetail(resp[0]);
      setIsLoading(false);
    } catch (err) {
      console.error("❌ DB Error:", err);
      setError("Failed to load car details");
      setIsLoading(false);
    }
  };

  return (
    <div key={id}> {/* Add key to force re-render */}
      <Header />
      <div className="p-10 md:px-20">
        {isLoading && (
          <p className="text-gray-500 font-semibold text-center mt-5">
            ⏳ Loading car details...
          </p>
        )}
        {error && (
          <p className="text-red-500 font-semibold text-center mt-5">
            🚫 {error}
          </p>
        )}
        {!isLoading && !error && !carDetail && (
          <p className="text-red-500 font-semibold text-center mt-5">
            🚫 No car details found.
          </p>
        )}
        {!isLoading && !error && carDetail && (
          <>
            <DetailHeader carDetail={carDetail} />
            <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-10 gap-5">
              <div className="md:col-span-2">
                <ImageGallery carDetail={carDetail} />
                <Description carDetail={carDetail} />
                <Features features={carDetail?.features} />
                <FinancialCalculator carDetail={carDetail} />
              </div>
              <div>
                <Pricing carDetail={carDetail} />
                <Specification carDetail={carDetail} />
                <OwnersDetail carDetail={carDetail} />
              </div>
            </div>
          </>
        )}
        <MostSearchedCar />
      </div>
    </div>
  );
}

export default LisingDetail;