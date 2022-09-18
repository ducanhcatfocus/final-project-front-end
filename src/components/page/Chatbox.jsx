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
import { CgSpinnerTwo } from "react-icons/cg";
import { motion } from "framer-motion";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  sendDirectMessage,
  typingMessage,
} from "../../socket/socketConnection";
import { getActions } from "../../store/actions/chatAction";
import ChatFile from "./chatComponent/ChatFile";
import ChatInput from "./chatComponent/ChatInput";
import ChatDisplayFile from "./chatComponent/ChatDisplayFile";
import SkeLoader from "./chatComponent/SkeLoader";

const Chatbox = ({
  chosenChatDetails,
  setMessages,
  messages,
  typing,
  closeChat,
  loadMore,
  loadingMessage,
  loading,
  page,
  setPage,
}) => {
  const [open, setOpen] = useState(true);
  const [chat, setChat] = useState("");
  const [goLeft, setGoLeft] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [file, setFile] = useState([]);
  // const [page, setPage] = useState(0);
  const [skeLoading, setSkeLoading] = useState({ text: "", number: [] });
  const bottomRef = useRef(null);
  const loadRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (loadMore) {
      (async () => {
        await setMessages(chosenChatDetails.id, page);
        if (page === 0) {
          bottomRef.current?.scrollIntoView({ block: "end" });
          return;
        }
        loadRef.current?.scrollIntoView({ block: "start" });
      })();
    }
  }, [chosenChatDetails, page]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [open]);

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

  const handleMessageChange = (e) => {
    setChat(e.target.value);

    if (e.target.value === "") {
      typingMessage({ id: chosenChatDetails.id, isTyping: false });
      setIsTyping(false);
      return;
    }
    if (!isTyping) {
      typingMessage({ id: chosenChatDetails.id, isTyping: true });
      setIsTyping(true);
    }
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
      setSkeLoading({ text: chat, number: file });
      loadingMessage();
      bottomRef.current.scrollIntoView({ block: "end" });
      setChat("");
      setFile([]);
    }
  };

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && loadMore) {
      setTimeout(() => {
        loadRef.current?.scrollIntoView({ block: "end" });
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
          className="absolute bottom-0 right-0 h-96 w-80 dark:bg-dark-third bg-light-primary rounded-t-lg flex flex-col justify-between dark:text-white text-dark-secondary border border-dark-secondary "
        >
          <div className="flex justify-between p-1 border-b-0.5 border-dark-secondary">
            <div className="">
              <img
                src={chosenChatDetails.avatar}
                className="rounded-full p-1 w-12 h-12"
                alt="avatar"
              />
            </div>
            <div className="grid ml-1">
              <span className="font-semibold">{chosenChatDetails.name}</span>
              <span className="font-light text-sm">Online</span>
            </div>
            <div className="ml-auto">
              <AiOutlineFullscreen
                className="w-7 h-7 rounded-full hover:bg-slate-600 p-1"
                onClick={() => navigate("/messages")}
              />
            </div>
            {goLeft !== 0 ? (
              <div className="items-center" onClick={() => setGoLeft(0)}>
                <AiOutlineDoubleRight className="w-7 h-7 rounded-full hover:bg-slate-600 p-1" />
              </div>
            ) : (
              <div
                className="items-center"
                onClick={() => setGoLeft(-window.innerWidth + 320)}
              >
                <AiOutlineDoubleLeft className="w-7 h-7 rounded-full hover:bg-slate-600 p-1" />
              </div>
            )}

            <div className="items-center" onClick={() => setOpen(!open)}>
              <AiOutlineLine className="w-7 h-7 rounded-full hover:bg-slate-600 p-1" />
            </div>
            <div className="ml-1" onClick={() => closeChat()}>
              <AiOutlineClose className="w-7 h-7 rounded-full hover:bg-slate-600 p-1" />
            </div>
          </div>
          <div
            onScroll={(e) => handleScroll(e)}
            className="mb-auto p-1 overflow-y-auto "
          >
            {loadMore ? (
              <SkeLoader chatbox />
            ) : (
              <div>
                This is the beginning conversation with {chosenChatDetails.name}
              </div>
            )}

            {messages.map((message, index) => {
              const sameAuthor =
                index > 0 &&
                messages[index].author?._id === messages[index - 1].author?._id;
              const sameDay =
                index > 0 && messages[index].date === messages[index - 1].date;

              if (sameAuthor) {
                return (
                  <div
                    key={index}
                    ref={index === 20 * page ? loadRef : null}
                    className="p-1 ml-11"
                  >
                    <p className="font-light text-sm break-all w-48 rounded mb-2">
                      {message.content}
                    </p>
                    <ChatDisplayFile message={message} />
                  </div>
                );
              }
              return (
                <div
                  key={index}
                  ref={index === 20 * page ? loadRef : null}
                  className="flex justify-start p-1"
                >
                  <div className="">
                    <img
                      src={message.author.avatar}
                      className="rounded-full p-1 w-10 h-10"
                      alt="avatar"
                    />
                  </div>
                  <div className="grid ml-1">
                    <div className="flex items-end mb-2">
                      <p className="font-semibold text-sm">
                        {message.author.name}
                      </p>
                      <p className="text-xs ml-2 font-light text-gray-400">
                        {message.date}
                      </p>
                    </div>
                    <p className="font-light text-sm break-all w-48 rounded">
                      {message.content}
                    </p>
                    <ChatDisplayFile message={message} />
                  </div>
                </div>
              );
            })}
            {loading ? (
              <div className="flex justify-start p-1">
                <div className="p-1">
                  <div className="rounded-full p-1 w-8 h-8 bg-dark-third" />
                </div>
                <div className="grid ml-1">
                  <p className="font-light text-sm break-all w-48 rounded mb-2">
                    {skeLoading.text}
                  </p>

                  <ul>
                    {skeLoading.number.map((f, index) => {
                      if (f.type.startsWith("image")) {
                        return (
                          <li key={index} className="">
                            <div className="relative w-fit">
                              <img
                                src={URL.createObjectURL(f)}
                                alt="image"
                                className="h-32 rounded mt-3 "
                              />
                              <div className="absolute bottom-0 right-0 h-full w-full backdrop-brightness-25 ">
                                <CgSpinnerTwo className="animate-spin h-24 w-24 m-auto flex" />
                              </div>
                            </div>
                          </li>
                        );
                      }
                      if (f.type.startsWith("video")) {
                        return (
                          <li key={index} className="relative w-fit">
                            <video className="rounded h-48 mt-3" muted>
                              <source
                                src={URL.createObjectURL(f)}
                                type={f.type}
                              />
                            </video>
                            <div className="absolute bottom-0 right-0 h-full w-full backdrop-brightness-25 ">
                              <CgSpinnerTwo className="animate-spin h-24 w-24 m-auto flex" />
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li
                          key={index}
                          className="h-8 w-32 bg-slate-300 mt-3 relative"
                        >
                          <div className="absolute bottom-0 right-0 h-full w-full backdrop-brightness-25 ">
                            <CgSpinnerTwo className="animate-spin h-5 w-5 m-auto flex" />
                          </div>
                        </li>
                      );
                    })}
                    {/* {Array.from(Array(skeLoading.number), (_, i) => {
                      return (
                        <li
                          key={i}
                          className="font-light text-sm break-all w-48 rounded h-36 bg-slate-300 mb-1"
                        >
                          <AiOutlineLoading3Quarters />
                        </li>
                      );
                    })} */}
                  </ul>
                </div>
              </div>
            ) : null}

            <div>{typing}</div>
            <div ref={bottomRef} />
          </div>
          <div className="">
            {file.length !== 0 && (
              <ChatFile file={file} handleRemoveFile={handleRemoveFile} />
            )}
            <ChatInput
              changeFileHandler={changeFileHandler}
              chosenChatDetails={chosenChatDetails}
              handleKeyDown={handleKeyDown}
              handleMessageChange={handleMessageChange}
              chat={chat}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          animate={{ x: goLeft }}
          transition={{ stiffness: 100 }}
          className="absolute bottom-0 right-0 w-80 dark:bg-dark-third bg-light-primary rounded-t-lg dark:text-white text-dark-secondary border-t border-x border-dark-secondary"
        >
          <div className="flex justify-between border-b-0.5 border-dark-secondary items-center">
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
                className="w-7 h-7 rounded-full hover:bg-slate-600 p-1"
                onClick={() => navigate("/messages")}
              />
            </div>
            {goLeft !== 0 ? (
              <div className="items-center" onClick={() => setGoLeft(0)}>
                <AiOutlineDoubleRight className="w-7 h-7 rounded-full hover:bg-slate-600 p-1" />
              </div>
            ) : (
              <div
                className="items-center"
                onClick={() => setGoLeft(-window.innerWidth + 320)}
              >
                <AiOutlineDoubleLeft className="w-7 h-7 rounded-full hover:bg-slate-600 p-1" />
              </div>
            )}

            <div className="items-center" onClick={() => setOpen(!open)}>
              <AiOutlineLine className="w-7 h-7 rounded-full hover:bg-slate-600 p-1" />
            </div>
            <div className="ml-1" onClick={() => closeChat()}>
              <AiOutlineClose className="w-7 h-7 rounded-full hover:bg-slate-600 p-1" />
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
  chat: loading,
}) => {
  return {
    ...chosenChatDetails,
    ...messages,
    ...typing,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStateToProps, mapActionToProps)(Chatbox);
