import React from "react";
import { connect } from "react-redux";

import { BsPencilSquare } from "react-icons/bs";
import {
  AiOutlinePlusSquare,
  AiOutlineUser,
  AiOutlineUsergroupAdd,
  AiOutlineInbox,
  AiOutlineSend,
} from "react-icons/ai";
import TopbarItem from "./TopbarItem";

const Sidebar = ({ roomDetails, pendingFriendInvitation }) => {
  return (
    <div className="bg-dark-third h-16 flex flex-col justify-end">
      <div className="h-4/5 flex px-5 gap-2 overflow-x-auto md:scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 whitespace-nowrap">
        <TopbarItem to="/compose" label="Compose" icon={<BsPencilSquare />} />
        <TopbarItem to="/inbox" label="Inbox" icon={<AiOutlineInbox />} />
        <TopbarItem to="/send-document" label="Sent" icon={<AiOutlineSend />} />
        <TopbarItem
          to="/add-friend"
          label="Friend"
          icon={<AiOutlineUser />}
          friendRequests={pendingFriendInvitation.length}
        />
        <TopbarItem
          to="/create-room"
          label="Create room"
          icon={<AiOutlinePlusSquare />}
        />
        <TopbarItem
          to="/join-room"
          label="Join room"
          icon={<AiOutlineUsergroupAdd />}
        />
      </div>
      {/* {roomDetails ? (
        <SideBarItem to="/room" label={roomDetails.roomName} />
      ) : null}
      <SideBarItem to="/" label="Help" icon={<BiHelpCircle />} /> */}
    </div>
  );
};

const mapStateToProps = ({ room, friend }) => {
  return {
    ...room,
    ...friend,
  };
};

export default connect(mapStateToProps)(Sidebar);
