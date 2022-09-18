import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const TopViewDocument = ({ createAt }) => {
  const navigate = useNavigate();
  return (
    <div className="h-12 bg-dark-primary border-b-0.5 border-dark-third p-2 px-5 flex flex-nowrap justify-between ">
      <div className="items-center flex">
        <button
          onClick={() => navigate(-1)}
          className="border-r-0.5 border-dark-third"
        >
          <BiArrowBack size="28" className="mr-3" />
        </button>
        <span className="ml-3">{createAt}</span>
      </div>
      <div className="justify-end flex items-center ">
        <AiFillDelete size="28" />
        <IoIosArrowBack
          size="28"
          className="ml-3 border-l-0.5 border-dark-third"
        />
        <IoIosArrowForward size="28" />
      </div>
    </div>
  );
};

export default TopViewDocument;
