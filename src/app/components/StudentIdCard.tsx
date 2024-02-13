import { FaBook, FaGraduationCap, FaUniversity } from "react-icons/fa";

const StudentIdCard = () => {
  return (
    <div className="flex items-start bg-white p-4 rounded-lg shadow mb-4 max-w-sm relative">
      <div className="flex flex-col space-y-2">
        <img
          className="w-32 h-32 rounded mr-4"
          src="https://sapphire-controlled-herring-537.mypinata.cloud/ipfs/QmUi84qorq5CBi8AUn5JpX77BPP9ARkkWdssfFNpSsRU86"
          alt="Student ID"
        />
        <h3 className="font-bold">Student ID</h3>
        <div className="w-32 bg-gray-300 h-4 rounded-md "></div>
      </div>

      <div className="flex flex-row items-center h-full justify-center space-x-5">
        <div className="flex flex-col space-y-3">
          <h3 className="font-bold">Shibetoshi University</h3>
          <div className="flex flex-row animate-pulse space-x-3">
            <div className="w-24 bg-gray-300 h-4 rounded-md "></div>
            <div className="w-24 bg-gray-300 h-4 rounded-md "></div>
          </div>
          <div className="w-36 bg-gray-300 h-4 animate-pulse rounded-md "></div>
          <div className="flex flex-row animate-pulse space-x-2">
            <div className="w-16 bg-gray-300 h-4 rounded-md "></div>
            <div className="w-16 bg-gray-300 h-4 rounded-md "></div>
            <div className="w-16 bg-gray-300 h-4 rounded-md "></div>
          </div>
          <div className="w-40 bg-gray-300 h-4 animate-pulse rounded-md "></div>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 flex text-gray-400 text-2xl">
        <FaBook title="Book Club Member" className="mr-4" />
        <FaGraduationCap title="Alumni Association Member" className="mr-4" />
        <FaUniversity title="University Staff Member" />
      </div>
    </div>
  );
};

export default StudentIdCard;
