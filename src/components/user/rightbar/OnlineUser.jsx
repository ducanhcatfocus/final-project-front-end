import React from "react";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/chatAction";

const OnlineUser = ({
  id,
  name,
  isOnline,
  setChosenChatDetails,
  avatar,
  setShowContextMenu,
  setPoints,
}) => {
  const handleChooseActiveConversation = () => {
    setChosenChatDetails({ id: id, name: name, avatar: avatar }, "DIRECT");
  };
  return (
    <li
      onContextMenu={(e) => {
        e.preventDefault();
        setShowContextMenu(id);
        setPoints({ x: e.pageX, y: e.pageY });
      }}
      onClick={handleChooseActiveConversation}
      className="flex items-center p-1 font-semibold text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-dark-third text-xs lg:text-lg select-none cursor-pointer"
    >
      <img
        src={avatar}
        className="rounded-full p-1 w-8 h-8 lg:w-12 lg:h-12"
        alt="avatar"
      />
      <span className="flex-1 ml-1 whitespace-nowrap ">{name}</span>
      {isOnline && (
        <span className="inline-flex justify-center items-center p-1 ml-1 rounded-full bg-green-600"></span>
      )}
    </li>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(OnlineUser);
