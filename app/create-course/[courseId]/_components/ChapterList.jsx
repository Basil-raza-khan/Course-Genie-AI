import React from "react";
import { TbClockHour5 } from "react-icons/tb";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import EditChapterList from "./EditChapterList";

function ChapterList({ course, refreshData,edit=true}) {
  return (
    <div className="mt-4">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-3">
        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
          <div className="border p-5 rounded-lg mb-2 flex items-center justify-between gap-2">
            <div className="flex gap-5 items-center">
              <h2 className="bg-primary h-10 w-10 flex-none text-white rounded-full text-center p-2">
                {index + 1}
              </h2>
              <div>
                <h2 className="font-medium text-lg flex gap-3">{chapter?.name}
                  {edit&&<EditChapterList course={course} index={index} refreshData={()=>refreshData(true)}/>}</h2>
                <p className="text-sm text-gray-500">{chapter?.about}</p>
                <p className="flex gap-2 items-center  text-primary">
                  <TbClockHour5 />
                  {chapter?.duration}
                </p>
              </div>
            </div>
            <IoIosCheckmarkCircleOutline className="text-4xl text-gray-200 flex-none"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
