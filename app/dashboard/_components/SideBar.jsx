"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";
import { PiSignOutFill } from "react-icons/pi";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { GoShieldCheck } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"; // Adjust this import path as necessary

function Sidebar() {
  const [userCourseList, setUserCourseList] = useContext(UserCourseListContext);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();

  const menu = [
    {
      id: 1,
      name: "Home",
      icon: <FaHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <GoShieldCheck />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <PiSignOutFill />,
      path: "/dashboard/logout",
    },
  ];

  const path = usePathname();

  const handleUpgrade = () => {
    setDialogOpen(false); // Close the dialog
    router.push("/dashboard/upgrade"); // Navigate to the UpgradePlan component
  };

  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <div className="relative w-full h-10 flex items-center justify-center p-3">
        <Image
          src={"/CourseGenie A.svg"}
          width={100}
          height={50}
          className="h-50 w-full"
        />
      </div>
      <hr className="my-5" />
      <div>
        <ul>
          {menu.map((item) => (
            <Link href={item.path} key={item.id}>
              <div
                className={`flex items-center text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                  item.path === path && "bg-gray-100 text-black"
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2 className="ml-2">{item.name}</h2>
              </div>
            </Link>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(userCourseList.length / 5) * 100} />
        <h2 className="text-sm my-2">{userCourseList ? userCourseList.length : 0} Out of 5 Courses created</h2>
        <h2 className="text-xs text-gray-500">Upgrade your plan for Unlimited Courses</h2>
        {userCourseList.length >= 5 && (
          <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger>
              {/* This trigger can be a button or any clickable element */}
              <button className="hidden"></button> {/* You can remove or style as needed */}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Upgrade Required</AlertDialogTitle>
                <AlertDialogDescription>
                  You have reached the limit of 5 courses. Would you like to upgrade to a premium plan?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex justify-between">
                <AlertDialogCancel onClick={() => setDialogOpen(false)}>No</AlertDialogCancel>
                <AlertDialogAction onClick={handleUpgrade}>Yes</AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
