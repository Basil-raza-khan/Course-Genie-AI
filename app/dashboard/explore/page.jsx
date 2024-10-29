"use client"
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout";
import { CourseList } from "@/configs/schema";
import { db } from "@/configs/db";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    setLoading(true);
    const result = await db.select().from(CourseList).limit(9).offset(pageIndex * 9);
    setCourseList(result);
    setLoading(false);
    setHasMore(result.length === 9); // Check if there are more courses to load
  };

  const handleNext = () => {
    if (hasMore) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Explore More Projects</h2>
      <p>Explore more projects built with AI by other users</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
        {courseList.map((course, index) => (
          <div key={course.id}> {/* Provide a unique key */}
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>

      {loading && <div className="text-center mt-5">Loading...</div>} {/* Loading state */}

      <div className="flex justify-between mt-5">
        {pageIndex !== 0 && <Button onClick={handlePrevious}>Previous</Button>}
        <Button onClick={handleNext} disabled={!hasMore}>Next</Button>
      </div>
    </div>
  );
}

export default Explore;
