import React from "react";
import Image from "next/image";

interface CourseCardProps {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  openCourse: Function;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  imageUrl,
  title,
  description,
  openCourse,
}) => {
  return (
    <div className="course-img flex bg-white rounded overflow-hidden shadow-lg">
      <Image src={imageUrl} alt="Course image" width={256} height={256} />
      <div className="p-4 w-full">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => openCourse(id)}
        >
          Take Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
