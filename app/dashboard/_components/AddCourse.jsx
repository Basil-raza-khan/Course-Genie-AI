"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap"; 
import Link from "next/link";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function AddCourse() {
  const { user } = useUser();
  const textRef = useRef();
  const pRef = useRef();
  const h2Ref = useRef();
  const [userCourseList, setUserCourseList] = useContext(UserCourseListContext);


  useEffect(() => {
    const text = user?.fullName;
    if (text) {
      const chars = text.split("");
      const tl = gsap.timeline();

      chars.forEach((char, index) => {
        tl.to(
          textRef.current,
          {
            textContent: text.substring(0, index + 1),
            ease: "none",
          },
          index * 0.1
        );
      });

      // Animate h2 tag
      gsap.fromTo(
        h2Ref.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
      );

      // Animate p tag
      gsap.fromTo(
        pRef.current,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1.5, delay: 0.5, ease: "elastic.out(1, 0.3)" }
      );
    }
  }, [user]);

  return (
    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg shadow-md">
      <div>
        <h2 className="text-2xl mb-3" ref={h2Ref}>
          Hello, <span className="font-bold" ref={textRef}></span>
        </h2>
        <p className="text-gray-500 xs" ref={pRef}>
          Create new course with AI, Share with your friends and earn from it
        </p>
      </div>
      <Link href={userCourseList>=5?'/dashboard/upgrade' : "/create-course"}>
        <Button>+ Create AI Course</Button>
      </Link>
    </div>
  );
}

export default AddCourse;
