import React from "react";
import {
  AiOutlineClose,
  AiOutlineFile,
  AiOutlinePlayCircle,
} from "react-icons/ai";

const ChatFile = ({ file, handleRemoveFile }) => {
  return (
    <div className="h-20 flex p-2 border-t">
      {file.map((f, index) => {
        if (f.type.startsWith("image")) {
          return (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(f)}
                alt="image"
                className="h-16 w-16 rounded mr-2"
              />
              <AiOutlineClose
                onClick={() => handleRemoveFile(index)}
                className="h-5 w-5 absolute top-0 right-2 rounded-full bg-dark-third hover:bg-slate-600 p-1 border"
              />
            </div>
          );
        }
        if (f.type.startsWith("video")) {
          return (
            <div key={index} className="relative mr-2">
              <video className="h-16 w-16 rounded" muted>
                <source src={URL.createObjectURL(f)} type={f.type} />
              </video>
              <AiOutlinePlayCircle className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5" />
              <AiOutlineClose
                onClick={() => handleRemoveFile(index)}
                className="h-5 w-5 absolute top-0 right-0 rounded-full bg-dark-third hover:bg-slate-600 p-1 border"
              />
            </div>
          );
        }
        return (
          <div
            key={index}
            className="w-16 h-16 truncate bg-blue-500 mr-2 relative"
          >
            <AiOutlineFile />
            {f.name}
            <AiOutlineClose
              onClick={() => handleRemoveFile(index)}
              className="h-5 w-5 absolute top-0 right-0 rounded-full bg-dark-third hover:bg-slate-600 p-1 border"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChatFile;
