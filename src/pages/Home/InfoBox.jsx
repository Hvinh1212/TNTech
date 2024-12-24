import React from "react";

function InfoBox({ icon: Icon, title, content }) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/4 flex items-center p-4 border rounded-lg shadow-sm bg-white max-w-sm mx-auto h-32"> {/* Chiều cao có thể điều chỉnh */}
      <div className="mr-4 text-blue-500">
        {Icon && <Icon className="w-8 h-8" />}
      </div>
      <div className="flex-1">
        <h3 className="text-blue-600 font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{content}</p>
      </div>
    </div>
  );
}

export default InfoBox;