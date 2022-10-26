import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getAllConversations } from "../../api/chat";
import { getActions } from "../../store/actions/chatAction";
import { connect } from "react-redux";
import { CgSpinner } from "react-icons/cg";

const ChatMenu = ({ user, setChosenChatDetails, setToggleChat }) => {
  const [allConversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getAllConversations();
      setConversations(data);
      setLoading(false);
    })();
  }, []);

  const updateState = (value) => {
    const newState = allConversations.map((obj, index) => {
      if (index == value) {
        return { ...obj, newMessage: false };
      }

      return obj;
    });

    setConversations(newState);
  };

  const setConversation = (participants) => {
    const newState = participants.map((obj, index) => {
      if (obj._id !== user.id) {
        setChosenChatDetails(
          {
            id: obj._id,
            name: obj.name,
            avatar: obj.avatar,
          },
          "DIRECT"
        );
      }
    });

    setConversations(newState);
  };

  console.log(allConversations);
  return (
    <>
      {loading ? (
        <div className="absolute h-96 w-80 bg-dark-third right-0 top-12 overflow-auto rounded-b-lg flex justify-center">
          <CgSpinner className="animate-spin h-16 w-16 mt-6 text-dark-third bg-gray-500 rounded-full p-2" />
        </div>
      ) : (
        <div className="absolute h-96 w-80 bg-dark-third right-0 top-12 overflow-auto rounded-b-lg">
          {allConversations &&
            allConversations.map((c, index) => {
              if (c.messages?.length > 0) {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setToggleChat(false);
                      updateState(index);
                      setConversation(c.participants);
                    }}
                    className="m-2 h-16 px-3 flex justify-between gap-2 items-center hover:bg-slate-500 rounded-lg  cursor-pointer"
                  >
                    {c.participants.map((p) => {
                      if (p._id != user.id)
                        return (
                          <>
                            <img
                              src={p.avatar}
                              alt=""
                              className="rounded-full h-12 w-12"
                            />
                            <div className="mr-auto truncate">
                              <p className="">{p.name}</p>
                              {c.newMessage &&
                              c.messages[0]?.author._id !== user.id ? (
                                <p className=" text-blue-500">
                                  {c.messages[0]?.content}
                                </p>
                              ) : (
                                <p className="text-gray-400">
                                  {c.messages[0]?.content}
                                </p>
                              )}
                            </div>
                            {c.newMessage &&
                            c.messages[0]?.author._id !== user.id ? (
                              <div className="text-blue-500">New</div>
                            ) : null}
                          </>
                        );
                    })}
                  </div>
                );
              }
            })}
        </div>
      )}
    </>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(ChatMenu);
