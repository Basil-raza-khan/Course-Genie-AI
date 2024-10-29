"use client";
import Header from "@/app/_components/Header";
import ChapterList from "@/app/create-course/[courseId]/_components/ChapterList";
import CourseBasicInfo from "@/app/create-course/[courseId]/_components/CourseBasicInfo";
import CourseDetails from "@/app/create-course/[courseId]/_components/CourseDetails";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion

function Course({ params }) {
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params) GetCourse();
  }, [params]);

  const GetCourse = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));

    setCourse(result[0]);
    setLoading(false);
    console.log(result);
  };

  const customElasticEasing = [0.87, -0.41, 0.19, 1.44]; // Custom easing function

  const animationProps = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0, transition: { duration: 1.5, delay: 0.5, ease: customElasticEasing } },
  };

  return (
    <div>
      <Header />
      <div className="px-10 p-10 md:px-20 lg:px-44">
        {loading ? (
          <div className="w-full bg-slate-200 animate-pulse rounded-lg h-[270px] mt-5"></div>
        ) : (
          <motion.div {...animationProps}>
            <CourseBasicInfo course={course} edit={false} />
          </motion.div>
        )}

        {loading ? (
          <div className="w-full bg-slate-200 animate-pulse rounded-lg h-[270px] mt-5"></div>
        ) : (
          <motion.div {...animationProps}>
            <CourseDetails course={course} />
          </motion.div>
        )}

        {loading ? (
          <div className="w-full bg-slate-200 animate-pulse rounded-lg h-[270px] mt-5"></div>
        ) : (
          <motion.div {...animationProps}>
            <ChapterList course={course} edit={false} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Course;
