import React from "react";
import { connect } from "react-redux";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { getActions } from "../../store/actions/friendAction";
import OnlineUser from "./rightbar/OnlineUser";
import ContextMenu from "./rightbar/ContextMenu";

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  friends.forEach((f) => {
    const isUserOnline = onlineUsers.find((user) => user.userId === f._id);
    f.isOnline = isUserOnline ? true : false;
  });
  return friends;
};

const Rightbar = ({
  pendingFriendInvitation,
  friendList,
  friendInvitation,
  acceptFriend,
  rejectFriend,
  friends,
  onlineUsers,
}) => {
  const [open, setOpen] = useState({ open1: true, open2: true });
  const { open1, open2 } = open;
  const [showContextMenu, setShowContextMenu] = useState(null);
  const [points, setPoints] = useState({ x: 0, y: 0 });

  useEffect(() => {
    friendInvitation();
  }, []);

  useEffect(() => {
    friendList();
  }, []);

  useEffect(() => {
    const handleClick = () => setShowContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const acceptInvitationHandler = (id) => {
    acceptFriend(id);
  };

  const rejectInvitationHandle = (id) => {
    rejectFriend(id);
  };

  return (
    <div className="col-end-7 col-span-1 py-4 px-1 bg-light-primary dark:bg-dark-primary">
      <ul className="space-y-2 ">
        <span
          onClick={() => {
            setOpen({ open1: !open1, open2 });
          }}
          className="flex text-gray-900 rounded-lg font-semibold dark:text-white items-center select-none"
        >
          {!open1 ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />}
          Friends
        </span>
        {open1 &&
          checkOnlineUsers(friends, onlineUsers).map((f) => (
            <OnlineUser
              key={f._id}
              name={f.name}
              isOnline={f.isOnline}
              id={f._id}
              avatar={f.avatar}
              setShowContextMenu={setShowContextMenu}
              setPoints={setPoints}
            />
          ))}
        {showContextMenu && (
          <ContextMenu top={points.y} left={points.x} id={showContextMenu} />
        )}
      </ul>
      <ul className="pt-4 mt-4 space-y-2">
        <span
          onClick={() => {
            setOpen({ open1, open2: !open2 });
          }}
          className="flex text-gray-900 rounded-lg font-semibold dark:text-white items-center select-none"
        >
          {!open2 ? <MdKeyboardArrowRight /> : <MdKeyboardArrowDown />}
          Pending
        </span>
        {open2 &&
          pendingFriendInvitation.map((invitation) => (
            <li key={invitation._id}>
              <div className="flex items-center p-2 font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-white group text-xs lg:text-base">
                <img
                  src="https://cdn.discordapp.com/attachments/672445390217281536/707284131763060816/FB_IMG_1586438858495.jpg"
                  className="rounded-full p-1 w-8 h-8 lg:w-12 lg:h-12"
                  alt=""
                />
                <span className="flex-1 ml-1 whitespace-nowrap">
                  {invitation.senderId.name}
                </span>
                <AiOutlineCheck
                  onClick={() => acceptInvitationHandler(invitation._id)}
                  className="rounded-full p-1 w-8 h-8  hover:text-green-600 hover:bg-dark-secondary bg-dark-secondary"
                />
                <AiOutlineClose
                  onClick={() => rejectInvitationHandle(invitation._id)}
                  className="rounded-full p-1 w-8 h-8  ml-3 hover:text-red-600 bg-dark-secondary"
                />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

const mapStateToProps = ({ friend }) => {
  return {
    ...friend,
  };
};

export default connect(mapStateToProps, mapActionToProps)(Rightbar);
