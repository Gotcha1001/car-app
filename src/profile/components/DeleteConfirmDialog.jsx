// components/DeleteConfirmDialog.jsx
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

export function DeleteConfirmDialog({
    children,
    onConfirm,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete the item and remove all associated data from our servers.",
    isLoading = false
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

// Usage example in your MyListing component:
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog'

// Then in your JSX:
<DeleteConfirmDialog
    onConfirm={() => handleDeleteListing(item.id)}
    title="Delete Car Listing?"
    description="This will permanently delete your car listing and all associated images. This action cannot be undone."
    isLoading={isDeleting}
>
    <Button variant="destructive" disabled={isDeleting}>
        <FaTrashAlt />
    </Button>
</DeleteConfirmDialog>