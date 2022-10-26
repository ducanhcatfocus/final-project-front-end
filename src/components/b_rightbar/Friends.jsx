import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getActions } from "../../store/actions/chatAction";

const Friends = ({ avatar, name, isOnline, id, setChosenChatDetails }) => {
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();

  const handleChooseActiveConversation = () => {
    setChosenChatDetails({ id: id, name: name, avatar: avatar }, "DIRECT");
  };
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="m-2 h-20 px-3 flex justify-between gap-2 items-center hover:bg-slate-500 rounded-lg  cursor-pointer"
      draggable
    >
      <div
        onClick={handleChooseActiveConversation}
        className="flex gap-2 items-center w-[calc(100%_-_3.5rem)]"
      >
        <img src={avatar} alt="" className="rounded-full h-16 w-16" />
        <p className="truncate">{name}</p>
      </div>

      {isHover && (
        <button
          onClick={() => navigate(`/profile/${id}`)}
          className="h-10 w-10 rounded-full border ml-auto self-center hover:bg-dark-third"
        >
          ...
        </button>
      )}
      {isOnline && (
        <span className="h-3 w-3 rounded-full bg-green-600 self-center p-1"></span>
      )}
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Friends);
