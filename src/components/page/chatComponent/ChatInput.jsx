import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ChatInput = ({
  changeFileHandler,
  chosenChatDetails,
  handleKeyDown,
  handleMessageChange,
  chat,
}) => {
  return (
    <div className="flex">
      <label htmlFor="fileId" className="">
        <AiOutlinePlusCircle className="h-8 w-8" />
        <input
          hidden
          type="file"
          name="file"
          id="fileId"
          onChange={changeFileHandler}
        />
      </label>
      <input
        type="text"
        placeholder={`Message to ${chosenChatDetails.name}`}
        className="bg-transparent rounded border-0.5 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-white focus:border-primary p-1 dark:text-white peer transition"
        maxLength={50}
        value={chat}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ChatInput;
