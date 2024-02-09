import React from "react";

interface CredentialProps {
  imageUrl: string;
  title: string;
  description: string;
}

const Credential: React.FC<CredentialProps> = ({
  imageUrl,
  title,
  description,
}) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={imageUrl} alt="Sunset in the mountains" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
};

export default Credential;
