import React from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";

const AllDocumentTop = ({
  getMoreDocumentHandle,
  getBackDocumentHandle,
  isFinalPage,
  page,
}) => {
  return (
    <>
      <div className="items-center flex">
        <div className="border-r-0.5 border-dark-third pr-3">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 text-blue-600 bg-gray-100 dark:bg-gray-700 "
          />
        </div>
        <button className="hover:bg-dark-third ml-3 rounded">
          <AiFillDelete size="24" />
        </button>
      </div>
      <div className="justify-end flex items-center ">
        <span>show {isFinalPage < 20 ? isFinalPage : 20} documents</span>
        <button
          onClick={getBackDocumentHandle}
          disabled={page === "first"}
          className="ml-3 border-l-0.5 border-dark-third"
        >
          <IoIosArrowBack size="28" color={page == "first" && "gray"} />
        </button>
        <button onClick={getMoreDocumentHandle} disabled={page === "final"}>
          <IoIosArrowForward size="28" color={page === "final" && "gray"} />
        </button>
      </div>
    </>
  );
};

export default AllDocumentTop;
