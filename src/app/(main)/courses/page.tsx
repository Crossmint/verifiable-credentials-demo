"use client";

import React, { useState, useRef } from "react";
import { useCredentials } from "@context/credentials";
import { courses, Course } from "./courses";
import CourseCard from "@components/CourseCard";
import Modal from "@components/Modal";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course>();
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  const credentialContext = useCredentials();
  const collections = credentialContext?.collections;
  const wallet = credentialContext?.wallet;

  //console.log("courses", collections);

  const openCourse = (id: string) => {
    const course = courses.find((course) => course.id === id);
    setIsModalOpen(true);
    setCurrentCourse(course);
  };

  const submitForm = () => {
    if (formRef.current) {
      scoreTest();
    }
  };

  const scoreTest = () => {
    console.log("currentCourse:", currentCourse);
    console.log("answers:", answers);

    let score = 0;

    currentCourse?.test.forEach((quiz, index) => {
      if (quiz.answer.includes(answers[`question-${index}`])) {
        score++;
      }
    });

    console.log(`Score: ${score}/${currentCourse?.test.length}`);
  };

  return (
    <>
      <h1 className="text-2xl py-3 mb-10">
        Blockchain Fundamentals | Course List
      </h1>

      <div className="flex flex-wrap justify-start items-center gap-4">
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            collections={collections || []}
            openCourse={openCourse}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submit={submitForm}
      >
        <form ref={formRef}>
          <h2 className="text-2xl font-bold mb-4">{currentCourse?.name}</h2>
          {currentCourse &&
            currentCourse.test.map((quiz, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  {index + 1}. {quiz.question}
                </h3>
                {quiz.options.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2 mb-2">
                    <input
                      type="radio"
                      id={`option-${index}-${i}`}
                      name={`question-${index}`}
                      value={option}
                      className="form-radio text-blue-500 h-5 w-5"
                      onChange={(e) =>
                        setAnswers({
                          ...answers,
                          [`question-${index}`]: e.target.value,
                        })
                      }
                    />
                    <label
                      htmlFor={`option-${index}-${i}`}
                      className="text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
        </form>
      </Modal>
    </>
  );
};

export default Page;
