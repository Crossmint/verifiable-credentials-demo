import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Collection } from "@context/credentials";
import { FaCheckCircle } from "react-icons/fa";
import { Fira_Code } from "next/font/google";

const fira = Fira_Code({ subsets: ["latin"] });

interface Course {
  id: string;
  image: string;
  name: string;
  description: string;
  prerequisites: string[];
}

interface CourseCardProps {
  course: Course;
  collections: Collection[];
  openCourse: Function;
  completed: string[];
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  collections,
  openCourse,
  completed,
}) => {
  const [prereqsCompleted, setPrereqsCompleted] = useState(false);
  const [courseCompleted, setCourseCompleted] = useState(false);

  useEffect(() => {
    isCourseCompleted();
    arePrereqsCompleted();
  }, [collections, completed]);

  const isCourseCompleted = () => {
    if (completed.includes(course.id)) {
      setCourseCompleted(true);
    }
  };

  const arePrereqsCompleted = () => {
    setPrereqsCompleted(
      course.prerequisites.every((prerequisite) =>
        completed.includes(prerequisite)
      )
    );
  };

  const grayScale = courseCompleted ? "" : "course-img";

  return (
    <div
      className={`${grayScale} flex bg-white rounded overflow-hidden shadow-lg relative`}
    >
      <Image src={course.image} alt="Course image" width={256} height={256} />

      <div className="absolute top-3 right-3 bg-gray-400 text-white py-1 px-2 rounded">
        <span className={`text-sm ${fira.className}`}>{course.id}</span>
      </div>

      <div className="p-4 w-full">
        <div className="font-bold text-xl mb-2">{course.name}</div>
        <p className="text-gray-700 text-base">{course.description}</p>

        <h4 className="font-bold my-2">Prerequisites</h4>
        <ul className={`flex flex-wrap ${fira.className}`}>
          {course.prerequisites.map((prerequisite, index) => (
            <li
              key={index}
              className="mr-2 mb-2 bg-blue-200 text-blue-700 px-2 py-1 rounded"
            >
              {prerequisite}
            </li>
          ))}
        </ul>

        {prereqsCompleted && !courseCompleted && (
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => openCourse(course.id)}
          >
            Take Course
          </button>
        )}

        {courseCompleted && (
          <div className="flex items-center max-w-32 bg-green-200 text-green-700 mt-4 py-2 px-4 rounded">
            <FaCheckCircle className="mr-1" />
            <span>Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
