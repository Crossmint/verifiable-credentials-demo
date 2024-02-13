import React, { useEffect, useState } from "react";
import Image from "next/image";

interface NewStudentProps {}

const NewStudent: React.FC<NewStudentProps> = ({}) => {
  useEffect(() => {}, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create Your Student ID</h2>
      <div className="flex space-x-4">
        <div className="flex flex-col w-full">
          <label htmlFor="firstName" className="text-sm text-gray-600">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            placeholder="Satoshi"
            className="border p-2 rounded flex-1"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="lastName" className="text-sm text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            placeholder="Nakamoto"
            className="border p-2 rounded flex-1"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="secret" className="text-sm text-gray-600">
          Secret
        </label>
        <textarea
          name="secret"
          placeholder="I think pineapple on pizza is okay, but pepperoni is better"
          rows={4}
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
};

export default NewStudent;
