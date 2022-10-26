import React from "react";
import { BsImages, BsEmojiNeutral } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { useRef } from "react";
import { typingMessage } from "../../../socket/socketConnection";

let check = false;

const ChatInput = ({
  changeFileHandler,
  chosenChatDetails,
  handleKeyDown,
  chat,
  setChat,
  check,
}) => {
  const [toggleEmoji, setToggleEmoji] = useState(false);
  const inputRef = useRef();

  const onEmojiClick = (emojiObject) => {
    setChat(chat + emojiObject.emoji);
    setToggleEmoji(false);
    inputRef.current.focus();
  };

  const handleTextChange = (e) => {
    setChat(e.target.value);
    if (e.target.value == "") {
      typingMessage({ id: chosenChatDetails.id, isTyping: false });
      check = false;
    }
    if (e.target.value !== "" && !check) {
      typingMessage({ id: chosenChatDetails.id, isTyping: true });
      check = true;
    }
  };
  return (
    <div className="flex">
      <label
        htmlFor="fileId"
        className="p-2 rounded-full hover:bg-dark-third cursor-pointer mr-1"
      >
        <BsImages className="h-7 w-7" />
        <input
          hidden
          type="file"
          name="file"
          id="fileId"
          onChange={changeFileHandler}
        />
      </label>
      <div className="p-2 rounded-full hover:bg-dark-third cursor-pointer mr-1 relative">
        {toggleEmoji && (
          <div className="absolute bottom-12">
            <EmojiPicker
              height={400}
              width={250}
              searchDisabled
              skinTonesDisabled
              onEmojiClick={onEmojiClick}
              emojiStyle="google"
              lazyLoadEmojis
              categories={[
                {
                  category: "suggested",
                  name: "Recently Used",
                },
                {
                  category: "smileys_people",
                  name: "Smileys & People",
                },
              ]}
            />
          </div>
        )}
        <BsEmojiNeutral
          onClick={() => setToggleEmoji(!toggleEmoji)}
          className="h-7 w-7"
        />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder={`Message to ${chosenChatDetails.name}`}
        className="bg-transparent rounded border-0.5 dark:border-dark-subtle border-light-subtle w-full text-lg outline-none dark:focus:border-white focus:border-primary p-1 dark:text-white peer transition"
        maxLength={500}
        value={chat}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default ChatInput;
