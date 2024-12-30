import React from "react";

interface InfoContainerProps {
  title: string;
  info: number;
  icon: React.ReactNode;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ title, info, icon }) => {
  return (
    <div className="w-80 h-24 border border-gray-200 rounded-lg flex items-center  p-4">
      <div className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div className="flex flex-col items-start ml-6">
        <p className="text-xl font-bold">
          {Math.floor(info)} {title === "Earning" && "$"}
        </p>
        <span className="text-lg font-semibold text-gray-500">{title}</span>
      </div>
    </div>
  );
};

export default InfoContainer;
