import React from "react";

interface OverlayProps {
  start: boolean;
  message: string;
}

const Overlay: React.FC<OverlayProps> = ({ start, message }) => {
  if (!start) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75 wtf">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-t-4 border-blue-500 rounded-full mx-auto mb-4"></div>
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default Overlay;
