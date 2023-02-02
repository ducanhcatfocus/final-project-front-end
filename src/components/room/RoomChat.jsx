import React, { useEffect, useRef, useState } from "react";
import { sendChatRoom } from "../../socket/socketConnection";
import { AiOutlineCopy } from "react-icons/ai";
import { MdDone } from "react-icons/md";

const RoomChat = ({
  roomId,
  roomMessages,
  openInfo,
  roomParticipants,
  userName,
}) => {
  const [chat, setChat] = useState("");
  const [copy, setCopy] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
  }, [roomMessages]);

  const handleMessageChange = (e) => {
    setChat(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && chat.length > 0) {
      setChat("");
      sendChatRoom({ roomId, chat, userName });
    }
  };
  return (
    <div className="w-64 p-2 h-full ">
      {openInfo ? (
        <div className="dark:bg-dark-third bg-light-primary h-full rounded p-1 flex flex-col justify-between">
          <div className="text-center h-10 font-semibold">Room ID</div>
          <div className="flex justify-between text-xs dark:text-gray-300 mb-2">
            <div>{roomId}</div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
                setCopy(true);
              }}
              className="border-0.5 rounded-lg hover:bg-slate-500"
            >
              {copy ? (
                <MdDone className="h-7 w-7" />
              ) : (
                <AiOutlineCopy className="h-7 w-7" />
              )}
            </button>
          </div>
          <div className="text-center h-10 font-semibold">Participants</div>
          <ul className="mb-auto overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 px-2">
            {roomParticipants.map((r, index) => (
              <li
                key={index}
                className="break-all mb-2 flex justify-start gap-1"
              >
                <img
                  src={r.userAvatar}
                  className="h-10 w-10 bg-white rounded-full"
                />
                <div className="text-sm truncate">
                  <p>{r.userName}</p>
                  <p>{r.userMail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="dark:bg-dark-third bg-light-primary h-full rounded p-1 flex flex-col justify-between">
          <div className="text-center h-20 font-semibold">Room Chat</div>
          <ul className="mb-auto h-96 overflow-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 px-2">
            {roomMessages.map((r, index) => (
              <li key={index} className="break-all mb-2">
                <div className="flex justify-between">
                  <p className="font-semibold capitalize text-lg">
                    {r.userName}
                  </p>
                  <p className="font-light text-sm text-gray-400">{r.time}</p>
                </div>
                <div className="font-light">{r.chat}</div>
              </li>
            ))}
            <div ref={bottomRef} />
          </ul>
          <div className="h-12">
            <input
              value={chat}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="send message to everyone"
              className=" p-1 h-full w-full rounded-lg text text-gray-900 dark:bg-gray-50 dark:placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomChat;
