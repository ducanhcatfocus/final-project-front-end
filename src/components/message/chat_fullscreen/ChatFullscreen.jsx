import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  sendDirectMessage,
  typingMessage,
} from "../../../socket/socketConnection";
import { getActions } from "../../../store/actions/chatAction";
import ChatDisplayFile from "../chatComponent/ChatDisplayFile";
import ChatFile from "../chatComponent/ChatFile";
import ChatInput from "../chatComponent/ChatInput";
import SkeLoader from "../chatComponent/SkeLoader";
import ScrollToBot from "./ScrollToBot";

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

let check = false;
let online;

const ChatFullscreen = ({
  toggleFriend,
  chosenChatDetails,
  setMessages,
  messages,
  typing,
  loadMore,
  user,
  setPage,
  page,
  onlineUsers,
}) => {
  const [chat, setChat] = useState("");
  const [file, setFile] = useState([]);
  const [isBottom, setIsBottom] = useState(true);
  const bottomRef = useRef(null);
  const loadRef = useRef(null);
  const scrollRef = useRef(null);

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
  }, [messages, typing]);

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
      {chosenChatDetails ? (
        <div className="flex flex-col justify-between dark:text-white text-dark-secondary md:h-full h-[550px]">
          <div className="flex justify-start p-1 border-b-0.5 dark:border-dark-third ">
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
          </div>
          <div
            onScroll={(e) => handleScroll(e)}
            className="mb-auto p-1 overflow-y-auto scrollbar dark:scrollbar-thumb-gray-400 scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-track-dark-third relative"
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
                      {user.id !== message.author._id ? (
                        <div className="p-1 ml-11">
                          {message.content !== "" && (
                            <p className="font-light text-lg break-all w-64 rounded dark:bg-dark-third bg-light-primary p-3">
                              {message.content}
                            </p>
                          )}
                          <ChatDisplayFile message={message} />
                        </div>
                      ) : (
                        <div className="p-1 flex justify-end mr-11">
                          <div className="grid justify-items-end">
                            {message.content !== "" && (
                              <p className="font-light text-lg break-all w-64 rounded bg-blue-400 p-3">
                                {message.content}
                              </p>
                            )}
                            <ChatDisplayFile message={message} />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <div key={index}>
                    {user.id !== message.author._id ? (
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
                              <p className="font-light text-lg break-all dark:bg-dark-third bg-light-primary rounded p-3 w-64">
                                {message.content}
                              </p>
                            )}

                            <ChatDisplayFile message={message} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="mr-11 p-1">
                          <p className="text-xs ml-2 font-light text-gray-400">
                            {convertDate(message.date)}
                          </p>
                          {message.content !== "" && (
                            <p className="font-light text-lg break-all bg-blue-400 rounded p-3 w-64">
                              {message.content}
                            </p>
                          )}

                          <ChatDisplayFile message={message} />
                        </div>
                      </div>
                    )}
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
            <ScrollToBot
              isBottom={isBottom}
              toggleFriend={toggleFriend}
              bottomRef={bottomRef}
            />
          </div>

          <div className="p-2">
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
        </div>
      ) : (
        <div className="md:h-full h-[550px]">No Conversation</div>
      )}
    </>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({
  chat: chosenChatDetails,
  chat: messages,
  chat: typing,
  auth: user,
  friend,
}) => {
  return {
    ...chosenChatDetails,
    ...messages,
    ...typing,
    ...user,
    ...friend,
  };
};

export default connect(mapStateToProps, mapActionToProps)(ChatFullscreen);
