import React from "react";
import { Link } from "react-router-dom";

const AllDocumentBody = ({
  receiverId,
  titleLength,
  contentLength,
  title,
  content,
  createAt,
  id,
  path,
}) => {
  return (
    <li className="border-b-0.5 border-light-third dark:border-dark-third hover:bg-gray-100 dark:hover:bg-gray-700 flex  ">
      <div className="items-center p-2">
        <input
          type="checkbox"
          className="w-3.5 h-3.5 text-blue-600 bg-gray-100 dark:bg-gray-700"
        />
      </div>
      <div className="flex items-center p-2 pr-4 font-normal text-gray-900  dark:text-white text-xs lg:text-lg w-full">
        <div className="w-1/5">
          <Link to="/" className="">
            <span className="whitespace-nowrap ">To: {receiverId}</span>
          </Link>
        </div>

        <div className="flex justify-between w-full">
          <Link to={`/${path}/${id}`} className="w-full">
            <span className="whitespace-nowrap font-semibold">
              {titleLength > 30 ? title.slice(0, 20) + "..." : title} -{" "}
            </span>
            <span className="whitespace-nowrap font-light">
              {contentLength > 30 ? content.slice(0, 40) + "..." : content}
            </span>
          </Link>
          <div className="w-32 grid">
            <span className="whitespace-nowrap justify-self-end font-light">
              {createAt.slice(0, 10)}
            </span>
          </div>
        </div>

        {/* <a href={d.document.doc.url}>
                {d.document.doc.filename.length > 30
                  ? d.document.doc.filename.slice(0, 20) + "..."
                  : d.document.doc.filename}
              </a> */}
      </div>
    </li>
  );
};

export default AllDocumentBody;
