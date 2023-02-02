import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

const ScrollToBot = ({ isBottom, toggleFriend, bottomRef }) => {
  return (
    <>
      {!isBottom && toggleFriend && (
        <button
          onClick={() => {
            bottomRef.current.scrollIntoView({ block: "start" });
          }}
          className="fixed w-12 h-12 p-1 dark:bg-dark-third bg-light-secondary rounded-full dark:hover:bg-slate-500 hover:bg-slate-300 hover:border-0.5 dark:hover:border-dark-third hover:border-light-primary bottom-36 left-0 mx-auto md:right-1/3 lg:right-1/4 "
        >
          <AiOutlineArrowDown className="w-10 h-10 text-white" />
        </button>
      )}
      {!isBottom && !toggleFriend && (
        <button
          onClick={() => {
            bottomRef.current.scrollIntoView({ block: "start" });
          }}
          className="fixed w-12 h-12 p-1 bg-dark-third rounded-full hover:bg-slate-500 hover:border-0.5 hover:border-dark-third bottom-36  left-0 mx-auto right-0"
        >
          <AiOutlineArrowDown className="w-10 h-10" />
        </button>
      )}
    </>
  );
};

export default ScrollToBot;
