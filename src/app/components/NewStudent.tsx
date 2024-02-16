import React, { useEffect, useState } from "react";

interface NewStudentProps {
  wallet: string;
}

const NewStudent: React.FC<NewStudentProps> = ({ wallet }) => {
  useEffect(() => {}, []);

  const isDisabled = !wallet;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create Your Student ID</h2>

      {isDisabled ? (
        <div className="p-4 bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500">
          <p className="font-bold">Note:</p>
          <p>You must connect a wallet to create your student ID.</p>
        </div>
      ) : null}

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
            disabled={isDisabled}
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
            disabled={isDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default NewStudent;
