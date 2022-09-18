import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { sendDirectMessage } from "../../socket/socketConnection";
import { getActions } from "../../store/actions/chatAction";
import MainPageContainer from "../MainPageContainer";
import ChatDisplayFile from "./chatComponent/ChatDisplayFile";
import ChatFile from "./chatComponent/ChatFile";
import ChatInput from "./chatComponent/ChatInput";
import SkeLoader from "./chatComponent/SkeLoader";

const Messages = ({
  chosenChatDetails,
  setMessages,
  messages,
  typing,
  loadMore,
  user,
  setPage,
  page,
}) => {
  const [chat, setChat] = useState("");
  const [file, setFile] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  // const [page, setPage] = useState(0);
  const bottomRef = useRef(null);
  const loadRef = useRef(null);

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
  }, [page, chosenChatDetails]);

  // useEffect(() => {
  //   (async () => {
  //     await setMessages(chosenChatDetails.id, 0);
  //     bottomRef.current.scrollIntoView({ block: "end" });
  //     setPage(0);
  //   })();
  // }, [chosenChatDetails]);

  // useEffect(() => {
  //   bottomRef.current?.scrollIntoView({ block: "end" });
  // }, [messages]);

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
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" && chat.length > 0) || file.length > 0) {
      sendDirectMessage({
        receiverId: chosenChatDetails.id,
        content: chat,
        file: file,
      });
      setChat("");
      setFile([]);
    }
  };

  const handleScroll = (e) => {
    // console.log(e.target);
    // const dropMouse = (e) => {
    //   if (e.target.scrollTop === 0 && loadMore) {
    //     setPage(page);
    //   }
    // };
    // e.target.addEventListener("mouseup", console.log("up"));

    // document.removeEventListener("mouseup", dropMouse);
    setTimeout(() => {
      if (e.target.scrollTop === 0 && loadMore) {
        setPage(page);
      }
    }, 1000);
  };

  return (
    <MainPageContainer>
      {chosenChatDetails ? (
        <div className="flex flex-col justify-between dark:text-white text-dark-secondary h-[calc(100%_-_3.5rem)] ">
          <div className="flex justify-start p-1 border-b-0.5 border-dark-third">
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
          </div>
          <div
            onScroll={(e) => handleScroll(e)}
            className="mb-auto p-1 overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-dark-third "
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
                const sameDay =
                  index > 0 &&
                  messages[index].date === messages[index - 1].date;

                if (sameAuthor) {
                  return (
                    <>
                      {user.id !== message.author._id ? (
                        <div key={message._id} className="p-1 ml-11">
                          <p className="font-light text-lg break-all w-48 rounded bg-dark-third p-1">
                            {message.content}
                          </p>
                          <ChatDisplayFile message={message} />
                        </div>
                      ) : (
                        <div
                          key={message._id}
                          className="p-1 flex justify-end mr-11"
                        >
                          <div>
                            <p className="font-light text-lg break-all w-48 rounded  bg-blue-500 p-1">
                              {message.content}
                            </p>
                            <ChatDisplayFile message={message} />
                          </div>
                        </div>
                      )}
                    </>
                  );
                }
                return (
                  <>
                    {user.id !== message.author._id ? (
                      <div key={message._id} className="flex justify-start p-1">
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
                              {message.date}
                            </p>
                          </div>
                          <div className="">
                            <p className="font-light text-lg break-all bg-dark-third rounded p-1 ">
                              {message.content}
                            </p>
                            <ChatDisplayFile message={message} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <div className="mr-11 p-1">
                          <p className="text-xs ml-2 font-light text-gray-400">
                            {message.date}
                          </p>
                          <p className="font-light text-lg break-all bg-blue-500 rounded p-1 ">
                            {message.content}
                          </p>
                          <ChatDisplayFile message={message} />
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
            <div>{typing}</div>
            <div ref={bottomRef} />
          </div>
          <div className="p-2">
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
        </div>
      ) : (
        <>No Conversation</>
      )}
    </MainPageContainer>
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
}) => {
  return {
    ...chosenChatDetails,
    ...messages,
    ...typing,
    ...user,
  };
};

export default connect(mapStateToProps, mapActionToProps)(Messages);
