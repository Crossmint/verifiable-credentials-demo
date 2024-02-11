"use client";

import React from "react";
import { useCredentials } from "@context/credentials";
import { courses } from "./courses";
import CourseCard from "@components/CourseCard";

const Page = () => {
  const credentialContext = useCredentials();
  const credentials = credentialContext?.credentials;
  const wallet = credentialContext?.wallet;

  console.log("profile page.tsx / courses: ", courses);

  return (
    <>
      <h1 className="text-xl text-white">Courses</h1>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {courses?.map((course) => (
          <CourseCard
            key={course.name}
            imageUrl={course.image}
            title={course.name}
            description={course.description}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
