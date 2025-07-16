// import React, { useState } from 'react'
// import { IoMdCloseCircle } from "react-icons/io";

// function UploadImages() {

//     const [selectedFileList, setSelectedFileList] = useState([])

//     const onFileSelected = (event) => {
//         const files = event.target.files;
//         for (let i = 0; i < files.length; i++) {
//             const file = files[i];
//             setSelectedFileList((prev) => [...prev, file])


//         }

//     }

//     return (
//         <div>
//             <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>
//             <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
//                 {selectedFileList.map((image, index) => (
//                     <div key={index}>
//                         <IoMdCloseCircle className='absolute m-3 x-10' />
//                         <img src={URL.createObjectURL(image)} alt="image" className='w-full h-[130px] object-cover rounded-xl' />
//                     </div>
//                 ))}
//                 <label htmlFor='upload-images'>
//                     <div className='rounded-xl border border-dotted border-indigo-500 bg-white p-10 cursor-pointer hover:scale-105 transition-all ease-in-out'>
//                         <h2 className='text-3xl text-center text-indigo-500'>+</h2>
//                     </div>
//                 </label>
//                 <input
//                     onChange={onFileSelected}
//                     type="file" multiple={true} id="upload-images" className='opacity-0' />
//             </div>
//         </div>
//     )
// }

// export default UploadImages


// import { Button } from '@/components/ui/button';
// import { storage } from '../../../configs/firebaseConfig';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import React, { useEffect, useState } from 'react';
// import { IoMdCloseCircle } from "react-icons/io";

// function UploadImages({ triggerUploadImages }) {
//     const [selectedFileList, setSelectedFileList] = useState([]);


//     useEffect(() => {
//         if (triggerUploadImages) {
//             UploadImageImageToServer();
//             setSelectedFileList([]); // Clear the file list after upload
//         }
//     }, [triggerUploadImages])

//     const onFileSelected = (event) => {
//         const files = event.target.files;
//         const newFiles = Array.from(files); // Convert FileList to array
//         setSelectedFileList((prev) => [...prev, ...newFiles]);
//     };

//     const removeImage = (indexToRemove) => {
//         setSelectedFileList((prev) => {
//             const newList = prev.filter((_, index) => index !== indexToRemove);
//             URL.revokeObjectURL(prev[indexToRemove]); // Revoke URL to prevent memory leaks
//             return newList;
//         });
//     };

//     const UploadImageImageToServer = () => {
//         selectedFileList.forEach((file) => {
//             const fileName = Date.now() + '.jpeg'
//             const storageRef = ref(storage, 'car-marketplace/' + fileName);
//             const metaData = {
//                 contentType: 'image/jpeg'
//             }
//             uploadBytes(storageRef, file, metaData).then((snapshot) => {
//                 console.log('Uploaded a blob or file!', snapshot);
//             }).then(resp => {
//                 getDownloadURL(storageRef).then(async (downloadUrl) => {
//                     console.log("Download URL:", downloadUrl);
//                 })
//             })
//         })
//     }

//     return (
//         <div>
//             <h2 className='font-medium text-xl my-3'>Upload Car Images</h2>
//             <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
//                 {selectedFileList.map((image, index) => (
//                     <div key={index} className='relative w-full aspect-[16/9]'>
//                         <IoMdCloseCircle
//                             className='absolute top-2 right-2 text-red-500 cursor-pointer z-10 hover:text-red-700 transition-colors'
//                             size={24}
//                             onClick={() => removeImage(index)}
//                             aria-label={`Remove image ${index + 1}`}
//                         />
//                         <img
//                             src={URL.createObjectURL(image)}
//                             alt={`Car image ${index + 1}`}
//                             className='w-full h-full object-cover rounded-xl'
//                         />
//                     </div>
//                 ))}
//                 <label htmlFor='upload-images'>
//                     <div className='rounded-xl border border-dotted border-indigo-500 bg-white p-10 cursor-pointer hover:scale-105 transition-all ease-in-out aspect-[16/9]'>
//                         <h2 className='text-3xl text-center text-indigo-500'>+</h2>
//                     </div>
//                 </label>
//                 <input
//                     onChange={onFileSelected}
//                     type="file"
//                     multiple={true}
//                     id="upload-images"
//                     className='hidden'
//                     accept="image/*"
//                 />
//             </div>

//         </div>
//     );
// }

// export default UploadImages;



// import { db } from '../../../configs/index';
// import { storage } from '../../../configs/firebaseConfig';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import React, { useEffect, useState } from 'react';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { CarImages } from './../../../configs/schema';

// function UploadImages({ triggerUploadImages, onImageUpload }) {
//     const [selectedFileList, setSelectedFileList] = useState([]);
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         if (triggerUploadImages) {
//             UploadImageToServer();
//         }
//     }, [triggerUploadImages]);

//     const onFileSelected = (event) => {
//         const files = event.target.files;
//         const newFiles = Array.from(files); // Convert FileList to array
//         setSelectedFileList((prev) => [...prev, ...newFiles]);
//     };

//     const removeImage = (indexToRemove) => {
//         setSelectedFileList((prev) => {
//             const newList = prev.filter((_, index) => index !== indexToRemove);
//             URL.revokeObjectURL(prev[indexToRemove]); // Revoke URL to prevent memory leaks
//             return newList;
//         });
//     };

//     const UploadImageToServer = async () => {
//         if (!selectedFileList.length) return;

//         setLoading(true)

//         const uploadedUrls = [];
//         for (const file of selectedFileList) {
//             const fileName = `${Date.now()}_${file.name}`; // Ensure unique file names
//             const storageRef = ref(storage, `car-marketplace/${fileName}`);
//             const metaData = {
//                 contentType: 'image/jpeg',
//             };

//             try {
//                 // Upload the file
//                 const snapshot = await uploadBytes(storageRef, file, metaData);
//                 console.log('Uploaded a blob or file!', snapshot);

//                 // Get the download URL
//                 const downloadUrl = await getDownloadURL(storageRef);
//                 console.log('Download URL:', downloadUrl);
//                 uploadedUrls.push(downloadUrl);
//                 // save to the data base ?
//                 await db.insert(CarImages).values({
//                     imageUrl: downloadUrl,
//                     carListingId: triggerUploadImages,
//                 })
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//             }
//         }
//         setLoading(false)

//         // Clear the file list after all uploads are complete
//         setSelectedFileList([]);
//         // Pass the URLs back to the parent component
//         if (onImageUpload && uploadedUrls.length > 0) {
//             onImageUpload(uploadedUrls);
//         }
//     };

//     return (
//         <div>
//             <h2 className="font-medium text-xl my-3">Upload Car Images</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
//                 {selectedFileList.map((image, index) => (
//                     <div key={index} className="relative w-full aspect-[16/9]">
//                         <IoMdCloseCircle
//                             className="absolute top-2 right-2 text-red-500 cursor-pointer z-10 hover:text-red-700 transition-colors"
//                             size={24}
//                             onClick={() => removeImage(index)}
//                             aria-label={`Remove image ${index + 1}`}
//                         />
//                         <img
//                             src={URL.createObjectURL(image)}
//                             alt={`Car image ${index + 1}`}
//                             className="w-full h-full object-cover rounded-xl"
//                         />
//                     </div>
//                 ))}
//                 <label htmlFor="upload-images">
//                     <div className="rounded-xl border border-dotted border-indigo-500 bg-white p-10 cursor-pointer hover:scale-105 transition-all ease-in-out aspect-[16/9]">
//                         <h2 className="text-3xl text-center text-indigo-500">+</h2>
//                     </div>
//                 </label>
//                 <input
//                     onChange={onFileSelected}
//                     type="file"
//                     multiple={true}
//                     id="upload-images"
//                     className="hidden"
//                     accept="image/*"
//                 />
//             </div>
//         </div>
//     );
// }

// export default UploadImages;



// import { db } from '../../../configs/index';
// import { storage } from '../../../configs/firebaseConfig';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import React, { useEffect, useState } from 'react';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { Loader2Icon } from 'lucide-react';
// import { CarImages } from './../../../configs/schema';

// function UploadImages({ triggerUploadImages, onImageUpload, onUploadComplete }) {
//     const [selectedFileList, setSelectedFileList] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (triggerUploadImages) {
//             UploadImageToServer();
//         }
//     }, [triggerUploadImages]);

//     const onFileSelected = (event) => {
//         const files = event.target.files;
//         const newFiles = Array.from(files);
//         setSelectedFileList((prev) => [...prev, ...newFiles]);
//     };

//     const removeImage = (indexToRemove) => {
//         setSelectedFileList((prev) => {
//             const newList = prev.filter((_, index) => index !== indexToRemove);
//             URL.revokeObjectURL(prev[indexToRemove]);
//             return newList;
//         });
//     };

//     const UploadImageToServer = async () => {
//         if (!selectedFileList.length) {
//             // No images to upload, notify completion immediately
//             if (onUploadComplete) {
//                 onUploadComplete();
//             }
//             return;
//         }

//         setLoading(true);

//         const uploadedUrls = [];
//         for (const file of selectedFileList) {
//             const fileName = `${Date.now()}_${file.name}`;
//             const storageRef = ref(storage, `car-marketplace/${fileName}`);
//             const metaData = {
//                 contentType: 'image/jpeg',
//             };

//             try {
//                 const snapshot = await uploadBytes(storageRef, file, metaData);
//                 console.log('Uploaded a blob or file!', snapshot);

//                 const downloadUrl = await getDownloadURL(storageRef);
//                 console.log('Download URL:', downloadUrl);
//                 uploadedUrls.push(downloadUrl);

//                 await db.insert(CarImages).values({
//                     imageUrl: downloadUrl,
//                     carListingId: triggerUploadImages,
//                 });
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//             }
//         }

//         setLoading(false);
//         setSelectedFileList([]);

//         // Notify parent that upload is complete
//         if (onUploadComplete) {
//             onUploadComplete();
//         }

//         if (onImageUpload && uploadedUrls.length > 0) {
//             onImageUpload(uploadedUrls);
//         }
//     };

//     return (
//         <div>
//             <h2 className="font-medium text-xl my-3">Upload Car Images</h2>

//             {/* Show loading state during upload */}
//             {loading && (
//                 <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
//                     <Loader2Icon className="animate-spin" size={20} />
//                     <span className="text-sm text-blue-700">
//                         Uploading images... ({selectedFileList.length} files)
//                     </span>
//                 </div>
//             )}

//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
//                 {selectedFileList.map((image, index) => (
//                     <div key={index} className="relative w-full aspect-[16/9]">
//                         <IoMdCloseCircle
//                             className="absolute top-2 right-2 text-red-500 cursor-pointer z-10 hover:text-red-700 transition-colors"
//                             size={24}
//                             onClick={() => removeImage(index)}
//                             aria-label={`Remove image ${index + 1}`}
//                         />
//                         <img
//                             src={URL.createObjectURL(image)}
//                             alt={`Car image ${index + 1}`}
//                             className="w-full h-full object-cover rounded-xl"
//                         />
//                         {/* Show overlay during upload */}
//                         {loading && (
//                             <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
//                                 <Loader2Icon className="animate-spin text-white" size={24} />
//                             </div>
//                         )}
//                     </div>
//                 ))}

//                 {/* Disable file selection during upload */}
//                 <label htmlFor="upload-images" className={loading ? 'pointer-events-none opacity-50' : ''}>
//                     <div className="rounded-xl border border-dotted border-indigo-500 bg-white p-10 cursor-pointer hover:scale-105 transition-all ease-in-out aspect-[16/9]">
//                         <h2 className="text-3xl text-center text-indigo-500">+</h2>
//                     </div>
//                 </label>
//                 <input
//                     onChange={onFileSelected}
//                     type="file"
//                     multiple={true}
//                     id="upload-images"
//                     className="hidden"
//                     accept="image/*"
//                     disabled={loading}
//                 />
//             </div>
//         </div>
//     );
// }

// export default UploadImages;


// import { db } from '../../../configs/index';
// import { storage } from '../../../configs/firebaseConfig';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import React, { useEffect, useState } from 'react';
// import { IoMdCloseCircle } from 'react-icons/io';
// import { Loader2Icon } from 'lucide-react';
// import { CarImages } from './../../../configs/schema';

// function UploadImages({ triggerUploadImages, onImageUpload, onUploadComplete, carInfo, mode = 'add' }) {
//     const [selectedFileList, setSelectedFileList] = useState([]);
//     const [existingImages, setExistingImages] = useState([]);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         if (triggerUploadImages) {
//             UploadImageToServer();
//         }
//     }, [triggerUploadImages]);

//     // Load existing images when in edit mode
//     useEffect(() => {
//         if (mode === 'edit' && carInfo?.images) {
//             setExistingImages(carInfo.images);
//         }
//     }, [carInfo, mode]);

//     const onFileSelected = (event) => {
//         const files = event.target.files;
//         const newFiles = Array.from(files);
//         setSelectedFileList((prev) => [...prev, ...newFiles]);
//     };

//     const removeNewImage = (indexToRemove) => {
//         setSelectedFileList((prev) => {
//             const newList = prev.filter((_, index) => index !== indexToRemove);
//             URL.revokeObjectURL(prev[indexToRemove]);
//             return newList;
//         });
//     };

//     const removeExistingImage = (indexToRemove) => {
//         setExistingImages((prev) =>
//             prev.filter((_, index) => index !== indexToRemove)
//         );
//     };

//     const UploadImageToServer = async () => {
//         if (!selectedFileList.length) {
//             // No images to upload, notify completion immediately
//             if (onUploadComplete) {
//                 onUploadComplete();
//             }
//             return;
//         }

//         setLoading(true);

//         const uploadedUrls = [];
//         for (const file of selectedFileList) {
//             const fileName = `${Date.now()}_${file.name}`;
//             const storageRef = ref(storage, `car-marketplace/${fileName}`);
//             const metaData = {
//                 contentType: 'image/jpeg',
//             };

//             try {
//                 const snapshot = await uploadBytes(storageRef, file, metaData);
//                 console.log('Uploaded a blob or file!', snapshot);

//                 const downloadUrl = await getDownloadURL(storageRef);
//                 console.log('Download URL:', downloadUrl);
//                 uploadedUrls.push(downloadUrl);

//                 await db.insert(CarImages).values({
//                     imageUrl: downloadUrl,
//                     carListingId: triggerUploadImages,
//                 });
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//             }
//         }

//         setLoading(false);
//         setSelectedFileList([]);

//         // Notify parent that upload is complete
//         if (onUploadComplete) {
//             onUploadComplete();
//         }

//         if (onImageUpload && uploadedUrls.length > 0) {
//             onImageUpload(uploadedUrls);
//         }
//     };

//     return (
//         <div>
//             <h2 className="font-medium text-xl my-3">Upload Car Images</h2>

//             {/* Show loading state during upload */}
//             {loading && (
//                 <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
//                     <Loader2Icon className="animate-spin" size={20} />
//                     <span className="text-sm text-blue-700">
//                         Uploading images... ({selectedFileList.length} files)
//                     </span>
//                 </div>
//             )}

//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
//                 {/* Display existing images in edit mode */}
//                 {mode === 'edit' && existingImages.map((image, index) => (
//                     <div key={`existing-${index}`} className="relative w-full aspect-[16/9]">
//                         <IoMdCloseCircle
//                             className="absolute top-2 right-2 text-red-500 cursor-pointer z-10 hover:text-red-700 transition-colors"
//                             size={24}
//                             onClick={() => removeExistingImage(index)}
//                             aria-label={`Remove existing image ${index + 1}`}
//                         />
//                         <img
//                             src={image.imageUrl}
//                             alt={`Existing car image ${index + 1}`}
//                             className="w-full h-full object-cover rounded-xl"
//                         />
//                         {/* Badge to indicate existing image */}
//                         <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
//                             Saved
//                         </div>
//                     </div>
//                 ))}

//                 {/* Display newly selected images */}
//                 {selectedFileList.map((image, index) => (
//                     <div key={`new-${index}`} className="relative w-full aspect-[16/9]">
//                         <IoMdCloseCircle
//                             className="absolute top-2 right-2 text-red-500 cursor-pointer z-10 hover:text-red-700 transition-colors"
//                             size={24}
//                             onClick={() => removeNewImage(index)}
//                             aria-label={`Remove new image ${index + 1}`}
//                         />
//                         <img
//                             src={URL.createObjectURL(image)}
//                             alt={`New car image ${index + 1}`}
//                             className="w-full h-full object-cover rounded-xl"
//                         />
//                         {/* Badge to indicate new image */}
//                         <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
//                             New
//                         </div>
//                         {/* Show overlay during upload */}
//                         {loading && (
//                             <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
//                                 <Loader2Icon className="animate-spin text-white" size={24} />
//                             </div>
//                         )}
//                     </div>
//                 ))}

//                 {/* Disable file selection during upload */}
//                 <label htmlFor="upload-images" className={loading ? 'pointer-events-none opacity-50' : ''}>
//                     <div className="rounded-xl border border-dotted border-indigo-500 bg-white p-10 cursor-pointer hover:scale-105 transition-all ease-in-out aspect-[16/9]">
//                         <h2 className="text-3xl text-center text-indigo-500">+</h2>
//                     </div>
//                 </label>
//                 <input
//                     onChange={onFileSelected}
//                     type="file"
//                     multiple={true}
//                     id="upload-images"
//                     className="hidden"
//                     accept="image/*"
//                     disabled={loading}
//                 />
//             </div>
//         </div>
//     );
// }

// export default UploadImages;



import { db } from '../../../configs/index';
import { storage } from '../../../configs/firebaseConfig';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { IoMdCloseCircle } from 'react-icons/io';
import { Loader2Icon } from 'lucide-react';
import { CarImages } from './../../../configs/schema';
import { eq } from 'drizzle-orm';

function UploadImages({ triggerUploadImages, onImageUpload, onUploadComplete, carInfo, mode = 'add' }) {
    const [selectedFileList, setSelectedFileList] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [deletedImageIds, setDeletedImageIds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (triggerUploadImages) {
            UploadImageToServer();
        }
    }, [triggerUploadImages]);

    // Load existing images when in edit mode
    useEffect(() => {
        if (mode === 'edit' && carInfo?.images) {
            setExistingImages(carInfo.images);
        }
    }, [carInfo, mode]);

    const onFileSelected = (event) => {
        const files = event.target.files;
        const newFiles = Array.from(files);
        setSelectedFileList((prev) => [...prev, ...newFiles]);
    };

    const removeNewImage = (indexToRemove) => {
        setSelectedFileList((prev) => {
            const newList = prev.filter((_, index) => index !== indexToRemove);
            URL.revokeObjectURL(prev[indexToRemove]);
            return newList;
        });
    };

    const removeExistingImage = (indexToRemove) => {
        const imageToDelete = existingImages[indexToRemove];
        setDeletedImageIds(prev => [...prev, imageToDelete.id]);
        setExistingImages((prev) =>
            prev.filter((_, index) => index !== indexToRemove)
        );
    };

    const deleteImageFromStorage = async (imageUrl) => {
        try {
            // Extract file name from URL to create storage reference
            const fileName = imageUrl.split('/').pop().split('?')[0];
            const storageRef = ref(storage, `car-marketplace/${fileName}`);
            await deleteObject(storageRef);
            console.log('Image deleted from storage:', fileName);
        } catch (error) {
            console.error('Error deleting image from storage:', error);
        }
    };

    const UploadImageToServer = async () => {
        setLoading(true);

        try {
            // First, delete removed images from database and storage
            if (deletedImageIds.length > 0) {
                for (const imageId of deletedImageIds) {
                    // Get image URL before deleting from database
                    const imageToDelete = carInfo?.images?.find(img => img.id === imageId);
                    if (imageToDelete) {
                        // Delete from storage
                        await deleteImageFromStorage(imageToDelete.imageUrl);
                        // Delete from database
                        await db.delete(CarImages).where(eq(CarImages.id, imageId));
                        console.log('Deleted image with ID:', imageId);
                    }
                }
            }

            // Then upload new images
            if (selectedFileList.length > 0) {
                const uploadedUrls = [];
                for (const file of selectedFileList) {
                    const fileName = `${Date.now()}_${file.name}`;
                    const storageRef = ref(storage, `car-marketplace/${fileName}`);
                    const metaData = {
                        contentType: 'image/jpeg',
                    };

                    try {
                        const snapshot = await uploadBytes(storageRef, file, metaData);
                        console.log('Uploaded a blob or file!', snapshot);

                        const downloadUrl = await getDownloadURL(storageRef);
                        console.log('Download URL:', downloadUrl);
                        uploadedUrls.push(downloadUrl);

                        await db.insert(CarImages).values({
                            imageUrl: downloadUrl,
                            carListingId: triggerUploadImages,
                        });
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    }
                }

                if (onImageUpload && uploadedUrls.length > 0) {
                    onImageUpload(uploadedUrls);
                }
            }

            // Reset states
            setSelectedFileList([]);
            setDeletedImageIds([]);

        } catch (error) {
            console.error('Error in UploadImageToServer:', error);
        } finally {
            setLoading(false);
            // Notify parent that operation is complete
            if (onUploadComplete) {
                onUploadComplete();
            }
        }
    };

    return (
        <div>
            <h2 className="font-medium text-xl my-3">Upload Car Images</h2>

            {/* Show loading state during upload */}
            {loading && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                    <Loader2Icon className="animate-spin" size={20} />
                    <span className="text-sm text-blue-700">
                        Uploading images... ({selectedFileList.length} files)
                    </span>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {/* Display existing images in edit mode */}
                {mode === 'edit' && existingImages.map((image, index) => (
                    <div key={`existing-${index}`} className="relative w-full aspect-[16/9]">
                        <IoMdCloseCircle
                            className="absolute top-2 right-2 text-red-500 cursor-pointer z-10 hover:text-red-700 transition-colors"
                            size={24}
                            onClick={() => removeExistingImage(index)}
                            aria-label={`Remove existing image ${index + 1}`}
                        />
                        <img
                            src={image.imageUrl}
                            alt={`Existing car image ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl"
                        />
                        {/* Badge to indicate existing image */}
                        <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                            Saved
                        </div>
                    </div>
                ))}

                {/* Display newly selected images */}
                {selectedFileList.map((image, index) => (
                    <div key={`new-${index}`} className="relative w-full aspect-[16/9]">
                        <IoMdCloseCircle
                            className="absolute top-2 right-2 text-red-500 cursor-pointer z-10 hover:text-red-700 transition-colors"
                            size={24}
                            onClick={() => removeNewImage(index)}
                            aria-label={`Remove new image ${index + 1}`}
                        />
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`New car image ${index + 1}`}
                            className="w-full h-full object-cover rounded-xl"
                        />
                        {/* Badge to indicate new image */}
                        <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                            New
                        </div>
                        {/* Show overlay during upload */}
                        {loading && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center">
                                <Loader2Icon className="animate-spin text-white" size={24} />
                            </div>
                        )}
                    </div>
                ))}

                {/* Disable file selection during upload */}
                <label htmlFor="upload-images" className={loading ? 'pointer-events-none opacity-50' : ''}>
                    <div className="rounded-xl border border-dotted border-indigo-500 bg-white p-10 cursor-pointer hover:scale-105 transition-all ease-in-out aspect-[16/9]">
                        <h2 className="text-3xl text-center text-indigo-500">+</h2>
                    </div>
                </label>
                <input
                    onChange={onFileSelected}
                    type="file"
                    multiple={true}
                    id="upload-images"
                    className="hidden"
                    accept="image/*"
                    disabled={loading}
                />
            </div>
        </div>
    );
}

export default UploadImages;