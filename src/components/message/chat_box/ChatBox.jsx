import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {
  AiOutlineLine,
  AiOutlineClose,
  AiOutlineFullscreen,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";

import { motion } from "framer-motion";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendDirectMessage,
  typingMessage,
} from "../../../socket/socketConnection";
import { getActions } from "../../../store/actions/chatAction";
import ChatFile from "./../chatComponent/ChatFile";
import ChatInput from "./../chatComponent/ChatInput";
import ChatDisplayFile from "./../chatComponent/ChatDisplayFile";
import SkeLoader from "./../chatComponent/SkeLoader";

const convertDate = (date) => {
  const newDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return newDate;
};

const checkOnlineUsers = (friend, onlineUsers = []) => {
  const isUserOnline = onlineUsers.find((user) => user.userId === friend.id);
  friend.isOnline = isUserOnline ? true : false;

  return (online = friend);
};
let online;

let check = false;

const ChatBox = ({
  chosenChatDetails,
  setMessages,
  messages,
  typing,
  closeChat,
  loadMore,
  page,
  setPage,
  onlineUsers,
}) => {
  const [open, setOpen] = useState(true);
  const [chat, setChat] = useState("");
  const [goLeft, setGoLeft] = useState(0);
  const [file, setFile] = useState([]);

  const [isBottom, setIsBottom] = useState(true);

  const scrollRef = useRef(null);
  const bottomRef = useRef(null);
  const loadRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (loadMore) {
      (async () => {
        await setMessages(chosenChatDetails.id, page);
        if (page === 0) {
          bottomRef.current?.scrollIntoView({ block: "start" });
          return;
        }
        loadRef.current?.scrollIntoView({ block: "start" });
      })();
    }
  }, [page, chosenChatDetails]);

  useEffect(() => {
    if (isBottom) {
      bottomRef.current?.scrollIntoView({ block: "start" });
    }
  }, [messages, typing, open]);

  const changeFileHandler = (event) => {
    if (event.target.files[0].size > 5242880) {
      alert("File is too big!");
      return;
    }
    if (file.length < 4) {
      setFile([...file, event.target.files[0]]);
      console.log(file);
    }
  };

  const handleRemoveFile = (index) => {
    setFile(file.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (
      (e.key === "Enter" && chat.length > 0) ||
      (e.key === "Enter" && file.length > 0)
    ) {
      sendDirectMessage({
        receiverId: chosenChatDetails.id,
        content: chat,
        file: file,
      });
      setChat("");
      setFile([]);
      typingMessage({ id: chosenChatDetails.id, isTyping: false });
      check = false;
      if (!isBottom) {
        bottomRef.current?.scrollIntoView({ block: "start" });
      }
    }
  };

  const handleScroll = (e) => {
    if (e.target.offsetHeight + e.target.scrollTop >= e.target.scrollHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
    if (e.target.scrollTop === 0 && loadMore) {
      setTimeout(() => {
        setPage(page);
      }, 1000);
    }
  };

  return (
    <>
      {open ? (
        <motion.div
          animate={{ x: goLeft }}
          transition={{ stiffness: 100 }}
          className="absolute bottom-0 right-0 h-96 w-80 dark:bg-dark-third bg-light-primary rounded-t-lg flex flex-col justify-between dark:text-white text-dark-secondary border dark:border-dark-secondary "
        >
          <div className="flex justify-between p-1 border-b-0.5 dark:border-dark-secondary">
            <div className="relative">
              <img
                src={chosenChatDetails.avatar}
                className="rounded-full p-1 w-12 h-12"
                alt="avatar"
              />
              {checkOnlineUsers(chosenChatDetails, onlineUsers).isOnline ? (
                <div className="absolute right-1 bottom-1 border-2 border-dark-secondary w-3 h-3 rounded-full bg-green-500"></div>
              ) : (
                <div className="absolute right-1 bottom-1 border-2 border-dark-secondary w-3 h-3 rounded-full bg-gray-500"></div>
              )}
            </div>
            <div className="grid ml-1">
              <span className="font-semibold">{chosenChatDetails.name}</span>
              {online.isOnline ? (
                <span className="font-light text-sm">Online</span>
              ) : (
                <span className="font-light text-sm">Offline</span>
              )}
            </div>
            <div className="ml-auto">
              <AiOutlineFullscreen
                className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1"
                onClick={() => navigate("/messages")}
              />
            </div>
            {goLeft !== 0 ? (
              <div className="items-center" onClick={() => setGoLeft(0)}>
                <AiOutlineDoubleRight className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1" />
              </div>
            ) : (
              <div
                className="items-center"
                onClick={() => setGoLeft(-window.innerWidth + 320)}
              >
                <AiOutlineDoubleLeft className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1" />
              </div>
            )}

            <div className="items-center" onClick={() => setOpen(!open)}>
              <AiOutlineLine className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1" />
            </div>
            <div className="ml-1" onClick={() => closeChat()}>
              <AiOutlineClose className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1" />
            </div>
          </div>
          <div
            onScroll={(e) => handleScroll(e)}
            className="mb-auto p-1 overflow-y-auto scrollbar dark:scrollbar-thumb-gray-400 scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-track-dark-third relative border-b-0.5 dark:border-dark-secondary"
            ref={scrollRef}
          >
            {loadMore ? (
              <SkeLoader chatbox={false} />
            ) : (
              <div>
                This is the beginning conversation with {chosenChatDetails.name}
              </div>
            )}

            <div ref={loadRef}>
              {messages.map((message, index) => {
                const sameAuthor =
                  index > 0 &&
                  messages[index].author._id === messages[index - 1].author._id;

                if (sameAuthor) {
                  return (
                    <div key={index}>
                      <div className="p-1 ml-11">
                        {message.content !== "" && (
                          <p className="font-light break-all w-64 rounded">
                            {message.content}
                          </p>
                        )}
                        <ChatDisplayFile message={message} />
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={index}>
                    <div className="flex justify-start p-1">
                      <div className="">
                        <img
                          src={message.author.avatar}
                          className="rounded-full p-1 w-10 h-10"
                          alt="avatar"
                        />
                      </div>
                      <div className="grid ml-1">
                        <div className="flex items-center mb-2">
                          <p className="font-semibold text-lg">
                            {message.author.name}
                          </p>
                          <p className="text-xs ml-2 font-light text-gray-400">
                            {convertDate(message.date)}
                          </p>
                        </div>
                        <div className="">
                          {message.content !== "" && (
                            <p className="font-light  break-all rounded w-64">
                              {message.content}
                            </p>
                          )}

                          <ChatDisplayFile message={message} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {typing !== "" && (
              <img
                src="https://acegif.com/wp-content/uploads/loading-38.gif"
                alt=""
                className="h-8 w-20 rounded-lg ml-11"
              />
            )}

            <div ref={bottomRef} />
          </div>

          <div className="px-1 pb-1">
            {!isBottom && (
              <button
                onClick={() => {
                  bottomRef.current.scrollIntoView({ block: "start" });
                }}
                className="h-4 dark:hover:bg-slate-500 hover:bg-light-secondary w-full text-xs rounded mb-1"
              >
                Go to bot
              </button>
            )}
            {file.length !== 0 && (
              <ChatFile file={file} handleRemoveFile={handleRemoveFile} />
            )}
            <ChatInput
              changeFileHandler={changeFileHandler}
              chosenChatDetails={chosenChatDetails}
              handleKeyDown={handleKeyDown}
              chat={chat}
              setChat={setChat}
              check={check}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          animate={{ x: goLeft }}
          transition={{ stiffness: 100 }}
          className="absolute bottom-0 right-0 w-80 dark:bg-dark-third bg-light-primary rounded-t-lg dark:text-white text-dark-secondary border-t border-x dark:border-dark-secondary"
        >
          <div className="flex justify-between border-b-0.5 dark:border-dark-secondary items-center">
            <div className="">
              <img
                src={chosenChatDetails.avatar}
                className="rounded-full p-1 w-8 h-8"
                alt="avatar"
              />
            </div>
            <div className="ml-1">
              <span className="font-semibold">{chosenChatDetails.name}</span>
            </div>
            <div className="ml-auto">
              <AiOutlineFullscreen
                className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1"
                onClick={() => navigate("/messages")}
              />
            </div>
            {goLeft !== 0 ? (
              <div className="items-center" onClick={() => setGoLeft(0)}>
                <AiOutlineDoubleRight className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1" />
              </div>
            ) : (
              <div
                className="items-center"
                onClick={() => setGoLeft(-window.innerWidth + 320)}
              >
                <AiOutlineDoubleLeft className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1" />
              </div>
            )}

            <div className="items-center" onClick={() => setOpen(!open)}>
              <AiOutlineLine className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1" />
            </div>
            <div className="ml-1" onClick={() => closeChat()}>
              <AiOutlineClose className="w-7 h-7 rounded-full dark:hover:bg-slate-600 hover:bg-light-secondary p-1" />
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

const mapStateToProps = ({
  chat: chosenChatDetails,
  chat: messages,
  chat: typing,
  friend,
}) => {
  return {
    ...chosenChatDetails,
    ...messages,
    ...typing,
    ...friend,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionToProps)(ChatBox);
