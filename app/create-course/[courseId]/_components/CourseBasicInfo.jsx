import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TbPuzzleFilled } from "react-icons/tb";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { storage } from "@/configs/firebaseConfig";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { CourseList } from "@/configs/schema";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData ,edit=true}) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(()=>{
    if (course) {
      setSelectedFile(course?.cousreBanner)
    }
  },[course])
  /**
   * Select file and Upload to Firebase Storage *
   * @param {*} event
   */
  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(URL.createObjectURL(file));

    const fileName = Date.now() + ".jpg";
    const storageRef = ref(storage, "ai-course/" + fileName);

    try {
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      console.log("Upload File Complete");

      // Get the download URL after successful upload
      const downloadUrl = await getDownloadURL(storageRef);
      console.log(downloadUrl);

      // Update the database with the new course banner URL
      await db
        .update(CourseList)
        .set({
          cousreBanner: downloadUrl, // Updated to match schema
        })
        .where(eq(CourseList.id, course?.id)); // Ensure course.id is defined
      console.log("Database update complete");
    } catch (error) {
      console.error("Error during file upload or database update:", error);
    }
  };
  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl flex gap-3">
            {course?.courseOutput?.course?.name}
            
            {edit&&<EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.course?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <TbPuzzleFilled />
            {course?.category}
          </h2>
          {!edit&&<Link href={'/course/'+course?.courseId+"/start"}>
            <Button className="w-full mt-6">Start</Button>
          </Link>}
        </div>

        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : "/Untitled design.svg"}
              width={200}
              height={200}
              className="w-full rounded-xl h-[250px] object-cover bg-blue-100 cursor-pointer transition-all duration-600 hover:bg-gradient-to-r from-indigo-400 via-purple-300 to-purple-400"
            />
          </label>

          {edit&&<input
            type="file"
            id="upload-image"
            className="opacity-0"
            onChange={onFileSelected}
          />}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
