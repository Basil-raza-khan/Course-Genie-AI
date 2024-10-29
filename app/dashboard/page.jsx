"use client"
import { UserButton } from '@clerk/nextjs';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import DashboardLayout from './layout';
import AddCourse from './_components/AddCourse';
import UserCourseList from './_components/UserCourseList';

function Dashboard() {
  const addCourseRef = useRef(null);
  const courseListRef = useRef(null);

  useEffect(() => {
    // Animating the AddCourse component
    gsap.fromTo(
      addCourseRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Animating the UserCourseList component
    gsap.fromTo(
      courseListRef.current,
      { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 2, delay: 0.5, ease: "elastic.out(1, 0.3)" }
    );
  }, []);

  return (
    <div>
      <div ref={addCourseRef}>
        <AddCourse />
      </div>
      <div ref={courseListRef}>
        <UserCourseList />
      </div>
    </div>
  );
}

export default Dashboard;
