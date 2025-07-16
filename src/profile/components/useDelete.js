// hooks/useDelete.js
import { useState } from "react";
import { db } from "../../configs";
import { eq } from "drizzle-orm";

export const useDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteRecord = async (table, whereClause, relatedDeletions = []) => {
    setIsDeleting(true);
    try {
      // Delete related records first (to handle foreign key constraints)
      for (const deletion of relatedDeletions) {
        await db.delete(deletion.table).where(deletion.whereClause);
      }

      // Delete the main record
      await db.delete(table).where(whereClause);

      return { success: true };
    } catch (error) {
      console.error("Error deleting record:", error);
      return { success: false, error };
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteRecord, isDeleting };
};

// Usage examples:

// For deleting a car listing with images:
// const { deleteRecord, isDeleting } = useDelete()
//
// const handleDelete = async (carId) => {
//     const result = await deleteRecord(
//         CarListing,                              // main table
//         eq(CarListing.id, carId),               // main where clause
//         [                                       // related deletions
//             {
//                 table: CarImages,
//                 whereClause: eq(CarImages.carListingId, carId)
//             }
//         ]
//     )
//
//     if (result.success) {
//         // Update your local state
//         setCarList(carList.filter(car => car.id !== carId))
//     }
// }

// For deleting a user with all their data:
// const handleDeleteUser = async (userId) => {
//     const result = await deleteRecord(
//         Users,                                   // main table
//         eq(Users.id, userId),                   // main where clause
//         [                                       // related deletions
//             {
//                 table: CarImages,
//                 whereClause: eq(CarImages.userId, userId)
//             },
//             {
//                 table: CarListing,
//                 whereClause: eq(CarListing.createdBy, userId)
//             }
//         ]
//     )
// }
