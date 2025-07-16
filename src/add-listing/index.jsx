// import Header from '@/components/Header'
// import React, { useState } from 'react'
// import carDetails from './../Shared/carDetails.json'
// import InputField from './components/InputField'
// import DropdownField from './components/DropdownField'
// import TextAreaField from './components/TextAreaField'
// import { Separator } from '@/components/ui/separator'
// import features from './../Shared/features.json'
// import { Checkbox } from '@/components/ui/checkbox'
// import { Button } from '@/components/ui/button'
// import { db } from '../../configs/index'
// import { CarListing } from '../../configs/schema'
// import IconField from './components/IconField'
// import UploadImages from './components/UploadImages'

// function AddListing() {


//     const [formData, setFormData] = useState([])
//     const [featuresData, setFeaturesData] = useState([])
//     const [triggerUploadImages, setTriggerUploadImages] = useState()


//     // Used to capture users input data from the form fields
//     const handleInputChange = (name, value) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }))

//         console.log("FORM DATA:", formData)

//     }

//     //used to save selected check boxes feature list

//     const handleFeatureChange = (name, value) => {
//         setFeaturesData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }))

//         console.log("FEATURES DATA:", featuresData)
//     }

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         console.log("Submitted Data:", formData);
//         try {
//             const result = await db.insert(CarListing).values({ ...formData, features: featuresData })
//                 .returning({ id: CarListing.id })
//             if (result) {
//                 console.log("Data inserted successfully:", result);
//                 setTriggerUploadImages(result[0]?.id);
//             }
//         } catch (e) {
//             console.error("Error inserting data:", e);
//             return;
//         }
//     }


//     return (
//         <div>
//             <Header />
//             <div className='px-10 md:px-20 my-10'>
//                 <h2 className='font-bold text-4xl'>Add New Listing</h2>
//                 <form className='p-10 border-2 border-indigo-500 rounded-xl mt-10 bg-indigo-900/90' action="">
//                     {/* car details */}
//                     <div>
//                         <h2 className='font-medium text-xl mb-6'>Car Details</h2>
//                         <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
//                             {carDetails.carDetails.map((item, index) => (
//                                 <div key={index}>
//                                     <label className='text-sm flex gap-2 items-center mb-2'>
//                                         <IconField icon={item?.icon} />
//                                         {item?.label} {item.required && <span className='text-red-500'>*</span>}</label>
//                                     {item.fieldType == 'text' || item.fieldType == 'number'
//                                         ? <InputField item={item} handleInputChange={handleInputChange} />
//                                         : item.fieldType == 'dropdown' ? <DropdownField item={item}
//                                             handleInputChange={handleInputChange}
//                                         />
//                                             : item.fieldType == 'textarea' ? <TextAreaField item={item}
//                                                 handleInputChange={handleInputChange}
//                                             />
//                                                 : null}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <Separator className="my-6" />
//                     {/* features list */}
//                     <div>
//                         <h2 className='font-medium text-xl my-6'>Features</h2>
//                         <div className='grid grid-cols-2 md:grid-cols-3 gap-2 '>
//                             {features.features.map((item, index) => (
//                                 <div key={index} className='flex gap-2 items-center'>
//                                     <Checkbox onCheckedChange={(value) => handleFeatureChange(item.name, value)} /> <h2>{item.label}</h2>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     {/* car images */}
//                     <Separator className="my-6" />
//                     <UploadImages triggerUploadImages={setTriggerUploadImages} />
//                     <div className='mt-10 flex justify-end'>
//                         <Button type="submit" onClick={(e) => onSubmit(e)}>Submit</Button>
//                     </div>
//                 </form>

//             </div>
//         </div>
//     )
// }

// export default AddListing




// import Header from '@/components/Header';
// import React, { useState } from 'react';
// import carDetails from './../Shared/carDetails.json';
// import InputField from './components/InputField';
// import DropdownField from './components/DropdownField';
// import TextAreaField from './components/TextAreaField';
// import { Separator } from '@/components/ui/separator';
// import features from './../Shared/features.json';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Button } from '@/components/ui/button';
// import { db } from '../../configs/index';
// import { CarListing } from '../../configs/schema';
// import IconField from './components/IconField';
// import UploadImages from './components/UploadImages';
// import { Loader2Icon } from 'lucide-react';
// import { FaUpload } from "react-icons/fa6";

// function AddListing() {
//     const [formData, setFormData] = useState({});
//     const [featuresData, setFeaturesData] = useState({});
//     const [triggerUploadImages, setTriggerUploadImages] = useState(null);
//     const [loading, setLoading] = useState(false)

//     const handleInputChange = (name, value) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//         console.log('FORM DATA:', { ...formData, [name]: value });
//     };

//     const handleFeatureChange = (name, value) => {
//         setFeaturesData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//         console.log('FEATURES DATA:', { ...featuresData, [name]: value });
//     };

//     const handleImageUpload = (imageUrls) => {
//         console.log('Received image URLs in AddListing:', imageUrls);
//         // Optionally store URLs in state or perform additional actions
//     };

//     const onSubmit = async (e) => {
//         setLoading(true)
//         e.preventDefault();
//         console.log('Submitted Data:', formData);
//         try {
//             const result = await db
//                 .insert(CarListing)
//                 .values({ ...formData, features: featuresData })
//                 .returning({ id: CarListing.id });
//             if (result[0]?.id) {
//                 console.log('Data inserted successfully:', result);
//                 setTriggerUploadImages(result[0].id);
//                 setLoading(false)
//             } else {
//                 console.error('No ID returned from CarListing insert');
//             }

//         } catch (e) {
//             setLoading(false)

//             console.error('Error inserting data into CarListing:', e);
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <div className="px-10 md:px-20 my-10">
//                 <h2 className="font-bold text-4xl">Add New Listing</h2>
//                 <form className="p-10 border-2 border-indigo-500 rounded-xl mt-10 bg-indigo-900/90">
//                     <div>
//                         <h2 className="font-medium text-xl mb-6">Car Details</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                             {carDetails.carDetails.map((item, index) => (
//                                 <div key={index}>
//                                     <label className="text-sm flex gap-2 items-center mb-2">
//                                         <IconField icon={item?.icon} />
//                                         {item?.label} {item.required && <span className="text-red-500">*</span>}
//                                     </label>
//                                     {item.fieldType === 'text' || item.fieldType === 'number' ? (
//                                         <InputField item={item} handleInputChange={handleInputChange} />
//                                     ) : item.fieldType === 'dropdown' ? (
//                                         <DropdownField item={item} handleInputChange={handleInputChange} />
//                                     ) : item.fieldType === 'textarea' ? (
//                                         <TextAreaField item={item} handleInputChange={handleInputChange} />
//                                     ) : null}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <Separator className="my-6" />
//                     <div>
//                         <h2 className="font-medium text-xl my-6">Features</h2>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                             {features.features.map((item, index) => (
//                                 <div key={index} className="flex gap-2 items-center">
//                                     <Checkbox onCheckedChange={(value) => handleFeatureChange(item.name, value)} />
//                                     <h2>{item.label}</h2>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <Separator className="my-6" />
//                     <UploadImages triggerUploadImages={triggerUploadImages} onImageUpload={handleImageUpload} />
//                     <div className="mt-10 flex justify-end">
//                         <Button
//                             disabled={loading}
//                             type="submit" onClick={onSubmit}>
//                             {loading ? <Loader2Icon className='animate-spin' /> : <FaUpload />} Submit
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddListing;


// import Header from '@/components/Header';
// import React, { useEffect, useState } from 'react';
// import carDetails from './../Shared/carDetails.json';
// import InputField from './components/InputField';
// import DropdownField from './components/DropdownField';
// import TextAreaField from './components/TextAreaField';
// import { Separator } from '@/components/ui/separator';
// import features from './../Shared/features.json';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Button } from '@/components/ui/button';
// import { db } from '../../configs/index';
// import { CarImages, CarListing } from '../../configs/schema';
// import IconField from './components/IconField';
// import UploadImages from './components/UploadImages';
// import { Loader2Icon } from 'lucide-react';
// import { FaUpload } from "react-icons/fa6";
// import { toast } from 'sonner';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { useUser } from '@clerk/clerk-react';
// import moment from 'moment'
// import { eq } from 'drizzle-orm';
// import { FormatResult } from '@/Shared/Service';

// function AddListing() {
//     const [formData, setFormData] = useState({});
//     const [featuresData, setFeaturesData] = useState({});
//     const [triggerUploadImages, setTriggerUploadImages] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [uploadingImages, setUploadingImages] = useState(false);
//     const [carInfo, setCarInfo] = useState()

//     const [searchParams] = useSearchParams()

//     const mode = searchParams.get('mode')
//     const recordId = searchParams.get('id')

//     useEffect(() => {
//         if (mode == 'edit') {
//             GetListingDetail()
//         }
//     }, [])

//     const GetListingDetail = async () => {
//         const result = await db.select().from(CarListing)
//             .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
//             .where(eq(CarListing.id, recordId))
//         const resp = FormatResult(result)
//         setCarInfo(resp[0])
//         console.log("Result:", resp)
//         setFeaturesData(resp[0].features)
//     }

//     const navigate = useNavigate()
//     const { user } = useUser()

//     const handleInputChange = (name, value) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//         console.log('FORM DATA:', { ...formData, [name]: value });
//     };

//     const handleFeatureChange = (name, value) => {
//         setFeaturesData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//         console.log('FEATURES DATA:', { ...featuresData, [name]: value });
//     };

//     const handleImageUpload = (imageUrls) => {
//         console.log('Received image URLs in AddListing:', imageUrls);
//         // This can be used for additional processing if needed
//     };

//     const handleUploadComplete = () => {
//         setUploadingImages(false);
//         setLoading(false);
//         // Reset form or redirect user here
//         toast.success('Listing created')
//         navigate('/profile');
//     };

//     const onSubmit = async (e) => {
//         setLoading(true);
//         e.preventDefault();
//         console.log('Submitted Data:', formData);

//         try {
//             const result = await db
//                 .insert(CarListing)
//                 .values({
//                     ...formData, features: featuresData,
//                     createdBy: user?.primaryEmailAddress.emailAddress,
//                     postedOn: moment().format('DD/MM/yyy')
//                 })
//                 .returning({ id: CarListing.id });

//             if (result[0]?.id) {
//                 console.log('Data inserted successfully:', result);
//                 setUploadingImages(true);
//                 setTriggerUploadImages(result[0].id);
//                 // Don't set loading to false here - let image upload completion handle it
//             } else {
//                 console.error('No ID returned from CarListing insert');
//                 setLoading(false);
//             }
//         } catch (e) {
//             setLoading(false);
//             console.error('Error inserting data into CarListing:', e);
//         }
//     };

//     return (
//         <div>
//             <Header />
//             <div className="px-10 md:px-20 my-10">
//                 <h2 className="font-bold text-4xl">Add New Listing</h2>
//                 <form className="p-10 border-2 border-indigo-500 rounded-xl mt-10 bg-indigo-900/90">
//                     <div>
//                         <h2 className="font-medium text-xl mb-6">Car Details</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                             {carDetails.carDetails.map((item, index) => (
//                                 <div key={index}>
//                                     <label className="text-sm flex gap-2 items-center mb-2">
//                                         <IconField icon={item?.icon} />
//                                         {item?.label} {item.required && <span className="text-red-500">*</span>}
//                                     </label>
//                                     {item.fieldType === 'text' || item.fieldType === 'number' ? (
//                                         <InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
//                                     ) : item.fieldType === 'dropdown' ? (
//                                         <DropdownField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
//                                     ) : item.fieldType === 'textarea' ? (
//                                         <TextAreaField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
//                                     ) : null}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <Separator className="my-6" />
//                     <div>
//                         <h2 className="font-medium text-xl my-6">Features</h2>
//                         <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
//                             {features.features.map((item, index) => (
//                                 <div key={index} className="flex gap-2 items-center">
//                                     <Checkbox onCheckedChange={(value) => handleFeatureChange(item.name, value)}
//                                         checked={featuresData?.[item.name]}
//                                     />
//                                     <h2>{item.label}</h2>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                     <Separator className="my-6" />
//                     <UploadImages
//                         triggerUploadImages={triggerUploadImages}
//                         onImageUpload={handleImageUpload}
//                         onUploadComplete={handleUploadComplete}
//                         carInfo={carInfo}
//                         mode={mode}
//                     />
//                     <div className="mt-10 flex justify-end">
//                         <Button
//                             disabled={loading}
//                             type="submit"
//                             onClick={onSubmit}
//                         >
//                             {loading ? (
//                                 <>
//                                     <Loader2Icon className='animate-spin mr-2' />
//                                     {uploadingImages ? 'Uploading Images...' : 'Saving...'}
//                                 </>
//                             ) : (
//                                 <>
//                                     <FaUpload className="mr-2" />
//                                     Submit
//                                 </>
//                             )}
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddListing;



import Header from '@/components/Header';
import React, { useEffect, useState } from 'react';
import carDetails from './../Shared/carDetails.json';
import InputField from './components/InputField';
import DropdownField from './components/DropdownField';
import TextAreaField from './components/TextAreaField';
import { Separator } from '@/components/ui/separator';
import features from './../Shared/features.json';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { db } from '../../configs/index';
import { CarImages, CarListing } from '../../configs/schema';
import IconField from './components/IconField';
import UploadImages from './components/UploadImages';
import { Loader2Icon } from 'lucide-react';
import { FaUpload } from "react-icons/fa6";
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment'
import { eq } from 'drizzle-orm';
import Service from '@/Shared/Service';


function AddListing() {
    const [formData, setFormData] = useState({});
    const [featuresData, setFeaturesData] = useState({});
    const [triggerUploadImages, setTriggerUploadImages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [carInfo, setCarInfo] = useState()

    const [searchParams] = useSearchParams()

    const mode = searchParams.get('mode')
    const recordId = searchParams.get('id')

    useEffect(() => {
        if (mode == 'edit') {
            GetListingDetail()
        }
    }, [])

    const GetListingDetail = async () => {
        const result = await db.select().from(CarListing)
            .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
            .where(eq(CarListing.id, recordId))
        const resp = Service.FormatResult(result)
        setCarInfo(resp[0])
        console.log("Result:", resp)
        setFormData(resp[0]) // Pre-populate form data
        setFeaturesData(resp[0].features)
    }

    const navigate = useNavigate()
    const { user } = useUser()

    const handleInputChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log('FORM DATA:', { ...formData, [name]: value });
    };

    const handleFeatureChange = (name, value) => {
        setFeaturesData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log('FEATURES DATA:', { ...featuresData, [name]: value });
    };

    const handleImageUpload = (imageUrls) => {
        console.log('Received image URLs in AddListing:', imageUrls);
        // This can be used for additional processing if needed
    };

    const handleUploadComplete = () => {
        setUploadingImages(false);
        setLoading(false);
        // Reset form or redirect user here
        const message = mode === 'edit' ? 'Listing updated successfully' : 'Listing created successfully';
        toast.success(message);
        navigate('/profile');
    };

    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log('Submitted Data:', formData);

        try {
            if (mode === 'edit') {
                // Update existing listing
                await db.update(CarListing)
                    .set({
                        ...formData,
                        features: featuresData,
                    })
                    .where(eq(CarListing.id, recordId));

                // Trigger image operations (delete old ones, upload new ones)
                setUploadingImages(true);
                setTriggerUploadImages(recordId);
                // Don't set loading to false here - let image upload completion handle it
            } else {
                // Create new listing
                const result = await db
                    .insert(CarListing)
                    .values({
                        ...formData, features: featuresData,
                        createdBy: user?.primaryEmailAddress.emailAddress,
                        userName: user?.fullName,
                        userImageUrl: user?.imageUrl,
                        postedOn: moment().format('DD/MM/yyy')
                    })
                    .returning({ id: CarListing.id });

                if (result[0]?.id) {
                    console.log('Data inserted successfully:', result);
                    setUploadingImages(true);
                    setTriggerUploadImages(result[0].id);
                    // Don't set loading to false here - let image upload completion handle it
                } else {
                    console.error('No ID returned from CarListing insert');
                    setLoading(false);
                }
            }
        } catch (e) {
            setLoading(false);
            console.error('Error with database operation:', e);
        }
    };

    return (
        <div>
            <Header />
            <div className="px-10 md:px-20 my-10">
                <h2 className="font-bold text-4xl">
                    {mode === 'edit' ? 'Edit Listing' : 'Add New Listing'}
                </h2>
                <form className="p-10 border-2 border-indigo-500 rounded-xl mt-10 bg-indigo-900/90">
                    <div>
                        <h2 className="font-medium text-xl mb-6">Car Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {carDetails.carDetails.map((item, index) => (
                                <div key={index}>
                                    <label className="text-sm flex gap-2 items-center mb-2">
                                        <IconField icon={item?.icon} />
                                        {item?.label} {item.required && <span className="text-red-500">*</span>}
                                    </label>
                                    {item.fieldType === 'text' || item.fieldType === 'number' ? (
                                        <InputField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                                    ) : item.fieldType === 'dropdown' ? (
                                        <DropdownField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                                    ) : item.fieldType === 'textarea' ? (
                                        <TextAreaField item={item} handleInputChange={handleInputChange} carInfo={carInfo} />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator className="my-6" />
                    <div>
                        <h2 className="font-medium text-xl my-6">Features</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {features.features.map((item, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <Checkbox onCheckedChange={(value) => handleFeatureChange(item.name, value)}
                                        checked={featuresData?.[item.name]}
                                    />
                                    <h2>{item.label}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Separator className="my-6" />
                    <UploadImages
                        triggerUploadImages={triggerUploadImages}
                        onImageUpload={handleImageUpload}
                        onUploadComplete={handleUploadComplete}
                        carInfo={carInfo}
                        mode={mode}
                    />
                    <div className="mt-10 flex justify-end">
                        <Button
                            disabled={loading}
                            type="submit"
                            onClick={onSubmit}
                        >
                            {loading ? (
                                <>
                                    <Loader2Icon className='animate-spin mr-2' />
                                    {uploadingImages ? 'Uploading Images...' : 'Saving...'}
                                </>
                            ) : (
                                <>
                                    <FaUpload className="mr-2" />
                                    {mode === 'edit' ? 'Update' : 'Submit'}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddListing;