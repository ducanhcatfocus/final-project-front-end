import React from "react";
import { AiOutlineDownload } from "react-icons/ai";

const ThirdViewDocument = ({ title, content, file }) => {
  return (
    <div className="grid px-5 mb-auto">
      <span className=" font-semibold text-2xl mb-5">{title}</span>
      <span className=" font-light border-b-0.5 border-dark-third pb-5">
        {content}
      </span>
      {file && (
        <div className="h-24 w-36 bg-dark-third mt-3 p-1 flex mb-auto">
          <div className="h-6 w-6 bg-red-600 text-xs">
            <span className="">PDF</span>
          </div>
          <span>{file.filename}</span>
          <a href={file.url}>
            <AiOutlineDownload size="24" />
          </a>
        </div>
      )}
    </div>
  );
};

export default ThirdViewDocument;
