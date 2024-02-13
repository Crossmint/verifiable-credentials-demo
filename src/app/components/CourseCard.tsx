import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Collection } from "@context/credentials";
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
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  collections,
  openCourse,
}) => {
  const [isAvailable, setIsAvailable] = useState(false);
  useEffect(() => {
    const available = isCourseAvailable();
    setIsAvailable(available);
    console.log(`Is ${course.name} available: ${isAvailable}`);
  }, [course, collections]);

  const isCourseAvailable = () => {
    // Loop through each prerequisite of the course
    for (let prerequisite of course.prerequisites) {
      // Check if the prerequisite is present in the collections
      let isPrerequisitePresent = collections.some((collection) =>
        collection.nfts.some((nft: any) =>
          nft.metadata.attributes.some(
            (attribute: any) =>
              attribute.trait_type === "credentialType" &&
              attribute.value === prerequisite
          )
        )
      );

      // If the prerequisite is not present in the collections, return false
      if (!isPrerequisitePresent) {
        console.log("failed check");
        return false;
      }
    }

    console.log("passed check");
    // If all prerequisites are present in the collections, return true
    return true;
  };

  return (
    <div className="course-img flex bg-white rounded overflow-hidden shadow-lg relative">
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

        {isAvailable && (
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => openCourse(course.id)}
          >
            Take Course
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
