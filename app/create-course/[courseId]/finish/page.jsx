"use client";
import { db } from "@/configs/db";
import { Chapters, CourseList } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "../_components/CourseBasicInfo";
import { useRouter } from "next/navigation";
import { LuCopyCheck } from "react-icons/lu";
import { gsap } from "gsap"; // Import GSAP
import confetti from "canvas-confetti"; // Import confetti library

function FinishScreen({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (params) {
      GetCourse();
      // Trigger the confetti and animation after loading the course
      setTimeout(() => {
        triggerConfetti(); // Trigger confetti
        animateElements(); // Animate elements
      }, 500); // Delay to allow course loading
    }
  }, [params, user]);

  const triggerConfetti = () => {
    const duration =1000; // 2 seconds for a shorter burst
    const end = Date.now() + duration;

    // Confetti function to generate multiple confetti bursts
    (function frame() {
      const timeLeft = end - Date.now();
      if (timeLeft <= 0) return;

      // Confetti configuration for a medium amount
      confetti({
        particleCount: 40, // Medium particle count
        angle: Math.random() * 360,
        spread: 40, // Less spread for a more concentrated effect
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2, // Allow the confetti to fall from the top
        },
        colors: ['#FF0D00', '#00FF00', '#0000FF', '#FFFF00'], // Different colors
      });

      requestAnimationFrame(frame);
    })();
  };

  const animateElements = () => {
    // Animate the congratulations message and course URL
    gsap.fromTo(
      ".congrats-message",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
    );

    gsap.fromTo(
      ".course-url",
      { opacity: 0, y: 5 },
      { opacity: 1, y: 0, duration: 0.5, delay: 0.5, ease: "power1.out" }
    );

    gsap.fromTo(
      ".copy-icon",
      { scale: 0 },
      { scale: 1, duration: 0.3, delay: 0.8, ease: "back.out(1.7)" }
    );
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/course/view/${course?.courseId}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Hide the message after 1 second
  };

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setCourse(result[0]);
    console.log(result);
  };

  return (
    <div className="px-10 md:px-20 lg:px-44 my-7 mt-10">
      {/* Animated congrats message */}
      <h2 className="congrats-message text-center font-bold text-3xl my-3 text-primary">
        Congrats! Your Course is Ready
      </h2>
      <CourseBasicInfo course={course} refreshData={() => console.log()} />
      <h2 className="mt-3 font-bold course-url">Course URL: </h2>
      <div className="text-center text-gray-500 border p-2 rounded-md flex gap-5 items-center">
        <span
          className={`transition-colors duration-300 ${
            copied ? "text-green-600" : "text-gray-500"
          }`}
        >
          {process.env.NEXT_PUBLIC_HOSTNAME}/course/view/{course?.courseId}
        </span>
        <LuCopyCheck
          className="h-5 w-5 cursor-pointer text-gray-500 hover:text-indigo-800 transition-colors duration-300 copy-icon"
          onClick={handleCopy}
        />
        {copied && (
          <span className="text-indigo-800 underline transition-all duration-500">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}

export default FinishScreen;
