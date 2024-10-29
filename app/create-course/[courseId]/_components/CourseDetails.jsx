import React from 'react'
import { BsBarChart } from "react-icons/bs";
import { TbClockHour5 } from "react-icons/tb";
import { IoBookOutline } from "react-icons/io5";
import { FaRegCirclePlay } from "react-icons/fa6";

function CourseDetails({course}) {
  return (
    <div className='border p-6 rounded-xl shadow-sm mt-3'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
            <div className='flex gap-2'>
                <BsBarChart className='text-4xl text-primary '/>
                <div>
                    <h2 className='text-xs text-gray-600'>Skill Level</h2>
                    <h2 className='font-medium text-lg'>{course?.level}</h2>
                </div>
            </div>
            
            <div className='flex gap-2'>
                <TbClockHour5 className='text-4xl text-primary '/>
                <div>
                    <h2 className='text-xs text-gray-600'>Duration</h2>
                    <h2 className='font-medium text-lg'>{course?.courseOutput?.duration}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <IoBookOutline className='text-4xl text-primary '/>
                <div>
                    <h2 className='text-xs text-gray-600'>No of Chapters</h2>
                    <h2 className='font-medium text-lg'>{course?.courseOutput?.noOfChapters}</h2>
                </div>
            </div>
            <div className='flex gap-2'>
                <FaRegCirclePlay className='text-4xl text-primary '/>
                <div>
                    <h2 className='text-xs text-gray-600'>Video Included?</h2>
                    <h2 className='font-medium text-lg'>{course?.includeVideo}</h2>
                </div>
            </div>

        </div>
    </div>
  )
}

export default CourseDetails    