import React from "react";
import { AiOutlineFile } from "react-icons/ai";

const ChatDisplayFile = ({ message }) => {
  return (
    <>
      {message.file.length > 0 &&
        message.file.map((f) => {
          if (f.resource_type === "image" && f.fileUrl.slice(-3) !== "pdf") {
            return (
              <div className="mt-1">
                <a key={f._id} href={f.fileUrl} className="" target="_blank">
                  <img
                    src={f.fileUrl}
                    alt="image"
                    className="h-32 w-fit rounded"
                  />
                </a>
              </div>
            );
          }
          if (f.resource_type === "video") {
            return (
              <video key={f._id} className="rounded h-48 w-fit mt-1" controls>
                <source src={f.fileUrl} />
              </video>
            );
          }
          return (
            <div key={f._id} className="rounded h-8 w-32 bg-slate-500 flex ">
              <div>
                <AiOutlineFile className="h-8 w-8" />
              </div>
              <a href={f.fileUrl} download className="truncate w-full">
                file
              </a>
            </div>
          );
        })}
    </>
  );
};

export default ChatDisplayFile;
