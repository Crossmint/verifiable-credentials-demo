"use client";

import React, { useState, useRef } from "react";
import { useCredentials } from "@context/credentials";
import { courses, Course } from "../../utils/courses";
import CourseCard from "@components/CourseCard";
import { FaExclamationCircle } from "react-icons/fa";
import Modal from "@components/Modal";
import Overlay from "@components/Overlay";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course>();
  const [testFailed, setTestFailed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);

  const credentialContext = useCredentials();
  const collections = credentialContext?.collections;
  const wallet = credentialContext?.wallet;

  let completed = credentialContext?.completedCourses;

  const openCourse = (id: string) => {
    const course = courses.find((course) => course.id === id);
    setIsModalOpen(true);
    setCurrentCourse(course);
  };

  const submitForm = () => {
    if (formRef.current) {
      setIsProcessing(true);
      scoreTest();
    }
  };

  const scoreTest = async () => {
    console.log("currentCourse:", currentCourse);
    console.log("answers:", answers);

    let score = 0;

    currentCourse?.test.forEach((quiz, index) => {
      if (quiz.answer.includes(answers[`question-${index}`])) {
        score++;
      }
    });

    console.log(`Score: ${score}/${currentCourse?.test.length}`);
    const finalGrade = score / Object.keys(answers).length;

    if (finalGrade >= 0.8) {
      setTestFailed(false); // clear possible error message
      completed?.push(currentCourse?.id || "");

      console.log("passing grade / issue credential...");
      const data = {
        type: "course",
        courseId: currentCourse?.id,
        finalGrade,
        recipient: `polygon:${wallet?.address}`,
      };

      const courseCred = await issueCredential(data);

      console.log(courseCred);

      if (courseCred.credentialId) {
        setIsModalOpen(false);
        setIsProcessing(false);
      }
    } else {
      console.log("80% required to pass course");
      setTestFailed(true);
      setIsProcessing(false);
    }
  };

  const issueCredential = async (credential: any) => {
    const response = await fetch("/api/issue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credential),
    });
    const data = await response.json();

    return data;
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
            completed={completed || []}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTestFailed(false);
        }}
        submit={submitForm}
      >
        <form ref={formRef}>
          <h2 className="text-2xl font-bold mb-4">{currentCourse?.name}</h2>

          {testFailed && (
            <div className="flex items-center bg-red-200 text-red-700 px-3 py-2 my-4 rounded">
              <FaExclamationCircle className="mr-2" />
              <span>You failed the test. Please try again.</span>
            </div>
          )}

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

      <Overlay start={isProcessing} message="Processing..." />
    </>
  );
};

export default Page;
