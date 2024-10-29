"use client";
import React, { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs"; // Import useClerk for sign out
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

function Logout() {
  const { user } = useUser();
  const { signOut } = useClerk(); // Use useClerk to access signOut
  const [userFullName, setUserFullName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(true); // Set dialog to open immediately
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    if (user) {
      setUserFullName(user.fullName); // Extract user's full name
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut({ redirectUrl: '/' }); // Sign out and redirect to home
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            {`Are you sure you want to log out, ${userFullName}?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end space-x-2">
          <AlertDialogCancel
            onClick={() => {
              setIsDialogOpen(false); // Close dialog
              router.push('/dashboard'); // Navigate to /dashboard
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Logout;
