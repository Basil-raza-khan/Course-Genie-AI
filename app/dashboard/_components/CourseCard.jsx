"use client"
import Image from "next/image";
import React from "react";
import { FiBookOpen } from "react-icons/fi";
import { IoInvertModeOutline } from "react-icons/io5";
import DropDownOpt from "./DropDownOpt";
import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { motion } from "framer-motion"; // Import Framer Motion
import Link from "next/link";

function CourseCard({ course, refreshData ,displayUser=false}) {
  const handleOnDelete = async () => {
    const resp = await db.delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      refreshData();
    }
  };

  return (
 
    <motion.div // Change div to motion.div for animation
      className="shadow-lg rounded-lg border p-1 cursor-pointer hover:border-indigo-800"
      whileHover={{ scale: 1.05 }} // Scale up slightly on hover
      transition={{ duration: 0.3 }} // Set duration for the scaling effect
    >
      <Link href={"/course/" + course?.courseId}>
        <Image
          src={course?.cousreBanner}
          width={300}
          height={200}
          className="w-full h-[200px] object-cover rounded-lg"
        />
      </Link>
      <div className="p-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium flex-1 min-h-[2.5rem] truncate">
            {course?.courseOutput?.course?.name}
          </h2>

          {!displayUser&&<DropDownOpt handleOnDelete={() => handleOnDelete()}>
            <motion.div
              whileHover={{ rotate: 360 }} // Spin the icon when hovered
              transition={{ duration: 0.5 }}
              className="focus:outline-none" // Remove focus outline
            >
              <IoInvertModeOutline className="text-[24px]" />
            </motion.div>
          </DropDownOpt>}
        </div>
        <p className="text-sm text-gray-400 my-1">{course?.category}</p>
        <div className="flex items-center justify-between bg-gradient-to-r from-purple-300 to-indigo-200 shadow-md p-2 rounded-md">
          <h2 className="flex gap-2 items-center p-1 text-indigo-800 font-semibold bg-gradient-to-r from-indigo-200 to-purple-200 rounded-md whitespace-nowrap">
            <FiBookOpen className="text-indigo-600" />
            {course?.courseOutput?.noOfChapters} Chapters
          </h2>
          <h2 className="text-xs p-2 text-purple-800 font-medium bg-gradient-to-l from-indigo-200 to-purple-200 rounded-md shadow-sm">
            {course?.level}
          </h2>
        </div>
        {displayUser && (
          <div className="flex gap-2 items-center mt-3">
            <Image 
              src={course?.userProfileImage} 
              width={30} 
              height={30}
              className="rounded-full"
            />
            <h2 className="text-sm">{course?.userName}</h2>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default CourseCard;
